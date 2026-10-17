/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF6EA',
        ink: '#243056',
        coral: '#C4473D',
        sea: '#0E6796',
        leaf: '#1B7A4A',
        sun: '#FFD56A',
        lilac: '#E4D4FF',
      },
      fontFamily: {
        display: ['Nunito', 'Trebuchet MS', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        card: '0 14px 34px rgba(36, 48, 86, 0.08)',
      },
    },
  },
  plugins: [],
};
