/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'stackback-hero': 'radial-gradient(circle, #1E1E1E 0%, #121212 100%)',
      },
      colors: {
        'test-purple': '#800080'
      }
    }
  },
  plugins: [],
}
  