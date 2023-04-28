/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': "black"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'sm': "640px",
        'md': '768px',
        'lg': "1024px",
        'xl': '1280px'
      },
      animation: {
        pop: 'pop 1s ease-in alternate infinite'
      },
      keyframes: {
          pop: {
            '0%': {
              transform: 'scale(0)'
            },
            '100%': {
              transform: 'scale(1)'
            }
          },
         
      }
    },
  },
  plugins: [],
}
