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
          start: 'var(--color-bg-start)',
          end: 'var(--color-bg-end)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          glow: 'var(--color-primary-glow)',
        },
        secondary: 'var(--color-secondary)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Righteous', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}