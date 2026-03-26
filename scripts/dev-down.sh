#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="./workflows/dev/compose.yml"
PROJECT="fec-application"

docker ps -a --filter="name=fec-" -q | xargs -r docker rm -f
docker compose \
    --project-directory="workflows/dev" \
    --file="$COMPOSE_FILE" \
    --project-name="$PROJECT" \
    down
