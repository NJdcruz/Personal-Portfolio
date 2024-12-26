/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   
    "./src/**/*.{html,js}", // Adjust based on your project file structure
    "./index.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-purple-to-white': 'linear-gradient(to right, #6B21A8, #FFFFFF)', // Purple to White
      },
      colors: {
        custompurple: '#23153c', // Your custom color
      },

      
      
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

