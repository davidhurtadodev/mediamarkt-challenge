/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-accent': '#DF0000',
        'primary-light': '#DF0000',
        gray: '#3A3541DE',
      },
      backgroundColor: {
        'custom-background-opacity': 'rgba(0,0,0,.3)',
        'custom-overlay-opacity': 'rgba(0, 0, 0, 0.25)',
      },
    },
    plugins: [],
  },
};
