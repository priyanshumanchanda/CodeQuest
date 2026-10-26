/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#98a6b8',
          500: '#66758a',
          600: '#4a596b',
          700: '#344252',
          800: '#273342',
          900: '#141d28',
          950: '#0b0f14',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#5558cf',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(79,70,229,0.16), 0 20px 45px rgba(11, 15, 20, 0.38)',
      },
    },
  },
  plugins: [],
};
