/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  extend: {
  animation: {
    'pop-in': 'popIn 0.35s ease-out forwards',
    'pop-out': 'popOut 0.25s ease-in forwards',
  },
  keyframes: {
    popIn: {
      '0%': { opacity: 0, transform: 'scale(0.8)' },
      '100%': { opacity: 1, transform: 'scale(1)' },
    },
    popOut: {
      '0%': { opacity: 1, transform: 'scale(1)' },
      '100%': { opacity: 0, transform: 'scale(0.8)' },
    },
  },
},
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        archivo: ['Archivo Black', 'sans-serif'],
    manrope: ['Manrope', 'sans-serif'],
    rajdhani: ['Rajdhani', 'sans-serif'],
    urbanist: ['Urbanist', 'sans-serif'],
    jakarta: ['Plus Jakarta Sans', 'sans-serif'],
    spartan: ['League Spartan', 'sans-serif'],
    teko: ['Teko', 'sans-serif'],
    sora: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
