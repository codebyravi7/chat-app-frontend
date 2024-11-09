/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        transform: "transform",
        opacity: "opacity",
      },
      // Add any custom configurations here
    },
  },
  variants: {
    extend: {
      translate: ["responsive"],
      opacity: ["responsive"],
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
