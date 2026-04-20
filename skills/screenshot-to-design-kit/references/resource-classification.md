# Resource Classification

Use this when the user provides multiple screenshots or mixed visual resources.

## Classify Each Resource

Create a short inventory before asking intake questions:

```text
Resource inventory:
- main-dashboard.png: likely primary screen to recreate
- palette.png: supporting color reference
- typography.png: supporting typography reference
- detail-card.png: component/detail reference
- phone-screenshot.png: primary mobile app screen with device/capture chrome
```

## Roles

- **Primary screen**: the page/screen to recreate in the playground.
- **Supporting color reference**: palette, swatches, brand colors, gradients.
- **Supporting typography reference**: type samples, headings, labels, editorial references.
- **Component/detail reference**: close-up of cards, nav, buttons, charts, inputs.
- **Mood/inspiration reference**: overall vibe, not layout.
- **Frame/chrome reference**: device/browser/mockup context around the real UI.

## Frame Interpretation

If a resource contains a phone, browser, or mockup frame, ask:

```text
How should this frame behave?
1. Remove it; build the actual app/page only.
2. Recreate it as a mockup frame.
3. Treat it as viewport context only.
4. I am not sure; ask me after you explain what you see.
```

For mobile screenshots, also ask:

```text
Should status bar/notch/dynamic island be included?
1. Remove all device chrome.
2. Keep safe-area spacing but do not draw chrome.
3. Recreate device chrome visually.
```

## Default Assumption

When unclear, prefer building the real app surface, not the presentation wrapper. Ask before drawing device chrome.
