/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'vc-bg': '#121212',
        'vc-surface': '#1e1e1e',
        'vc-elevated': '#2a2a2a',
        'vc-primary': '#6400ff',
        'vc-accent': '#ff3d00',
        'vc-border': '#333333',
        'vc-success': '#00c853',
        'vc-warning': '#ffd600',
        'vc-error': '#ff3d00'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};