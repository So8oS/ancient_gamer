import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        LuckiestGuy: ["Luckiest Guy", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
