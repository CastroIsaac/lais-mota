#!/usr/bin/env bash
# Sobe o n8n no servidor. Roda DEPOIS do 01-bootstrap.sh e de criar o DNS:
#   registro A  n8n.laismotaadvocacia.com.br -> IP do servidor
# Uso: ssh root@<ip-do-servidor> 'bash -s' < deploy/n8n/03-n8n.sh
set -euo pipefail

APP_DIR=/opt/laismota
REPO=git@github.com:CastroIsaac/lais-mota.git
DOMAIN=n8n.laismotaadvocacia.com.br

echo "==> Conferindo o DNS de $DOMAIN..."
SERVER_IP=$(curl -4 -s ifconfig.me)
DNS_IP=$(getent ahostsv4 "$DOMAIN" | awk 'NR==1{print $1}' || true)
if [ "$DNS_IP" != "$SERVER_IP" ]; then
  echo "   $DOMAIN aponta para '${DNS_IP:-nada}', mas o servidor é $SERVER_IP."
  echo "   Crie/corrija o registro A e rode de novo depois que propagar."
  exit 1
fi

echo "==> Clonando/atualizando o repositório..."
mkdir -p "$APP_DIR"
ssh-keyscan -H github.com >> /root/.ssh/known_hosts 2>/dev/null || true
if [ ! -d "$APP_DIR/app/.git" ]; then
  git clone "$REPO" "$APP_DIR/app"
else
  cd "$APP_DIR/app" && git pull
fi

cd "$APP_DIR/app/deploy/n8n"

if [ ! -f .env ]; then
  echo "==> Gerando segredos (.env, fica só no servidor)..."
  cat > .env <<ENV
N8N_DOMAIN=$DOMAIN
POSTGRES_PASSWORD=$(openssl rand -hex 24)
N8N_ENCRYPTION_KEY=$(openssl rand -hex 32)
ENV
  chmod 600 .env
fi

echo "==> Subindo n8n + Postgres + Caddy..."
docker compose up -d

echo ""
echo "=================================================================="
echo " PRONTO. Abra https://$DOMAIN (o HTTPS pode levar 1-2 min)"
echo " e crie a conta de dono do n8n. Depois siga deploy/n8n/README.md."
echo " Senha do Postgres (para a credencial de memória no n8n):"
echo "   grep POSTGRES_PASSWORD $APP_DIR/app/deploy/n8n/.env"
echo "=================================================================="
