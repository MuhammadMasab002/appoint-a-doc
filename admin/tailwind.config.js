/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 'media' for system preference
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        bg: "var(--bg)",
        text: "var(--text)",
      },
      fontFamily: {
        sans: ["system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const colors = theme("colors");
      const newUtilities = {};
      Object.keys(colors).forEach((key) => {
        newUtilities[`.text-${key}`] = { color: colors[key] };
        newUtilities[`.bg-${key}`] = { backgroundColor: colors[key] };
      });
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
