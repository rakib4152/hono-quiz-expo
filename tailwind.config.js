/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: NativeWind v4 uses content matching for React Native JSX/TSX
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981', // emerald-500 for correct feedback
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        },
        error: {
          500: '#f43f5e', // rose-500 for incorrect feedback
          600: '#e11d48',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
    },
  },
  plugins: [],
};
