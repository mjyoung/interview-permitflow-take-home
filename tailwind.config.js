const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#fefefe',
        black: '#1d1d1d',
      },
      container: { padding: 20, center: true },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents }) => {
      addUtilities({
        '.center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      });
      addComponents({
        '.card': {
          '@apply bg-zinc-800 rounded-lg border border-zinc-700 p-4': {},
        },
        '.text-link': {
          '@apply text-sky-500 hover:underline': {},
        },
      });
    }),
  ],
};
