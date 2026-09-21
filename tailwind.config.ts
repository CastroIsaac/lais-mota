import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // "ink" = the neutral text/dark-surface scale — recolored to deep navy per
        // client direction (she does not want black as the predominant color).
        ink: {
          950: '#101f30',
          900: '#17293c',
          700: '#44586b',
          500: '#5c6d7a',
          300: '#b7c0c7',
        },
        paper: '#faf7f1',
        line: 'rgba(16,31,48,0.12)',
        // Discreet champagne/gold accent — replaces the earlier green accent per
        // client direction: off-white, deep navy, blue-gray, champagne/sand, discreet gold.
        gold: {
          50: '#f8f2e6',
          100: '#efe1c5',
          300: '#dcc08a',
          400: '#c8a463',
          500: '#b48f4c',
          600: '#96753a',
          700: '#7a5d2e',
        },
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
      boxShadow: {
        card: '0 18px 45px rgba(16, 31, 48, 0.10)',
      },
    },
  },
  plugins: [],
}

export default config
