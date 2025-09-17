/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ec4899', // Pink color from the gradient
        neutral: '#94a3b8', // Slate gray
        white: '#e2e8f0',   // Light gray-white
        black: '#0e141b',   // Dark black
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
        serif: ['Gabarito Variable', 'ui-serif', 'serif'],
      },
      letterSpacing: {
        'tightest': '-2px',
        'tighter': '-1px',
        'tight': '-0.25px',
      },
      fontSize: {
        'xs': ['0.875rem', '1.125rem'],
        'sm': ['1rem', '1.25rem'],
        'base': ['1.125rem', '1.625rem'],
        'lg': ['1.25rem', '1.75rem'],
        'xl': ['1.5rem', '1.813rem'],
        '2xl': ['1.75rem', '2.125rem'],
        '3xl': ['2rem', '2.375rem'],
        '4xl': ['2.25rem', '2.688rem'],
        '5xl': ['2.5rem', '3rem'],
        '6xl': ['3rem', '3.625rem'],
        '7xl': ['3.75rem', '1'],
        '8xl': ['4.5rem', '4.875rem'],
        '9xl': ['6rem', '6.625rem'],
      },
      animation: {
        'slide-in': 'slide-in 600ms ease both',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        'slide-in': {
          '10%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}