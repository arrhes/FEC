import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
    resolve: {
        alias: {
            "#": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        include: ["../../tests/engine/**/*.test.ts"],
        globals: true,
        testTimeout: 10000,
        environment: "jsdom",
    },
})
