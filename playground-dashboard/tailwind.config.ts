import type { Config } from "tailwindcss";
import kitPreset from "../design-kit/tokens/tailwind-preset";

export default {
  presets: [kitPreset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../design-kit/**/*.{ts,tsx}",
  ],
} satisfies Config;
