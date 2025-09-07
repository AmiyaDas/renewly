/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class','body.dark'], // << change from 'media' to 'class'
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};