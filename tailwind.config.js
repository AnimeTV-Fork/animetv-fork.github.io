/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          start: '#0a0612',
          end: '#120a1f',
        },
        primary: {
          DEFAULT: '#a855f7',
          glow: '#d946ef',
        },
        secondary: '#6366f1',
        foreground: '#f4f1fa',
        muted: '#a29bb5',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}