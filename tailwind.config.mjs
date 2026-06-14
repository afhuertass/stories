/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        story: ['Cormorant Garamond', 'Georgia', 'serif'],
        signal: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(125, 211, 252, 0.14), 0 24px 80px rgba(15, 23, 42, 0.55)',
      },
    },
  },
  plugins: [],
};
