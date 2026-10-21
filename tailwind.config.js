/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#fcfbf7',
        surface: '#f7f6f0',
        card: '#ffffff',
        'surface-soft': '#f2efe7',
        'surface-strong': '#e6e2d6',
        hairline: '#d8d3c5',
        hairlinesoft: '#e8e4d8',
        ink: '#141716',
        bodytext: '#3a403d',
        muted: '#707873',
        brand: '#1b4332',
        'brand-subtle': '#e8f3ed',
        'brand-hover': '#143527',
        terracotta: '#a44a3f',
        'terracotta-subtle': '#fbeae7',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        '2xs': '0 1px 2px rgba(0, 0, 0, 0.04)',
        xs: '0 1px 3px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
