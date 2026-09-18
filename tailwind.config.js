/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        typewriter: ['"Courier Prime"', '"Special Elite"', 'monospace'],
        agency: ['"Special Elite"', '"Courier Prime"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        // Detective Corkboard Theme
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        warning: "hsl(var(--warning))",
        "warning-foreground": "hsl(var(--warning-foreground))",
        success: "hsl(var(--success))",
        "success-foreground": "hsl(var(--success-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        cork: {
          dark: "#140f0c",
          base: "#241b15",
          light: "#362920",
          accent: "#8c3829"
        },
        polaroid: {
          paper: "#f4efe6",
          dark: "#1a1614",
          border: "#e5ded0"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'crime-glow': '0 0 25px rgba(239, 68, 68, 0.35)',
        'crime-glow-lg': '0 0 45px rgba(239, 68, 68, 0.5)',
        'spotlight': '0 0 120px 40px rgba(255, 230, 180, 0.12)',
        'polaroid': '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
        'pin': '0 4px 8px rgba(0, 0, 0, 0.6)',
        'tape': '0 2px 5px rgba(0,0,0,0.3)',
      },
      animation: {
        'pulse-crime': 'pulse-crime 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'flicker': 'flicker 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-crime': {
          '0%, 100%': { opacity: '0.8', boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 25px rgba(239, 68, 68, 0.6)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '42%': { opacity: '0.85' },
          '43%': { opacity: '0.98' },
          '45%': { opacity: '0.75' },
          '46%': { opacity: '1' },
        }
      },
    },
  },
  plugins: [],
}
