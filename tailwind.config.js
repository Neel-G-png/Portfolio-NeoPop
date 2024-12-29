/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neopop: {
          primary: '#FF2E63',
          secondary: '#08D9D6',
          dark: '#252A34',
          light: '#EAEAEA',
          accent: '#FD7014',  // New orange accent color
          success: '#00F5C0', // Neon green for success states
          warning: '#FFE900'  // Bright yellow for attention
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'neopop-bounce': 'neopop-bounce 1s infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'neopop-bounce': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
      boxShadow: {
        'neopop': '4px 4px 0 0 #252A34',
        'neopop-lg': '8px 8px 0 0 #252A34',
        'neopop-xl': '12px 12px 0 0 #252A34',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}