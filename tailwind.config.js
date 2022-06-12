/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "soft-midnight": "#34495E",
        midnight: "#2C3E50",
        emerald: "#2ECC71",
        turquoise: "#1ABC9C",
        alizarin: "#e74c3c",
        "sun-flower": "#f1c40f",
        amnethyst: "#9B59B6",
        "soft-amnethyst": "#AE6BFF",
        "dark-amnethyst": "#8e44ad",
      },
    },
  },
  plugins: [],
};
