import { defineConfig } from "@pandacss/dev"

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./src/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    globalCss: {
        "*": {
            color: "neutral",
            margin: 0,
            padding: 0,
        },
        "html, body": {
            fontFamily: "sans",
            fontWeight: "300",
        },
    },

    // Useful for theme customization
    theme: {
        tokens: {
            colors: {
                white: { value: "#FFFFFF" },
                background: { value: "#F9F9F9" },
                neutral: { value: "#1F292E" },
                success: { value: "#34B234" },
                error: { value: "#C91D1D" },
                warning: { value: "#E8B130" },
                information: { value: "#309be8" },
                primary: { value: "#041E42" },
            },
            fonts: {
                mono: { value: '"Monaspace", monospace' },
                sans: { value: '"Mona Sans VF", sans-serif' },
            },
            radii: {
                xs: { value: "0.125rem" },
                sm: { value: "0.25rem" },
                md: { value: "0.5rem" },
                lg: { value: "1rem" },
                xl: { value: "2rem" },
            },
            shadows: {
                inset: { value: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" },
                xs: { value: "rgba(17, 17, 26, 0.1) 0px 1px 0px" },
                sm: { value: "rgba(17, 17, 26, 0.1) 0px 1px 4px" },
            },
            sizes: {
                xs: { value: "320px" },
                sm: { value: "576px" },
                md: { value: "768px" },
                lg: { value: "1024px" },
                xl: { value: "1280px" },
            },
            fontSizes: {
                xs: { value: "0.75rem" },
                sm: { value: "0.875rem" },
                md: { value: "1rem" },
                lg: { value: "1.25rem" },
                xl: { value: "1.5rem" },
            },
            fontWeights: {
                semibold: { value: "500" },
                bold: { value: "600" },
            },
        },
        breakpoints: {
            sm: "320px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
    },

    // The output directory for your css system
    outdir: "styled-system",

    // Use JSX style props
    jsxFramework: "react",
})
