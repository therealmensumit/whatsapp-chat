/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        appbg: "var(--appbg)",
        panel: "var(--panel)",
        chatbg: "var(--chatbg)",
        ink: "var(--text)",
        muted: "var(--muted)",
        line: "var(--line)",
        outgoing: "var(--out)",
        incoming: "var(--in)",
        accent: "var(--accent)",
        hover: "var(--hover)",
        field: "var(--field)",
      },
    },
  },
  plugins: [],
};
