set shell := ["bash", "-cu"]

dev cmd:
    @just dev-{{cmd}}

dev-up:
    ./scripts/dev-up.sh

dev-down:
    ./scripts/dev-down.sh

build *args:
    ./scripts/build.sh {{args}}
