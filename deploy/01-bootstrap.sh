#!/usr/bin/env bash
# Roda UMA VEZ, como root, num servidor Ubuntu 24.04 recém-criado.
# Uso: ssh root@<ip-do-servidor> 'bash -s' < 01-bootstrap.sh
set -euo pipefail

echo "==> Atualizando o sistema..."
apt-get update -y && apt-get upgrade -y

echo "==> Instalando Docker..."
curl -fsSL https://get.docker.com | sh
apt-get install -y docker-compose-plugin git

echo "==> Configurando o firewall (ufw)..."
apt-get install -y ufw
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "==> Gerando chave SSH para o GitHub (deploy key, só leitura)..."
mkdir -p /root/.ssh
if [ ! -f /root/.ssh/id_ed25519 ]; then
  ssh-keygen -t ed25519 -f /root/.ssh/id_ed25519 -N "" -C "hetzner-laismota-deploy"
fi

echo ""
echo "=================================================================="
echo " PRONTO. Antes de continuar para o 02-deploy.sh, faça isto:"
echo ""
echo " 1. Copie a chave pública abaixo e adicione em:"
echo "    github.com/CastroIsaac/lais-mota -> Settings -> Deploy keys -> Add deploy key"
echo "    (NÃO marque 'Allow write access' — só leitura é suficiente)"
echo ""
cat /root/.ssh/id_ed25519.pub
echo ""
echo " 2. No DNS onde comprou laismotaadvocacia.com.br, crie um registro A:"
echo "    atendimento.laismotaadvocacia.com.br  ->  $(curl -4 -s ifconfig.me)"
echo ""
echo " 3. Espere o DNS propagar (teste com: ping atendimento.laismotaadvocacia.com.br)"
echo "=================================================================="
