---
name: screenshot-to-design-kit
description: Convert UI screenshots, website links, design references, or visual inspiration into a reusable React/Tailwind design kit with tokens, primitives, compounds, catalog docs, examples, and checkpoint-based human review. Use when the user wants to recreate a UI from screenshots, extract a template/design system, automate screenshot-to-component workflows, build a design kit, or apply a captured visual language to another application.
---

# Screenshot To Design Kit

## Core Rule

Build a reusable visual system, not just a screenshot clone.

When given screenshots, links, prompts, or resources, first extract the design language, then package it as tokens, primitives, compounds, docs, and a playground example. Keep human checkpoints because taste and fidelity need review.

## Input Handling

Inspect all provided materials before asking intake questions:

- screenshots or image files
- links to reference sites or design shots
- existing app code
- written prompt or brand notes
- current design-kit files if this is an update

If a linked reference or current information is needed and not provided locally, browse or ask for the missing artifact. If screenshots are missing, ask for them before starting.

## Intake Questions

Ask intake questions once, immediately after inspecting inputs. Prefer a structured multi-choice UI when available. Otherwise ask concise numbered questions with 2-4 options each and allow custom answers.

Use `references/intake-questions.md` for the full question bank. Ask only the questions needed for the task. Do not ask every possible question if the answer is obvious from context.

Default questions:

1. Output goal: reusable design kit, one-screen recreation, apply to existing app, or all of these.
2. Fidelity target: close clone, inspired system, or loose style transfer.
3. Stack: React/Vite/Tailwind default unless the app already uses another stack.
4. Typography direction: premium geometric, editorial/luxury, technical/neutral, or custom.
5. Checkpoint mode: guided checkpoints, fast auto with final review, or research only.
6. Responsive scope: desktop only, desktop plus tablet, or full responsive.

After the user answers, summarize the decisions in 5-8 lines and start Phase 1.

## Workflow

Follow this checkpoint sequence unless the user explicitly chooses fast auto:

1. **Phase 1: Audit**
   Produce a visual audit, design invariants, token estimates, component taxonomy, risks, and open questions. Stop for approval.

2. **Phase 2: System Plan**
   Define the output folder structure, token schema, primitives, compounds, and build order. Stop for approval.

3. **Phase 3: Implement Kit**
   Create or update `design-kit/` with tokens, primitives, compounds, utilities, exports, and catalog docs. Run typecheck/lint when available. Stop with a short implementation report.

4. **Phase 4: Playground**
   Build a working example that uses the kit. Do not bypass the kit with large one-off styling except for page-level composition. Stop with screenshots or clear run instructions.

5. **Phase 5: QA And Package**
   Run build/lint, inspect desktop/mobile if possible, fix obvious layout overlap, and create `CLAUDE.md` plus `README.md` usage guidance. Stop with final handoff.

Use `references/checkpoint-workflow.md` for detailed phase deliverables and gate criteria.

Before implementing a substantial kit, skim `references/case-study-dashboard-kit.md` for a compact example of the expected decomposition depth and output quality.

## Output Contract

For a new kit, create this shape unless the user asks otherwise:

```text
design-kit/
  tokens/
  utils/
  primitives/
  compounds/
  examples/
  catalog/
    primitives/
    compounds/
  CLAUDE.md
  README.md
```

Use `references/output-contract.md` for file-level expectations.
Use `references/qa-checklist.md` before final handoff.

If starting from an empty project, run:

```bash
python skills/screenshot-to-design-kit/scripts/scaffold_design_kit.py --root .
```

Adjust the script path if the skill is installed globally.

## Implementation Standards

- Prefer React + TypeScript + Tailwind unless the target app already has a different stack.
- Use semantic tokens first, then Tailwind utilities generated from those tokens.
- Use primitives for foundational shapes: buttons, avatars, panels, stats, rows, bars.
- Use compounds for repeated arrangements: navs, headers, KPI strips, cards, table rows, detail panels.
- Keep page-level layout separate from reusable components.
- Add catalog docs that say what each component owns and what is intentionally not part of it.
- Preserve accessibility: labels for icon buttons, focus states, semantic nav/table/region markup.
- Avoid overfitting to one screenshot artifact unless the user asked for a strict clone.
- Validate with build/lint and visual inspection where possible.

Use `references/implementation-guidelines.md` for deeper rules.

## Checkpoint Behavior

At checkpoints:

- Give a short report: completed work, files changed, decisions made, risks.
- Ask whether to continue to the next phase.
- Do not continue past the checkpoint unless the user approved or selected fast auto.

In fast auto mode, continue through all phases, but still produce the same reports in the final answer.

Never mark the project complete if there are obvious text overlaps, clipped buttons, blank renders, missing exports, or a playground that mostly ignores the kit.

## Applying The Kit To An Existing App

When the target is an existing app:

1. Read the app routes/components first.
2. Map current UI patterns to kit primitives and compounds.
3. Preserve existing data, behavior, routing, auth, and business logic.
4. Change presentation and layout only unless structural changes are necessary.
5. Convert one screen at a time and verify after each screen.

## Failure Modes To Avoid

- Do not make only a pretty playground and skip reusable components.
- Do not make only research docs and skip implementation when implementation is requested.
- Do not create generic shadcn/SaaS UI if the screenshot has a distinctive language.
- Do not ask questions before inspecting the screenshot/resources.
- Do not bury the user in many rounds of tiny questions; ask the key questions once, then work phase by phase.
