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
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15', // Vibrant bright sunny yellow
          500: '#EAB308', // Core rich yellow
          600: '#CA8A04', // Deep golden yellow
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
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
        'gold-glow': '0 0 25px rgba(250, 204, 21, 0.45)',
      },
    },
  },
  plugins: [],
}
