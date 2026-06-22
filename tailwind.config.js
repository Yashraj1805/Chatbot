/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand color system — a calm, feel-good teal/aqua
        brand: {
          50: '#f0fdfa',
          100: '#cbfbf1',
          200: '#98f4e5',
          300: '#5ce6d5',
          400: '#2bccbe',
          500: '#14a7a0',
          600: '#0d8983',
          700: '#0f6d69',
          800: '#125754',
          900: '#134845',
          950: '#042f2d',
        },
        // Accent — a fresh emerald/mint, analogous to teal for a calm, cohesive feel
        accent: {
          50: '#ecfdf6',
          100: '#d0fbe9',
          200: '#a4f5d4',
          300: '#6debbd',
          400: '#34dba4',
          500: '#15c592',
          600: '#08a277',
          700: '#0a8061',
          800: '#0d654e',
          900: '#0d5341',
          950: '#022e22',
        },
        // Neutral surface palette — warm "sage" neutral (calmer than cool slate),
        // pairs naturally with the teal brand for a feel-good vibe.
        surface: {
          50: '#f7f8f7',
          100: '#eef1ef',
          200: '#e1e6e2',
          300: '#c9d0cb',
          400: '#97a29a',
          500: '#6a766e',
          600: '#525c55',
          700: '#3f4843',
          800: '#262d29',
          900: '#181d1a',
          950: '#0d100e',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(16, 24, 40, 0.08), 0 4px 16px -4px rgba(16, 24, 40, 0.06)',
        card: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
        glow: '0 0 0 1px rgba(20, 167, 160, 0.1), 0 10px 40px -10px rgba(20, 167, 160, 0.4)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'bounce-subtle': 'bounce-subtle 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
