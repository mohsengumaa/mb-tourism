/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#059669',
      },
      fontFamily: {
        sans: ['var(--font-arabic)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


