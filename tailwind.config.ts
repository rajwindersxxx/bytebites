import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',// Change from 'media' to 'class'
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)', // Earthy Orange
        secondary: 'var(--color-secondary)', // Rustic Brown
        accent: 'var(--color-accent)', // Golden Yellow
        natural: {
          green: 'var(--color-green)', // Olive Green
          beige: 'var(--color-beige)',
          terracotta: 'var(--color-terracotta)', // Terracotta Red
          sage: 'var(--color-sage)', // Soft Sage Green
          cream: 'var(--color-cream)',
        },
      },
      fontFamily: {
        poppins: '--font-Poppins',
        quicksand: '--font-quickSand'
      },
      gridTemplateColumns: {
        responsiveGrid: 'repeat(auto-fill , minmax(28rem , 1fr))',
        responsiveGrid2: 'repeat(auto-fit , minmax(20rem , 1fr))',
        responsiveGrid3: 'repeat(auto-fill , minmax(6rem , 1fr))',
        responsiveGrid2Small: 'repeat(auto-fill , minmax(14rem , 1fr))',
      },
    },
  },
  plugins: [],
} satisfies Config;
