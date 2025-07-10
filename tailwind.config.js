// tailwind.config.js
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         keyframes: {
            scroll: {
               "0%": { transform: "translateX(0)" },
               "100%": { transform: "translateX(-50%)" }, // loops once through original + duplicated items
            },
         },
         animation: {
            scroll:
               "scroll var(--animation-duration, 20s) linear infinite var(--animation-direction, forwards)",
         },
      },
   },
   plugins: [],
};
