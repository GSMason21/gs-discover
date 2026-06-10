/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./quizzes/**/*.{html,ts,tsx}",
    "./shared/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1c7293',
          accent:  '#4cbecf',
          warm:    '#F1DDCF',
        }
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
