# Design Kit Project — Dashboard Recreation & Documentation

> **Handoff brief.** This document explains a project I'm working on and the exact plan I'm following. Read it carefully before replying. I will also attach a reference screenshot and provide a source link below — make sure you look at the image before starting.

---

## 1. Background and goal

I'm building a **reusable design kit** that I can reference from multiple projects. The problem I'm trying to solve: when I use AI coding assistants to build UIs, the output tends to look generic — the statistical average of "acceptable web UI." I want the opposite: a distinctive, opinionated visual language captured as **reference components that AI assistants can pattern-match against** in future projects.

Approach: pick a real design I love, recreate it with placeholder content, **document every element as a standalone reusable component**, and extract the design tokens (colors, typography, radii, shadows) as the foundation. The dashboard you'll work on is the **first pattern** in this kit, and its components will be reused across future projects.

## 2. What I'm providing you

1. **A screenshot** — attached to this conversation. It's the "Salesforce Lead Management Dashboard" concept from Dribbble.
2. **The source link** — https://dribbble.com/shots/25205060-Salesforce-Lead-Management-Dashboard
3. **This plan document.**

**Before replying, look at the screenshot.** If you can't, tell me — don't proceed without it.

## 3. Stack preferences

- React + Vite + TypeScript
- Tailwind CSS
- shadcn/ui as the base, but heavily restyled/derived (the kit should NOT look like default shadcn)
- `lucide-react` for icons
- Fonts: Inter + Inter Display by default, unless we agree otherwise

The kit must be **portable** — assume it gets dropped into unrelated projects as a git submodule or copy.

## 4. The approach (and why)

Decompose → document → extract tokens → build components → assemble the full screen.

Rationale: LLMs pattern-match concrete examples much better than they follow abstract style rules. So the kit must contain **working reference components with documented specs**, not a list of dos and don'ts. Rebuilding the full screen at the end proves the catalog actually composes correctly.

## 5. The phased plan

### Phase 1 — Design audit + token extraction

Do a thorough visual breakdown of the screenshot. For each region of the screen (top nav, page header, KPI strip, left invoice list panel, right invoice detail panel, global canvas), identify every distinct element and describe:

- What it is
- Its visual characteristics (shape, size, color, typography, state variants)
- Whether it's a reusable primitive or a one-off composition

Then extract **design tokens**:

- Colors (with semantic names)
- Typography scale
- Radii
- Spacing
- Effects (glass/blur, glow, shadows)

**Deliverable:** a written audit + a token table. No code yet.

**Stop and wait for me to validate before moving to Phase 2.**

### Phase 2 — Component catalog

Group the audited elements into reusable components. Order them from **most reusable to least** (e.g. a circular icon button appears ~15 times on this single screen — it's the first component).

For each component produce:

- Name + purpose
- Props / variants
- Visual spec
- Working code (React + TS + Tailwind)
- One or two usage examples

We go **one component at a time**. Show me a component, I validate, we move to the next. Do not batch multiple components in one message.

### Phase 3 — Recreate the dashboard

Using only components from the catalog, recreate the screen 1:1 with placeholder content. This proves the catalog is complete. Any gap (missing component, missing variant) goes back into the catalog before the assembly continues.

### Phase 4 — Extract into a reusable kit

Package everything into a standalone folder structure:

- `/tokens` — CSS vars + TS exports
- `/components` — cataloged components
- `/patterns` — composed pieces (KPI strip, data table row, etc.)
- `/examples/salesforce-dashboard` — the recreation from Phase 3
- `CLAUDE.md` — how AI assistants should use this kit in new projects
- `README.md` — human-facing docs

## 6. How I want to work (hard rules)

1. **Step by step.** Finish one step, wait for my explicit approval, then move on. Never jump ahead.
2. **Discuss before implementing.** If there's a meaningful decision (font choice, library, structural pattern), propose options and get approval before coding.
3. **Ask for source files.** Never assume types, APIs, or existing code. If you need something, ask.
4. **Suggest better alternatives.** If you think my request is suboptimal, push back with reasoning instead of executing blindly.
5. **Ask clarifying questions** when something is unclear — better than guessing.
6. **Be honest about limits.** If you can't read fine details from the screenshot (exact font, exact hex values), say so and label estimates as estimates.
7. **No code dumps.** Progressive, iterative, reviewable output. Small steps.

## 7. Where to start

Start with **Phase 1 only**. Do the design audit and token extraction based on the attached screenshot. Don't preview Phase 2. Don't write component code.

When you finish, end your response with:

- A short list of any ambiguities you couldn't resolve from the image
- Any decisions you need from me before Phase 2 can begin (e.g. font commitment, icon set confirmation, color palette refinement)

Then stop and wait for my reply.
