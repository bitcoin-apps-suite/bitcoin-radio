/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Bitcoin Radio duo-tone brown color scheme
        'radio-brown': {
          50: '#FDF8F3',   // Very light brown
          100: '#F7E6D3',  // Light brown
          200: '#E6C7A3',  // Medium light brown
          300: '#D2A373',  // Medium brown
          400: '#A0522D',  // Sienna (primary light)
          500: '#8B4513',  // SaddleBrown (primary)
          600: '#654321',  // DarkBrown (primary dark)
          700: '#4A2C1A',  // Very dark brown
          800: '#3C2415',  // Almost black brown
          900: '#2A1A0F',  // Nearly black
        },
        'radio-accent': {
          50: '#FDF6F0',   // Very light chocolate
          100: '#F4E4D3',  // Light chocolate
          200: '#E8C7A6',  // Medium light chocolate
          300: '#D2691E',  // Chocolate (accent)
          400: '#CD853F',  // Peru (accent light)
          500: '#B8860B',  // DarkGoldenrod
          600: '#8B6914',  // Dark gold brown
          700: '#6B4E0F',  // Very dark gold brown
          800: '#4A350A',  // Almost black gold
          900: '#2D1F06',  // Nearly black gold
        },
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(139, 69, 19, 0.4)' },
          'to': { boxShadow: '0 0 20px rgba(139, 69, 19, 0.4), 0 0 30px rgba(139, 69, 19, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}