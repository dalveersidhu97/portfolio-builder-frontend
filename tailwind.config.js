/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'opacity-slide-down': {
          '0%': { opacity: 0, 'margin-top': '-2rem' },
          '100%': { opacity: 1, 'margin-top': '0%' }
        },
        'opacity-slide-up': {
          '0%': { opacity: 0, 'margin-top': '2rem' },
          '100%': { opacity: 1, 'margin-top': '0%' }
        }
      },
      animation: {
        opacity: 'opacity .2s ease-in-out forwards',
        'opacity-slide-down': 'opacity-slide-down .4s ease-in-out forwards',
        'opacity-slide-up': 'opacity-slide-up .4s ease-in-out forwards'
      },
      boxShadow: {
        50: '0 0 50rem rgba(0,0,0,.18)',
        light: '0 0 .2rem rgba(0,0,0,.18)'
      },
      colors: {
        'primary-light': '#eff6ff',
        'primary-light-2': '#dbeafe',
        'primary': '#0284c7',
        'gray-dark': '#555',
        'gray-light': '#888'
      },
      fontFamily: {
        inter: "'Inter', sans-serif, Arial, sans-serif",
        Montserrat: "'Montserrat', sans-serif, Arial, sans-serif"
      }
    },
  },
  plugins: [],
}