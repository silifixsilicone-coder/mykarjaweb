/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F8F7E8',
          light: '#FAF9EE',
          dark: '#EFECE0',
        },
        deepGreen: {
          DEFAULT: '#005C52',
          hover: '#004A42',
          light: '#007A6D',
        },
        brandBlack: {
          DEFAULT: '#111111',
          light: '#222222',
        },
        secondaryText: '#555B57',
        lightGreen: {
          DEFAULT: '#DDEBE5',
          soft: '#EEF5F2',
        },
        brandBorder: '#D9DDD6',
      },
      fontFamily: {
        serif: ['Newsreader', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
