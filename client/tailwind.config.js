module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
            colors: {
                primary: "#e58f55",
                green: "#1DBE19",
            },
            fontSize: {
                xxs: ["8px", "11px"],
            },
            keyframes: {
                fade: {
                    "0%": { opacity: 1 },
                    "100%": { opacity: 0 },
                },
                left: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                up: {
                    "0%": { transform: "translateY(150%)" },
                    "100%": { transform: "translateY(0%)" },
                },
                scaleUp: {
                    "0%": { transform: "scale(0.98)" },
                    "100%": { transform: "scale(1)" },
                }
            },
            animation: {
                fade: "fade 1s ease",
                left: "left 0.25s ease",
                scaleUp: "scaleUp 0.1s ease",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
