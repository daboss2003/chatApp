/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        light: '#fff',
        dark: '#120201',
        greenBasic: '#128c7e',
        darkLight: '#00000080',
        blueColor: '#25d366',
        greenLight: '#3464eb',
        white: '#ffffffcc'
      },
      screens: {
        'xs': '400px',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
}

