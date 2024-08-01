/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg':'#f6f7fb',
        deepNavy: {
          50: '#e6eaf0',
          100: '#b3bed2',
          200: '#8093b4',
          300: '#4d6796',
          400: '#264a6e',
          500: '#0d2238', 
          600: '#091a2c',
          700: '#061422',
          800: '#030d17',
          900: '#01070c',
        },
        lightSky: {
          50: '#f5fdfe',
          100: '#e5f8fc',
          200: '#cceef9',
          300: '#b3e4f6',
          400: '#99d9f3',
          500: '#80cff0',
          600: '#66c5ed',
          700: '#4dbbe9',
          800: '#33b1e6',
          900: '#1aa7e3',
        },
      }
    },
  }, 
  plugins: [],
}