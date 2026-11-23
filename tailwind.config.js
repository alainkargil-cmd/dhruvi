/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mahogany: {
          light: '#4E2A1E',
          DEFAULT: '#2C1810',
          dark: '#1D0C07',
          deep: '#150804',
        },
        walnut: {
          light: '#533226',
          DEFAULT: '#3B2219',
          dark: '#1A0D08',
        },
        gold: {
          light: '#FCEAB2',
          DEFAULT: '#E5C158',
          dark: '#B89738',
          champagne: '#F5D77F',
          shimmer: '#FFE494',
        },
        ivory: {
          DEFAULT: '#FAF6F0',
          warm: '#F5EFEB',
          antique: '#EFE6DC',
          parchment: '#F2E8D5',
        },
        rose: {
          dusty: '#C88A85',
          blush: '#DCAE96',
          deep: '#B87377',
        },
        lavender: {
          muted: '#9B8EA9',
          soft: '#B5A9C4',
          dark: '#675A77',
        },
        burgundy: {
          light: '#6B1724',
          DEFAULT: '#58111A',
          dark: '#3A0B12',
        },
        amber: {
          soft: '#F3B768',
          glow: '#FFA733',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Dancing Script"', '"Great Vibes"', 'cursive'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
