import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

function fontPreloadPlugin(): Plugin {
    return {
        name: "font-preload",
        transformIndexHtml: {
            order: "post",
            handler(_html, ctx) {
                const fontAssets = (ctx.bundle ? Object.keys(ctx.bundle) : []).filter((name) => name.endsWith(".woff2"))
                return fontAssets.map((font) => ({
                    tag: "link",
                    attrs: {
                        rel: "preload",
                        as: "font",
                        type: "font/woff2",
                        href: `/${font}`,
                        crossorigin: "anonymous",
                    },
                    injectTo: "head" as const,
                }))
            },
        },
    }
}

export default defineConfig(() => {
    return {
        resolve: {
            conditions: ["source"],
        },
        plugins: [react({ include: "**/*.tsx" }), fontPreloadPlugin()],
        assetsInclude: ["**/*.md"],
        root: "./src",
        publicDir: "../public",
        base: "/",
        envDir: "../",
        server: {
            host: true,
            port: 5173,
            watch: { usePolling: true },
            hmr: true,
        },
        build: {
            outDir: "../build",
            rollupOptions: {
                output: {
                    entryFileNames: "[hash].js",
                    chunkFileNames: "[hash].js",
                    assetFileNames: "[hash].[ext]",
                    manualChunks(id: string) {
                        if (id.includes("react-dom")) {
                            return "react-dom"
                        }
                    },
                },
            },
        },
    }
})
