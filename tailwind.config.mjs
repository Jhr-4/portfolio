import animatePlugin from 'tailwindcss-animate'; // Import the plugin

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Use class strategy
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define sans and serif based on docs/02-typography.md
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', '"Source Serif Pro"', 'serif'], // From docs/02
      },
      colors: {
        // Define colors based on docs/03-color-system.md using CSS variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))", // Often set to primary
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: { // Define secondary if used, e.g., for subtle backgrounds or borders
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: { // Teal/Emerald from docs/03
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Remove the old Everyman brand colors
        // primary: { ... }, // Removed
        // secondary: { ... }, // Removed
        // accent: { ... }, // Removed
        // neutral: { ... }, // Removed
        // success: { ... }, // Removed
        // error: { ... }, // Removed
        // warning: { ... }, // Removed
      },
      borderRadius: {
        // Align with shadcn/ui defaults or customize based on docs/04
        lg: "var(--radius)", // Example: 0.5rem
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        // Define spacing scale based on 4px/8px unit from docs/04
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px', // Added for consistency
        '10': '40px',
        '11': '44px', // Added for consistency
        '12': '48px',
        '16': '64px',
        // Add more steps as needed based on 4px increments
      },
      container: {
        center: true,
        padding: "2rem", // Default padding
        screens: {
          "2xl": "1400px", // Max container width
        },
      },
    },
  },
  plugins: [animatePlugin], // Use the imported plugin
}