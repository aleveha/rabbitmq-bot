## Sample telegram bot with grammY and RabbitMQ

### Production start
`docker compose up -d`

### Developing start
`docker compose -f docker-compose.dev.yml up -d`\
(do not forget to restart `bot` and `api` services after `rabbitMQ` service is fully started and running)
