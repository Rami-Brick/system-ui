# Data Display Decision Tree

**Path:** `/catalog/primitives/_decision-tree.md`

Companion document to the primitive catalog. Use this when you know you need to display something but aren't sure which primitive to reach for. Written to be scanned quickly — by humans and by AI assistants using this kit in future projects.

This document does not replace individual component docs. It resolves the *"which one?"* question when multiple primitives look like they could fit.

---

## Master decision tree

Start at the top. Answer the first question that applies. Stop at the first match.

```text
What am I putting on the screen?

├─ Is it interactive (clickable)?
│  ├─ Yes, icon-only
│  │     → CircularIconButton
│  │
│  └─ Yes, has a text label
│        → PillButton
│
├─ Does it represent a person or entity's identity?
│     → AvatarCircle
│
├─ Is it a proportional breakdown of a whole (several values summing to a total)?
│     → SegmentedBar
│
└─ Is it a label paired with a value (the most common case)?
   │
   ├─ Is the value a short answer to a descriptive key?
   │  Think: "Invoice Date: 09/08/2018", "Status: Paid"
   │     → KeyValueRow
   │
   ├─ Is the value a headline number or stat, with the label as quiet context?
   │  Think: "$600,00" above "2 overdue invoices" (KPI strip)
   │     → MetricBlock
   │
   └─ Is the value a summary or total at the end of a section,
      sitting inside its own pill surface?
      Think: "Sub Total $80.00", "Balance Due $80.00" (totals row)
         → PillStat
```

---

## The three ambiguities — resolved

### A) PillButton vs PillStat

Both are pill-shaped. Both can have white backgrounds. Both can contain text. They are entirely different primitives.

| Question | PillButton | PillStat |
|---|---|---|
| Is it clickable? | **Yes** | No |
| Does it have hover / pressed states? | **Yes** | No |
| What's inside? | A single action label ("Receive payment") | A label + value pair ("Sub Total $80.00") |
| What does it do? | Triggers an action | Displays information |
| Cursor on hover? | `pointer` | `default` |

**The test:** if the user clicks it, does something happen? If yes, it's a `PillButton`. If no, it's a `PillStat`.

---

### B) MetricBlock vs PillStat

Both show emphasized label/value data. The distinction is about *containment* and *context*.

| Question | MetricBlock | PillStat |
|---|---|---|
| Sits inside a container? | No — it's containerless | Yes — it's inside its own pill surface |
| Typical context? | Grid or row of peers (KPI strip, dashboard stats) | End of a section, summary role |
| Value size relative to label? | Dominant — value is the focal point | Similar weight — both visible, value slightly bolder |
| How many per page? | Many (usually 3–8 in a group) | Few (usually 1–3 at a section's end) |
| Layout? | Always stacked (value above label) | Always inline (label left, value right) |

**The test:** is the value the *answer* to something else on the page (a summary, a total, a status)? → `PillStat`. Is it a *statement* on its own, a piece of dashboard data? → `MetricBlock`.

**From the reference screen:**
- KPI strip (`$600,00` with `2 overdue invoices` below) → **MetricBlock** × 5
- Totals row (`Sub Total $80.00`, `Balance Due $80.00`) → **PillStat** × 3

---

### C) MetricBlock vs KeyValueRow

Both pair a label with a value. The distinction is about *hierarchy* and *rhythm*.

| Question | MetricBlock | KeyValueRow |
|---|---|---|
| Which side is dominant? | Value dominates; label supports | Both are quiet; value has a bit more contrast, not more weight |
| Layout? | Stacked (value above label) | Inline (label left, value right) |
| Is the value a "headline"? | Yes — it's something to notice | No — it's metadata, supporting info |
| Typical size of value text? | 18–32px depending on size tier | 12px (same as label) |
| When would someone read it? | At a glance, first | While scanning details, second |

**The test:** is the value something a user would notice walking past the screen (a KPI, a balance)? → `MetricBlock`. Or is it something they'd only read if they were specifically looking for details (a date, a reference number, a status)? → `KeyValueRow`.

**From the reference screen:**
- `Customers & leads` KPI metrics → **MetricBlock**
- Invoice detail metadata (`Invoice Date: 09/08/2018`, `Terms: Net 15`) → **KeyValueRow**

---

## Quick reference — primitive purposes at a glance

| Primitive | Interactive? | Shape | Purpose | Usually contains |
|---|---|---|---|---|
| `CircularIconButton` | ✅ | Circle | Icon-only action | 1 icon |
| `PillButton` | ✅ | Pill | Text-labeled action | Label + optional icons |
| `AvatarCircle` | ❌ | Circle | Identity representation | Photo or initial |
| `GlassPanel` | ❌ | Rounded rect | Content surface | Other components |
| `MetricBlock` | ❌ | — (containerless) | Headline stat | Value (big) + label (muted) |
| `KeyValueRow` | ❌ | — (containerless) | Inline metadata | Label (quiet) + value (clearer) |
| `SegmentedBar` | ❌ | Pill | Proportional composition | Colored segments |
| `PillStat` | ❌ | Pill | Summary / emphasis value | Label + value |

---

## When none of them fit

If you've gone through the tree and no primitive matches, that's useful information — it means one of three things:

1. **You're reaching for a compound, not a primitive.** Compounds combine multiple primitives in observed patterns. Check the compounds catalog before inventing something new.
2. **The reference screen doesn't actually include this pattern.** Before building a new primitive, ask whether the need is real or speculative. The kit's strength is in what it *doesn't* include.
3. **You have a genuine new pattern.** In that case, propose it as a new primitive, follow the template (purpose, anatomy, variants, states, tokens, do/don't, code), and document what's *intentionally not part of it* — same discipline as the existing eight.

---

## Anti-patterns — things that look reasonable but aren't

### Using `PillButton.ghost` for something that isn't nav

`ghost` is deliberately limited to inactive nav tabs. Using it elsewhere starts a slow drift toward "ghost is the quiet button variant" — which erodes the meaningful distinction between the three pill variants.

### Using `MetricBlock` inside a pill shape

If you find yourself writing `<div className="rounded-full px-5 py-2"><MetricBlock ... /></div>`, you're recreating `PillStat`. Use `PillStat`.

### Using `KeyValueRow` for totals

Totals need visual weight. `KeyValueRow` is deliberately quiet. If a total is the most important number on the page, it belongs in `PillStat` (`accent` if it's *the* number; `light` otherwise).

### Using `CircularIconButton` where an `AvatarCircle` belongs

They share silhouette and size tiers. The test: does it trigger an action, or does it represent a person/entity? The former is always a button; the latter is always an avatar — even if you can click the avatar (in which case you'd wrap it in a future `AvatarButton` compound, not replace it with an icon button).

### Using `accent` anywhere except `PillStat`

The lime color appears once on the reference screen: `Balance Due`. The system reserves accent for "highest emphasis, at most once per page." `PillStat.accent` is the only primitive that carries it. If you're tempted to add an `accent` variant to any other component, that's a signal to pause and reconsider — the scarcity is the point.

---

## Maintaining this document

When a new primitive is added to the catalog:

1. Add it to the master decision tree under the right branch
2. Add it to the quick-reference table
3. If it overlaps with an existing primitive, add a disambiguation section like A/B/C above
4. If it creates a new anti-pattern, add an entry to the anti-patterns section

Keep it scannable. If this document grows past one screen of reading, split it.




