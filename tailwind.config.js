/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand color system — deep navy blue (matches the VartaBot logo)
        brand: {
          50: '#eff4fa',
          100: '#d6e3f1',
          200: '#b0c8e2',
          300: '#82a4cd',
          400: '#547eb2',
          500: '#356098',
          600: '#284b7d',
          700: '#233e66',
          800: '#213655',
          900: '#1c2c45',
          950: '#111a2a',
        },
        // Accent — warm orange, the VartaBot logo's accent colour
        accent: {
          50: '#fdf4ed',
          100: '#fae3cf',
          200: '#f5c79e',
          300: '#efa367',
          400: '#e9853d',
          500: '#e06f24',
          600: '#c85a1a',
          700: '#a44518',
          800: '#84381a',
          900: '#6c2f18',
          950: '#3a1709',
        },
        // Neutral surface palette — cool slate, pairs cleanly with indigo/violet.
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(16, 24, 40, 0.08), 0 4px 16px -4px rgba(16, 24, 40, 0.06)',
        card: '0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)',
        glow: '0 0 0 1px rgba(40, 75, 125, 0.1), 0 10px 40px -10px rgba(40, 75, 125, 0.4)',
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
