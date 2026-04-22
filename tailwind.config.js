/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#F1F2F4",
        navy: "#1B275F",
        purple: "#A524D9",
        yellow: "#F0C83C",
        card: "#FFFFFF",
      },
      fontFamily: {
        dm: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 32px rgba(27,39,95,0.10)",
        purple: "0 12px 24px rgba(165,36,217,0.20)",
        yellow: "0 12px 24px rgba(240,200,60,0.20)",
        red: "0 12px 24px rgba(239,68,68,0.20)",
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        slideOut: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
      },
      animation: {
        slideIn: "slideIn 0.28s cubic-bezier(.4,0,.2,1)",
        slideOut: "slideOut 0.22s cubic-bezier(.4,0,.2,1) forwards",
        fadeUp: "fadeUp 0.35s ease both",
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
