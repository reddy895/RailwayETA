/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        railway: {
          dark: "#07111F",
          card: "#0B1626",
          elevated: "#122035",
          border: "#1E2D45",
          muted: "#94A3B8",
          light: "#F4F6F8",
          accent: "#E63946",
          blue: "#2F80ED",
          green: "#16A34A",
          amber: "#F59E0B",
          red: "#DC2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
