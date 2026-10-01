# Deploy — Chatwoot + agente de IA (Hetzner)

Servidor: Hetzner Cloud, Ubuntu 24.04, plano CX22 (2 vCPU / 4GB RAM).
Domínio: atendimento.laismotaadvocacia.com.br -> IP do servidor (registro DNS tipo A).

## Passo a passo

1. **Criar o servidor** no painel da Hetzner (Ubuntu 24.04, CX22, com uma chave SSH sua).
2. **Rodar o bootstrap** (instala Docker, firewall, gera chave SSH pro GitHub):
   ```
   ssh root@<ip-do-servidor> 'bash -s' < 01-bootstrap.sh
   ```
   No final ele mostra uma chave pública — adicione em
   github.com/CastroIsaac/lais-mota → Settings → Deploy keys (só leitura).
   Também mostra o IP do servidor — crie o registro DNS A
   `atendimento.laismotaadvocacia.com.br` apontando pra ele.
3. **Esperar o DNS propagar** (minutos a algumas horas, depende do registrador).
   Testar com `ping atendimento.laismotaadvocacia.com.br`.
4. **Rodar o deploy**:
   ```
   ssh root@<ip-do-servidor> 'bash -s' < 02-deploy.sh
   ```
   Isso clona o repositório, sobe o Chatwoot (Postgres, Redis, Rails, Sidekiq),
   o agente de IA e o Caddy (HTTPS automático via Let's Encrypt).
5. Seguir as instruções que o script imprime no final: criar a conta admin do
   Chatwoot pelo navegador, criar o inbox do WhatsApp, criar o Agent Bot, e
   completar o `.env` do agente com os dados que só existem depois disso
   (token do Agent Bot, Account ID, chave da Anthropic, número da OAB).

## Credenciais da Meta já obtidas (usar no passo do inbox do Chatwoot)

- Phone Number ID: `1296452826890177`
- WhatsApp Business Account ID: `1079329374494270`
- Token permanente: gerado via System User — está guardado com o Isaac, não neste repositório.

## Comandos úteis no servidor

```bash
cd /opt/laismota/app/deploy

# ver logs
docker compose -f docker-compose.yaml -f docker-compose.agent.yaml --env-file .env.chatwoot logs -f whatsapp-agent
docker compose -f docker-compose.yaml -f docker-compose.agent.yaml --env-file .env.chatwoot logs -f rails

# reiniciar só o agente (depois de editar o .env dele)
docker compose -f docker-compose.yaml -f docker-compose.agent.yaml --env-file .env.chatwoot up -d --build whatsapp-agent

# atualizar o código do agente (depois de um git push)
cd /opt/laismota/app && git pull
cd deploy && docker compose -f docker-compose.yaml -f docker-compose.agent.yaml --env-file .env.chatwoot up -d --build whatsapp-agent
```

## Observação

`docker-compose.yaml` e `.env.chatwoot` (os arquivos oficiais do Chatwoot) são
baixados pelo `02-deploy.sh` direto do GitHub do Chatwoot na primeira vez que
roda, e ficam só no servidor — não versionamos eles aqui porque `.env.chatwoot`
carrega segredos. Só `docker-compose.agent.yaml`, `Caddyfile` e os scripts
ficam no repositório.
