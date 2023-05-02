/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./views/*"],
  theme: {
    extend: {
      colors : {
        p : "#405296",
        a1: '#90B6FF',
        a2: "#C2D8F2",
        s : '#576C89',
        text: '#5D6690',
        text2: "#405296",
        light: '#DBECFB',
        ...colors
      },
      screens: {
        'xs': '425px',
        'om': '870px',
        ...defaultTheme.screens
      },
      keyframes: {
        arrow1: {
          '0%': { transform: 'translateX(-120%)', opacity: '0' },
          '100%' : {transform: 'translateX(0%)' , opacity: '1'}
        },
        arrow2: {
          '0%': { transform: 'translateX(120%)', opacity: '0' },
          '100%' : {transform: 'translateX(0%)' , opacity: '1'}
        },
        bounce1: {
          '0%': { transform: 'translateY(0%)'},
          '50%': { transform: 'translateY(-2%)'},
          '100%' : {transform: 'translateY(0%)'}
        },
        bounce2: {
          '0%': { transform: 'translateY(0%)'},
          '50%': { transform: 'translateY(-0.4%)'},
          '100%' : {transform: 'translateY(0%)'}
        }
      },
      animation: {
        arrow1: 'arrow1 3s ease-in-out',
        arrow2: 'arrow2 3s ease-in-out',
        bounce1: 'bounce1 2s ease-in-out infinite',
        bounce2: 'bounce2 2s ease-in-out infinite'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

