// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        retail: {
          primary: '#1e293b', // Slate 800
          accent: '#2563eb'   // Blue 600
        }
      }
    },
  },
  plugins: [],
}