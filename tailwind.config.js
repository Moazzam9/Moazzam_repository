/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37', // Gold
        secondary: '#1A1A1A', // Dark gray
        dark: '#000000',
        light: '#FFFFFF',
        accent: '#8B7D3F', // Darker gold
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(212, 175, 55, 0.39)',
      },
    },
  },
  plugins: [],
};