#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="./workflows/build/compose.yml"
ENV_FILE="./workflows/build/.env.example"

if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE not found."
    echo "Copy workflows/build/.env.example to workflows/build/.env and fill in the values."
    exit 1
fi

docker compose --file="$COMPOSE_FILE" --env-file="$ENV_FILE" build "$@"
