import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ink": "#0a0c14",
        "ink-2": "#0d1017",
        "ink-3": "#111420",
        "blue-accent": "#3C50E0",
        "purple-accent": "#7C3AED",
        "green-accent": "#22AD5C",
        "orange-accent": "#F97316",
        "amber-accent": "#F59E0B",
        "pink-accent": "#EC4899",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-bk": "linear-gradient(135deg, #3C50E0, #7C3AED)",
        "gradient-hero": "linear-gradient(135deg, #6C8EFF, #a78bfa)",
        "gradient-orange": "linear-gradient(135deg, #F97316, #F59E0B)",
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "blue-glow": "0 0 40px rgba(60,80,224,0.2)",
        "purple-glow": "0 0 40px rgba(124,58,237,0.2)",
        "card": "0 4px 24px rgba(0,0,0,0.4)",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
