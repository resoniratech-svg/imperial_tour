/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        qatar: {
          maroon: '#8A1538',
          'maroon-dark': '#650F28',
          'maroon-light': '#A51E45',
        },
        gold: {
          50: '#FDFBF7',
          100: '#FAF5EA',
          200: '#F2E5C8',
          300: '#E7D19E',
          400: '#DCBC72',
          500: '#D4AF37', // Royal Gold
          600: '#B8860B', // Dark Goldenrod
          700: '#8E6808',
          800: '#684C06',
          900: '#4A3604',
        },
        sand: {
          50: '#FDFBF7',
          100: '#FAF6EF',
          200: '#F3ECE0',
          300: '#E8DCCB',
          400: '#D5C4AC',
          500: '#BFA88B',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(138, 21, 56, 0.08), 0 8px 10px -6px rgba(212, 175, 55, 0.05)',
        'luxury-hover': '0 20px 40px -10px rgba(138, 21, 56, 0.15), 0 12px 18px -6px rgba(212, 175, 55, 0.12)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
}
