#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="./workflows/dev/compose.yml"
PROJECT="fec-application"

COMPOSE_CMD=(
    docker compose
    --project-directory="./workflows/dev"
    --file="$COMPOSE_FILE"
    --project-name="$PROJECT"
)

# Remove any leftover containers (from this or previous project names) to avoid name conflicts
docker ps -a --filter="name=fec-" -q | xargs -r docker rm -f 2>/dev/null || true
"${COMPOSE_CMD[@]}" down --remove-orphans 2>/dev/null || true

"${COMPOSE_CMD[@]}" up -d --build
