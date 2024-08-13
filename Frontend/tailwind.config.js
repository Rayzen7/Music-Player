/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        poppins1: ['Poppins1', 'sans-serif'],
        poppins2: ['Poppins2', 'sans-serif'],
      },
      backgroundColor: {
        Navbar: 'rgba(0, 0, 0, 0.2)',
      },
      colors: {
        gray: "#F4F4F4",
        white: "#ffffff",
        black: "#000000",
        blue: "#00b4ed",
        gray1: "#E3E3E3",
      },
      animation: {
        rotate: 'rotateAnimation 4s linear infinite',
      },
      keyframes: {
        rotateAnimation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
      },
    },
  },
  plugins: [],
}
