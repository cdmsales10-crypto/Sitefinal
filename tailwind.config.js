/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1A3C34',
          dark: '#0f2820',
        },
        herbal: {
          DEFAULT: '#4A7C59',
          light: '#5a9369',
          dark: '#3a6249',
        },
        sage: {
          DEFAULT: '#E6F0E8',
          light: '#f0f7f2',
        },
        cream: {
          DEFAULT: '#FAF9F6',
        },
        gold: {
          DEFAULT: '#CDAA63',
          light: '#d9b877',
          dark: '#b89650',
        },
        stone: {
          DEFAULT: '#666666',
        },
        'bright-white': {
          DEFAULT: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.02em',
      },
      boxShadow: {
        premium: '0 4px 20px rgba(0, 0, 0, 0.08)',
        'premium-lg': '0 8px 30px rgba(0, 0, 0, 0.12)',
        glow: '0 0 20px rgba(74, 124, 89, 0.3)',
        'gold-glow': '0 0 20px rgba(205, 170, 99, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
