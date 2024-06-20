import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        transparent: 'transparent',
        primary: {
          DEFAULT: '#692B96',
        },
        blue: {
          '50': '#F2F7FF',
          '100': '#DCEBFE',
          '200': '#BEDBFE',
          '300': '#91C3FD',
          '400': '#61A6FA',
          '500': '#3479E9',
          '600': '#2463EB',
          '700': '#1D4FD7',
          '800': '#1E3FAE',
          '900': '#1E3B8A',
        },
        purple: {
          '50': '#FAF5FF',
          '100': '#F2E5FF',
          '200': '#EAD6FF',
          '300': '#D8B4FE',
          '400': '#BF83FC',
          '500': '#A855F7',
          '600': '#9234EA',
          '700': '#7E22CE',
          '800': '#6A21A6',
          '900': '#591C87',
        },
        gray: {
          '50': '#FCFCFC',
          '100': '#F4F4F5',
          '200': '#E4E4E7',
          '300': '#D4D4D8',
          '400': '#A1A1AA',
          '500': '#71717A',
          '600': '#52525B',
          '700': '#3F3F46',
          '800': '#27272A',
          '900': '#202024',
        },
        shadowAvatar: 'rgba(0, 0, 0, 0.14)',
      },
      boxShadow: {
        avatar: '0px 1.75px 4px -1px',
      },
      borderRadius: {},
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
