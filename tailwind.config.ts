import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E67E22', // Earthy Orange
        secondary: '#8B4513', // Rustic Brown
        accent: '#F4A261', // Golden Yellow
        natural: {
          green: '#6A994E', // Olive Green
          beige: '#F5E1DA', // Warm Beige
          terracotta: '#D5573B', // Terracotta Red
          sage: '#B7C59B', // Soft Sage Green
          cream: '#FFF5E1', // Light Cream
        },
      },
      gridTemplateColumns: {
        responsiveGrid: 'repeat(auto-fit , minmax(28rem , 1fr))',
        responsiveGrid2: 'repeat(auto-fit , minmax(20rem , 1fr))',
      },
    },
  },
  plugins: [],
} satisfies Config;
