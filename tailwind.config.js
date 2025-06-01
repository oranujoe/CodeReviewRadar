/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'vc-bg': 'var(--vc-bg)',
        'vc-surface': 'var(--vc-surface)',
        'vc-elevated': 'var(--vc-elevated)',
        'vc-primary': 'var(--vc-primary)',
        'vc-accent': 'var(--vc-accent)',
        'vc-border': 'var(--vc-border)',
        'vc-success': 'var(--vc-success)',
        'vc-warning': 'var(--vc-warning)',
        'vc-error': 'var(--vc-error)'
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