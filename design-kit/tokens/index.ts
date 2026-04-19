/**
 * Design Kit — Token Definitions
 *
 * Single source of truth for all design tokens.
 * Consumed by:
 *   - tailwind-preset.ts (Tailwind config)
 *   - globals.css (CSS custom properties, via the cssVars export)
 *
 * Token naming: semantic dot-notation resolved to flat camelCase for JS.
 * e.g. surface.glass-raised → surfaceGlassRaised
 *
 * Final packaged values for the dashboard design kit.
 */

// ─── Colors ───────────────────────────────────────────────────────────────────

export const colors = {
  // Background
  bgApp: "#0A0B0A",
  bgShell: "#9B9B95",

  // Surfaces — glass panels
  surfaceGlass: "rgba(255, 255, 255, 0.04)",
  surfaceGlassRaised: "rgba(255, 255, 255, 0.07)",
  surfaceGlassSelected: "rgba(255, 255, 255, 0.18)",

  // Surfaces — controls
  surfaceControl: "rgba(255, 255, 255, 0.06)",
  surfaceControlInverse: "rgba(255, 255, 255, 0.95)",
  surfaceControlMuted: "#C7C9CE",

  // Borders
  borderSoft: "rgba(255, 255, 255, 0.08)",
  borderFaint: "rgba(255, 255, 255, 0.05)",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.72)",
  textTertiary: "rgba(255, 255, 255, 0.46)",
  textInverse: "#0B0B0B",
  textInverseMuted: "rgba(11, 11, 11, 0.55)",

  // Accent — one per page maximum
  accentPrimary: "#DFFF2F",
  accentInfo: "#2D7CF6",

  // Identity palette — avatar rings, KPI bar segments
  identityBlue: "#2D7CF6",
  identityMagenta: "#D94BF4",
  identityChartreuse: "#E8F21D",
  identitySilver: "#D7D9DF",
  identityOrange: "#FF9A18",
  identityCyan: "#38D3D3",

  // Atmosphere — ambient glow, vignette
  glowGreen: "rgba(154, 255, 90, 0.10)",
  glowTeal: "rgba(92, 214, 180, 0.10)",
  shadowAmbient: "rgba(0, 0, 0, 0.35)",
} as const;

export type ColorToken = keyof typeof colors;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  // Font families
  fontDisplay: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", sans-serif',
  fontBody: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", sans-serif',

  // Scale — size / weight pairs
  displayLg: { fontSize: "40px", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" },
  headingMd: { fontSize: "20px", fontWeight: 600, lineHeight: 1.2 },
  panelTitle: { fontSize: "16px", fontWeight: 600, lineHeight: 1.3 },
  statXl: { fontSize: "28px", fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em" },
  statLg: { fontSize: "20px", fontWeight: 600, lineHeight: 1, letterSpacing: "-0.01em" },
  bodyMd: { fontSize: "13px", fontWeight: 400, lineHeight: 1.5 },
  bodySm: { fontSize: "11px", fontWeight: 400, lineHeight: 1.4 },
  micro: { fontSize: "10px", fontWeight: 400, lineHeight: 1.3 },
} as const;

// ─── Radii ────────────────────────────────────────────────────────────────────

export const radii = {
  app: "32px",
  panel: "28px",
  card: "20px",
  pill: "9999px",
  round: "50%",
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "32px",
} as const;

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const sizes = {
  // Circular icon buttons
  iconSm: "32px",
  iconMd: "40px",
  iconLg: "48px",

  // Avatars
  avatarSm: "24px",
  avatarMd: "36px",
  avatarLg: "56px",

  // Pills
  pillSm: "32px",
  pillMd: "40px",
  pillLg: "48px",

  // Segmented bar heights
  barSm: "4px",
  barMd: "10px",
  barLg: "16px",
} as const;

// ─── Effects ──────────────────────────────────────────────────────────────────

export const effects = {
  blurPanel: "20px",
  blurControl: "12px",
  shadowPanel: "0 8px 32px rgba(0, 0, 0, 0.4)",
  shadowControl: "0 2px 8px rgba(0, 0, 0, 0.2)",
} as const;

// ─── CSS custom properties export ────────────────────────────────────────────
//
// Add this to your globals.css via:
//
//   :root {
//     /* paste cssVars content here, or generate with Object.entries(cssVars) */
//   }

export const cssVars = {
  "--color-bg-app": colors.bgApp,
  "--color-bg-shell": colors.bgShell,
  "--color-surface-glass": colors.surfaceGlass,
  "--color-surface-glass-raised": colors.surfaceGlassRaised,
  "--color-surface-glass-selected": colors.surfaceGlassSelected,
  "--color-surface-control": colors.surfaceControl,
  "--color-surface-control-inverse": colors.surfaceControlInverse,
  "--color-surface-control-muted": colors.surfaceControlMuted,
  "--color-border-soft": colors.borderSoft,
  "--color-border-faint": colors.borderFaint,
  "--color-text-primary": colors.textPrimary,
  "--color-text-secondary": colors.textSecondary,
  "--color-text-tertiary": colors.textTertiary,
  "--color-text-inverse": colors.textInverse,
  "--color-text-inverse-muted": colors.textInverseMuted,
  "--color-accent-primary": colors.accentPrimary,
  "--color-accent-info": colors.accentInfo,
  "--color-identity-blue": colors.identityBlue,
  "--color-identity-magenta": colors.identityMagenta,
  "--color-identity-chartreuse": colors.identityChartreuse,
  "--color-identity-silver": colors.identitySilver,
  "--color-identity-orange": colors.identityOrange,
  "--color-identity-cyan": colors.identityCyan,
  "--color-glow-green": colors.glowGreen,
  "--color-glow-teal": colors.glowTeal,
  "--radius-app": radii.app,
  "--radius-panel": radii.panel,
  "--radius-card": radii.card,
  "--radius-pill": radii.pill,
  "--radius-round": radii.round,
  "--space-1": spacing[1],
  "--space-2": spacing[2],
  "--space-3": spacing[3],
  "--space-4": spacing[4],
  "--space-5": spacing[5],
  "--space-6": spacing[6],
  "--space-7": spacing[7],
  "--size-icon-sm": sizes.iconSm,
  "--size-icon-md": sizes.iconMd,
  "--size-icon-lg": sizes.iconLg,
  "--size-avatar-sm": sizes.avatarSm,
  "--size-avatar-md": sizes.avatarMd,
  "--size-avatar-lg": sizes.avatarLg,
  "--size-pill-sm": sizes.pillSm,
  "--size-pill-md": sizes.pillMd,
  "--size-pill-lg": sizes.pillLg,
  "--size-bar-sm": sizes.barSm,
  "--size-bar-md": sizes.barMd,
  "--size-bar-lg": sizes.barLg,
  "--effect-blur-panel": effects.blurPanel,
  "--effect-blur-control": effects.blurControl,
  "--effect-shadow-panel": effects.shadowPanel,
  "--effect-shadow-control": effects.shadowControl,
} as const;
