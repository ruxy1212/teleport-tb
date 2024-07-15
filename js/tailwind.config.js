/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'pd-white': '#FFFFFF',
      'pd-gray': '#F3F4F6',
      'pd-black': '#0C0A00',
      'pd-red': '#DF1406',
      'pd-mid-gray': '#9A9A9A',
      'pd-blue': '#0177FC',
      'pd-green': '#AFE638'
    },
    fontFamily: {
      prompt: ['"Prompt"', ...defaultTheme.fontFamily.sans],
      montserrat: ['"Montserrat"', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      keyframes: {
        'bounce-in': {
          '0%, 100%': {
            transform: 'scale(0.95)',
          },
          '50%': {
            transform: 'scale(1.05)',
          },
        },
        'bounce-out': {
          '0%, 100%': {
            transform: 'scale(1.05)',
          },
          '50%': {
            transform: 'scale(0.95)',
          },
        },
      },
      animation: {
        'bounce-in': 'bounce-in 0.5s ease-in-out',
        'bounce-out': 'bounce-out 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

