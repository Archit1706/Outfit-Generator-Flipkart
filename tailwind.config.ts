import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                cherry: "#FF0060",
                yellow: "#F6FA70",
                green: "#00DFA2",
                blue: "#0079FF",
            },
            fontFamily: {
                sans: ["Inter var", "Inter", "system-ui", "sans-serif"],
                ubuntu: ["Ubuntu", "sans-serif"],
                mono: ["Ubuntu Mono", "monospace"],
            },
        },
    },
    plugins: [],
};
export default config;
