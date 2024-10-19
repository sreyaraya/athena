/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "scale-in-center": "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "text-focus-in": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both",
        "text-focus-in-with-delay": "text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) 1s  both",
        "focus-in-expand-fwd": "focus-in-expand-fwd 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both"
      },
      fontFamily: {
        'f': ['DM Sans', 'serif']
        ,
      },
      keyframes: {
        "scale-in-center": {
          "0%": {
              transform: "scale(0)",
              opacity: "1"
          },
          to: {
              transform: "scale(1)",
              opacity: "1"
          }
      },
        "text-focus-in": {
          "0%": {
              filter: "blur(12px)",
              opacity: "0"
          },
          to: {
              filter: "blur(0)",
              opacity: "1"
          }
      },
        "focus-in-expand-fwd": {
            "0%": {
                "letter-spacing": "-.5em",
                transform: "translateZ(-800px)",
                filter: "blur(12px)",
                opacity: "0"
            },
            to: {
                transform: "translateZ(0)",
                filter: "blur(0)",
                opacity: "1"
            }
        }
    }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
