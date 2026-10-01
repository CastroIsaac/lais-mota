#!/usr/bin/env bash
# Roda DEPOIS do 01-bootstrap.sh, depois de:
#   - adicionar a deploy key do GitHub
#   - apontar o DNS (atendimento.laismotaadvocacia.com.br -> IP do servidor)
# Uso: ssh root@<ip-do-servidor> 'bash -s' < 02-deploy.sh
set -euo pipefail

APP_DIR=/opt/laismota
REPO=git@github.com:CastroIsaac/lais-mota.git

echo "==> Clonando o repositório..."
mkdir -p "$APP_DIR"
ssh-keyscan -H github.com >> /root/.ssh/known_hosts 2>/dev/null || true
if [ ! -d "$APP_DIR/app/.git" ]; then
  git clone "$REPO" "$APP_DIR/app"
else
  echo "Repositório já existe, dando git pull..."
  cd "$APP_DIR/app" && git pull
fi

cd "$APP_DIR/app/deploy"

echo "==> Baixando os arquivos oficiais do Chatwoot..."
if [ ! -f docker-compose.yaml ]; then
  wget -q -O docker-compose.yaml https://raw.githubusercontent.com/chatwoot/chatwoot/develop/docker-compose.production.yaml
fi
if [ ! -f .env.chatwoot ]; then
  wget -q -O .env.chatwoot https://raw.githubusercontent.com/chatwoot/chatwoot/develop/.env.example

  echo "==> Gerando segredos do Chatwoot..."
  SECRET_KEY_BASE=$(openssl rand -hex 64)
  POSTGRES_PASSWORD=$(openssl rand -hex 24)
  REDIS_PASSWORD=$(openssl rand -hex 24)

  sed -i "s#^SECRET_KEY_BASE=.*#SECRET_KEY_BASE=${SECRET_KEY_BASE}#" .env.chatwoot
  sed -i "s#^FRONTEND_URL=.*#FRONTEND_URL=https://atendimento.laismotaadvocacia.com.br#" .env.chatwoot
  sed -i "s#^POSTGRES_PASSWORD=.*#POSTGRES_PASSWORD=${POSTGRES_PASSWORD}#" .env.chatwoot
  sed -i "s#^REDIS_PASSWORD=.*#REDIS_PASSWORD=${REDIS_PASSWORD}#" .env.chatwoot
  # Sem e-mail configurado por enquanto (não é necessário pro WhatsApp funcionar)
  sed -i "s#^MAILER_SENDER_EMAIL=.*#MAILER_SENDER_EMAIL=Laís Mota Advocacia <no-reply@laismotaadvocacia.com.br>#" .env.chatwoot
fi

echo "==> Preparando o .env do agente de IA (placeholder — você completa depois)..."
if [ ! -f ../whatsapp-agent/.env ]; then
  cp ../whatsapp-agent/.env.example ../whatsapp-agent/.env
  WEBHOOK_SECRET=$(openssl rand -hex 24)
  sed -i "s#^WEBHOOK_SECRET=.*#WEBHOOK_SECRET=${WEBHOOK_SECRET}#" ../whatsapp-agent/.env
  # O agente fala com o Chatwoot direto pela rede interna do Docker (mais rápido e não depende do Caddy/DNS)
  sed -i "s#^CHATWOOT_BASE_URL=.*#CHATWOOT_BASE_URL=http://rails:3000#" ../whatsapp-agent/.env
  echo "   -> gerado ../whatsapp-agent/.env com WEBHOOK_SECRET pronto."
  echo "   -> ainda faltam: ANTHROPIC_API_KEY, OAB_NUMBER, CHATWOOT_API_ACCESS_TOKEN, CHATWOOT_ACCOUNT_ID"
fi

echo "==> Preparando o banco de dados do Chatwoot (só na primeira vez, demora um pouco)..."
docker compose -f docker-compose.yaml --env-file .env.chatwoot run --rm rails bundle exec rails db:chatwoot_prepare

echo "==> Subindo tudo (Chatwoot + agente + Caddy)..."
docker compose -f docker-compose.yaml -f docker-compose.agent.yaml --env-file .env.chatwoot up -d --build

echo ""
echo "=================================================================="
echo " PRONTO. Próximos passos manuais:"
echo ""
echo " 1. Abra https://atendimento.laismotaadvocacia.com.br"
echo "    (pode levar 1-2 min pro certificado HTTPS sair; se der erro, espere e recarregue)"
echo " 2. Crie a conta de admin (seu e-mail/senha) na primeira tela."
echo " 3. Em Configurações -> Caixas de entrada, crie um inbox do tipo WhatsApp Cloud API"
echo "    usando o Phone Number ID, WABA ID e o token permanente que já geramos na Meta."
echo " 4. Em Configurações -> Integrações -> Bots, crie um Agent Bot:"
echo "    URL: https://atendimento.laismotaadvocacia.com.br/webhook/chatwoot?token=<WEBHOOK_SECRET do .env do agente>"
echo "    Depois associe esse bot ao inbox do WhatsApp."
echo " 5. Copie o token de acesso do Agent Bot e o Account ID (aparece na URL do painel)."
echo " 6. Edite $APP_DIR/app/whatsapp-agent/.env e preencha:"
echo "      ANTHROPIC_API_KEY, OAB_NUMBER, CHATWOOT_API_ACCESS_TOKEN, CHATWOOT_ACCOUNT_ID"
echo " 7. Reinicie só o agente:"
echo "      cd $APP_DIR/app/deploy && docker compose -f docker-compose.yaml -f docker-compose.agent.yaml --env-file .env.chatwoot up -d --build whatsapp-agent"
echo "=================================================================="
