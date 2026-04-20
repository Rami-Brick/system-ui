# QA Checklist

Run this before final handoff.

## Functional

- Dependencies installed or documented.
- Typecheck/build passes, or failure is reported with cause.
- Lint passes, or failure is reported with cause.
- Dev server instructions are provided.
- Public components are exported.

## Visual

- No text overlaps.
- No clipped labels in buttons/pills.
- No table amount/rate columns colliding.
- No panel content touching edges unexpectedly.
- Icon buttons are circular and icons are centered.
- Typography scale feels close to the chosen reference.
- Accent color is not overused.
- Responsive layouts do not collapse incoherently in requested viewports.

## Kit Integrity

- Playground imports kit components.
- Repeated UI is not recreated with one-off markup.
- Tokens are used for repeated design decisions.
- Catalog docs exist for reusable components.
- Component boundaries are clear.
- `README.md` and `CLAUDE.md` exist.

## Final Report

Include:

- files/folders created or changed
- validation commands and results
- visual QA notes
- known limitations
- how to run the playground
- how to apply the kit to another app
