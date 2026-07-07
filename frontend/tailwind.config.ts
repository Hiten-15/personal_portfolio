import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f6f4ee',
        surface: '#fffefb',
        ink: '#21261f',
        muted: '#6e7567',
        faint: '#9aa092',
        primary: {
          DEFAULT: '#1a5dab',
          dark: '#103f78',
          light: '#4a8de0',
        },
        'blue-tint': '#e8effa',
        border: {
          DEFAULT: '#e3dfd3',
          blue: '#c9d6ea',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '1160px',
      },
    },
  },
  plugins: [],
} satisfies Config;
