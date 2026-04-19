/**
 * Design Kit — Tailwind Preset
 *
 * Drop this into your project's tailwind.config.ts:
 *
 *   import kitPreset from "./design-kit/tokens/tailwind-preset";
 *
 *   export default {
 *     presets: [kitPreset],
 *     content: [...],
 *   };
 *
 * The preset extends Tailwind's default theme rather than replacing it.
 */

import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { colors, radii, sizes, spacing, effects, typography } from "./index";

const sizeUtilities = Object.fromEntries(
  Object.entries(sizes).map(([key, value]) => [
    `.size-${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`,
    { width: value, height: value },
  ]),
);

const kitPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        "bg-app": colors.bgApp,
        "bg-shell": colors.bgShell,

        "surface-glass": colors.surfaceGlass,
        "surface-glass-raised": colors.surfaceGlassRaised,
        "surface-glass-selected": colors.surfaceGlassSelected,
        "surface-control": colors.surfaceControl,
        "surface-control-inverse": colors.surfaceControlInverse,
        "surface-control-muted": colors.surfaceControlMuted,

        "border-soft": colors.borderSoft,
        "border-faint": colors.borderFaint,

        "text-kit-primary": colors.textPrimary,
        "text-kit-secondary": colors.textSecondary,
        "text-kit-tertiary": colors.textTertiary,
        "text-kit-inverse": colors.textInverse,
        "text-kit-inverse-muted": colors.textInverseMuted,

        "accent-primary": colors.accentPrimary,
        "accent-info": colors.accentInfo,

        "identity-blue": colors.identityBlue,
        "identity-magenta": colors.identityMagenta,
        "identity-chartreuse": colors.identityChartreuse,
        "identity-silver": colors.identitySilver,
        "identity-orange": colors.identityOrange,
        "identity-cyan": colors.identityCyan,

        "glow-green": colors.glowGreen,
        "glow-teal": colors.glowTeal,
      },

      borderRadius: {
        app: radii.app,
        panel: radii.panel,
        card: radii.card,
        pill: radii.pill,
        round: radii.round,
      },

      spacing: {
        "kit-1": spacing[1],
        "kit-2": spacing[2],
        "kit-3": spacing[3],
        "kit-4": spacing[4],
        "kit-5": spacing[5],
        "kit-6": spacing[6],
        "kit-7": spacing[7],
      },

      width: {
        "icon-sm": sizes.iconSm,
        "icon-md": sizes.iconMd,
        "icon-lg": sizes.iconLg,
        "avatar-sm": sizes.avatarSm,
        "avatar-md": sizes.avatarMd,
        "avatar-lg": sizes.avatarLg,
        "pill-sm": sizes.pillSm,
        "pill-md": sizes.pillMd,
        "pill-lg": sizes.pillLg,
        "bar-sm": sizes.barSm,
        "bar-md": sizes.barMd,
        "bar-lg": sizes.barLg,
      },

      height: {
        "icon-sm": sizes.iconSm,
        "icon-md": sizes.iconMd,
        "icon-lg": sizes.iconLg,
        "avatar-sm": sizes.avatarSm,
        "avatar-md": sizes.avatarMd,
        "avatar-lg": sizes.avatarLg,
        "pill-sm": sizes.pillSm,
        "pill-md": sizes.pillMd,
        "pill-lg": sizes.pillLg,
        "bar-sm": sizes.barSm,
        "bar-md": sizes.barMd,
        "bar-lg": sizes.barLg,
      },

      fontSize: {
        "display-lg": [
          typography.displayLg.fontSize,
          {
            lineHeight: String(typography.displayLg.lineHeight),
            letterSpacing: typography.displayLg.letterSpacing,
            fontWeight: String(typography.displayLg.fontWeight),
          },
        ],
        "heading-md": [
          typography.headingMd.fontSize,
          {
            lineHeight: String(typography.headingMd.lineHeight),
            fontWeight: String(typography.headingMd.fontWeight),
          },
        ],
        "panel-title": [
          typography.panelTitle.fontSize,
          {
            lineHeight: String(typography.panelTitle.lineHeight),
            fontWeight: String(typography.panelTitle.fontWeight),
          },
        ],
        "stat-xl": [
          typography.statXl.fontSize,
          {
            lineHeight: String(typography.statXl.lineHeight),
            letterSpacing: typography.statXl.letterSpacing,
            fontWeight: String(typography.statXl.fontWeight),
          },
        ],
        "stat-lg": [
          typography.statLg.fontSize,
          {
            lineHeight: String(typography.statLg.lineHeight),
            letterSpacing: typography.statLg.letterSpacing,
            fontWeight: String(typography.statLg.fontWeight),
          },
        ],
        "body-md": [
          typography.bodyMd.fontSize,
          {
            lineHeight: String(typography.bodyMd.lineHeight),
            fontWeight: String(typography.bodyMd.fontWeight),
          },
        ],
        "body-sm": [
          typography.bodySm.fontSize,
          {
            lineHeight: String(typography.bodySm.lineHeight),
            fontWeight: String(typography.bodySm.fontWeight),
          },
        ],
        micro: [
          typography.micro.fontSize,
          {
            lineHeight: String(typography.micro.lineHeight),
            fontWeight: String(typography.micro.fontWeight),
          },
        ],
      },

      backdropBlur: {
        "kit-panel": effects.blurPanel,
        "kit-control": effects.blurControl,
      },

      boxShadow: {
        "kit-panel": effects.shadowPanel,
        "kit-control": effects.shadowControl,
      },

      fontFamily: {
        display: ['"Inter Display"', '"Inter"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(sizeUtilities);
    }),
  ],
};

export default kitPreset;
