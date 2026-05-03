/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef5fb',
          100: '#d5e6f5',
          200: '#aecce9',
          300: '#80aed9',
          400: '#5590c8',
          500: '#2E6DA4',
          600: '#245989',
          700: '#1c466e',
          800: '#143354',
          900: '#0d2139',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
