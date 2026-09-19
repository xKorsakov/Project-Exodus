export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        navy: '#000080',
        'navy-deep': '#000033',
        'navy-line': '#0a0a4d',
        ash: '#b8bcd0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(0,0,128,0.9)',
      },
    },
  },
};