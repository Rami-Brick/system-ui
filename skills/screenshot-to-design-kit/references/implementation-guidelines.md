# Implementation Guidelines

## Extraction Heuristics

Look for repeated shapes, not just repeated content.

- Same shape + same state behavior = primitive candidate.
- Same arrangement of primitives = compound candidate.
- Single screen-specific layout = page-level composition.
- Same value with different hue/spacing = token candidate.

Prefer semantic token names:

- `surface.glass`
- `surface.raised`
- `text.secondary`
- `accent.primary`
- `radius.panel`

Avoid literal-only names like `gray-850` unless the host system already uses that convention.

## Component Boundaries

Primitives own:

- shape
- base visual treatment
- direct accessibility
- simple variants

Compounds own:

- arrangement
- component combinations
- repeated product patterns
- controlled state if the state is local to the pattern

Pages own:

- data fetching
- route behavior
- screen-level layout
- business logic
- responsive region placement

## Visual Fidelity

Prioritize:

1. geometry and spacing rhythm
2. surface hierarchy
3. typography hierarchy
4. color and accent restraint
5. icon choices
6. exact content

If exact values are uncertain, label them as estimates in the audit and refine during playground QA.

## Accessibility

- Icon-only controls require accessible labels.
- Interactive elements need focus-visible states.
- Navigation should use semantic nav or aria labels.
- Tables should use table semantics when data is tabular.
- Low-contrast text from screenshots may need slight contrast adjustment.

## Validation

Run what the project provides:

- install dependencies if needed
- typecheck
- lint
- build
- visual screenshot checks when available

Fix text overlap, clipped controls, broken responsive behavior, and blank/failed render states before final handoff.

## Visual QA Procedure

When a dev server can run:

1. Start the app.
2. Capture or inspect at desktop width first.
3. If responsive scope requires it, inspect tablet and mobile widths.
4. Check for:
   - text larger than the reference rhythm
   - table columns overlapping
   - numbers squeezed into each other
   - buttons clipping labels
   - cards/panels losing padding
   - icons misaligned inside circles
   - accent color appearing too often
   - page-level layout bypassing the kit

If Playwright is available, prefer screenshots over eyeballing. If no browser tool is available, run build/lint and ask the user to share a screenshot after launching.

## Fidelity Calibration

After the first playground render, compare against the screenshot by category:

| Category | Question |
|---|---|
| Geometry | Do shapes, radii, and proportions feel from the same system? |
| Density | Does text/control scale match the screenshot's density? |
| Surfaces | Are panels layered like the reference, or too flat/card-like? |
| Type | Does the font feel too generic, too large, or off-brand? |
| Accent | Is the primary accent scarce and high-signal? |
| Composition | Are repeated regions built from kit components? |

Use this comparison to tune tokens and component spacing before final handoff.
