import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pressStart: ['"Press Start 2P"', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
