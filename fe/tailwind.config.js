import { fontFamily } from './src/theme/palette'
import palette from './src/theme/palette'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      ...fontFamily
    },
    colors: {
      ...palette
    },
    extend: {}
  },
  plugins: []
}
