/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#6b839e',
          600: '#516b8a',
          700: '#3a5475',
          800: '#233e60',
          900: '#0A1A3F',
        },
        gold: {
          50: '#fffdf7',
          100: '#fefce8',
          200: '#fef9c3',
          300: '#fef08a',
          400: '#fde047',
          500: '#F5C518',
          600: '#eab308',
          700: '#ca8a04',
          800: '#a16207',
          900: '#854d0e',
        },
        accent: {
          50: '#ffffff',
          100: '#ffffff',
          200: '#ffffff',
          300: '#ffffff',
          400: '#ffffff',
          500: '#FFFFFF',
          600: '#f3f4f6',
          700: '#e5e7eb',
          800: '#d1d5db',
          900: '#9ca3af',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
