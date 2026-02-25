---
title_id: 'CSS Grid vs Flexbox: When to Use Which'
title_en: 'CSS Grid vs Flexbox: When to Use Which'
slug: css-grid-vs-flexbox
date: '2026-02-20T08:15:00.000Z'
description_id: >-
  Grid and Flexbox are both powerful CSS layout tools, but they solve different
  problems. This guide helps you decide which one to use — with visual examples
  and real-world layout patterns.
description_en: >-
  Grid and Flexbox are both powerful CSS layout tools, but they solve different
  problems. This guide helps you decide which one to use — with visual examples
  and real-world layout patterns.
tags:
  - css
  - frontend
  - fundamentals
status: published
authorId: usr_0056bb11
---
<!-- lang:id -->
# CSS Grid vs Flexbox: When to Use Which

The most common question in modern CSS: *"Should I use Grid or Flexbox?"*

The short answer: **both**. They complement each other beautifully. But knowing which one to reach for — and when — will make your layouts cleaner and your code more maintainable.

## The Mental Model

Here's the simplest way to think about it:

- **Flexbox** = one-dimensional layout (row *or* column)
- **Grid** = two-dimensional layout (rows *and* columns)

If you're laying out items in a single line (nav links, button groups, card footers), use **Flexbox**. If you're designing a page layout or a structured grid of items, use **Grid**.

## Flexbox in Action

Flexbox excels at distributing space along a single axis:

```css
/* Center anything */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Navbar layout */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* Push last item to the right */
.nav-actions {
  margin-left: auto;
}
```

### When Flexbox Shines

- **Navigation bars** — items in a row with varied spacing
- **Card footers** — author on the left, date on the right
- **Button groups** — inline buttons with consistent gaps
- **Centering** — the most reliable way to center anything
- **Content that should wrap naturally** — tags, badges, chips

```css
/* Tag list that wraps */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

## Grid in Action

Grid lets you define both rows and columns simultaneously:

```css
/* Classic 3-column card grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Responsive without media queries! */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

### When Grid Shines

- **Page layouts** — header, sidebar, main, footer
- **Card grids** — articles, products, galleries
- **Form layouts** — labels and inputs in alignment
- **Dashboard layouts** — widgets of various sizes
- **Anything with alignment in both directions**

```css
/* Full page layout */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

## Side-by-Side Comparison

| Feature | Flexbox | Grid |
|---------|---------|------|
| Dimensions | 1D (row or column) | 2D (rows and columns) |
| Content-driven | ✅ Items size themselves | ❌ Layout defines sizes |
| Layout-driven | ❌ No explicit grid | ✅ Explicit tracks |
| Alignment | Single axis | Both axes |
| Item overlap | Not possible | Possible with placement |
| Best for | Components | Page structure |

## The Power Combo: Grid + Flexbox Together

In practice, you almost always use both. Grid for the overall layout, Flexbox for component internals:

```css
/* Grid for the page layout */
.articles-page {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Flexbox for each card's internal layout */
.article-card {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1; /* Pushes footer to bottom */
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
```

## Common Mistakes

### ❌ Using Grid for a simple row of items

```css
/* Overkill */
.buttons {
  display: grid;
  grid-template-columns: auto auto auto;
}

/* Just use Flexbox */
.buttons {
  display: flex;
  gap: 0.5rem;
}
```

### ❌ Using Flexbox for a 2D card grid

```css
/* Fragile with wrapping */
.cards {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: calc(33.333% - 1rem);
}

/* Grid handles this natively */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

## Decision Flowchart

1. **Is it a single row or column of items?** → Flexbox
2. **Do items need to align in both rows and columns?** → Grid
3. **Should the content dictate the layout?** → Flexbox
4. **Should the layout dictate the content placement?** → Grid
5. **Not sure?** → Start with Flexbox, switch to Grid if it gets complicated

## Key Takeaways

- Flexbox and Grid are **complementary**, not competing
- Use Flexbox for **components** (navbars, card internals, button groups)
- Use Grid for **layouts** (page structure, card grids, dashboards)
- Combine them: Grid for the outer structure, Flexbox for inner components
- When in doubt, start with Flexbox — you'll know when you need Grid

Master both, and you can build any layout without hacks. 🎨

<!-- lang:en -->
# CSS Grid vs Flexbox: When to Use Which

The most common question in modern CSS: *"Should I use Grid or Flexbox?"*

The short answer: **both**. They complement each other beautifully. But knowing which one to reach for — and when — will make your layouts cleaner and your code more maintainable.

## The Mental Model

Here's the simplest way to think about it:

- **Flexbox** = one-dimensional layout (row *or* column)
- **Grid** = two-dimensional layout (rows *and* columns)

If you're laying out items in a single line (nav links, button groups, card footers), use **Flexbox**. If you're designing a page layout or a structured grid of items, use **Grid**.

## Flexbox in Action

Flexbox excels at distributing space along a single axis:

```css
/* Center anything */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Navbar layout */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* Push last item to the right */
.nav-actions {
  margin-left: auto;
}
```

### When Flexbox Shines

- **Navigation bars** — items in a row with varied spacing
- **Card footers** — author on the left, date on the right
- **Button groups** — inline buttons with consistent gaps
- **Centering** — the most reliable way to center anything
- **Content that should wrap naturally** — tags, badges, chips

```css
/* Tag list that wraps */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

## Grid in Action

Grid lets you define both rows and columns simultaneously:

```css
/* Classic 3-column card grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* Responsive without media queries! */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

### When Grid Shines

- **Page layouts** — header, sidebar, main, footer
- **Card grids** — articles, products, galleries
- **Form layouts** — labels and inputs in alignment
- **Dashboard layouts** — widgets of various sizes
- **Anything with alignment in both directions**

```css
/* Full page layout */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

## Side-by-Side Comparison

| Feature | Flexbox | Grid |
|---------|---------|------|
| Dimensions | 1D (row or column) | 2D (rows and columns) |
| Content-driven | ✅ Items size themselves | ❌ Layout defines sizes |
| Layout-driven | ❌ No explicit grid | ✅ Explicit tracks |
| Alignment | Single axis | Both axes |
| Item overlap | Not possible | Possible with placement |
| Best for | Components | Page structure |

## The Power Combo: Grid + Flexbox Together

In practice, you almost always use both. Grid for the overall layout, Flexbox for component internals:

```css
/* Grid for the page layout */
.articles-page {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Flexbox for each card's internal layout */
.article-card {
  display: flex;
  flex-direction: column;
}

.card-content {
  flex: 1; /* Pushes footer to bottom */
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
```

## Common Mistakes

### ❌ Using Grid for a simple row of items

```css
/* Overkill */
.buttons {
  display: grid;
  grid-template-columns: auto auto auto;
}

/* Just use Flexbox */
.buttons {
  display: flex;
  gap: 0.5rem;
}
```

### ❌ Using Flexbox for a 2D card grid

```css
/* Fragile with wrapping */
.cards {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: calc(33.333% - 1rem);
}

/* Grid handles this natively */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

## Decision Flowchart

1. **Is it a single row or column of items?** → Flexbox
2. **Do items need to align in both rows and columns?** → Grid
3. **Should the content dictate the layout?** → Flexbox
4. **Should the layout dictate the content placement?** → Grid
5. **Not sure?** → Start with Flexbox, switch to Grid if it gets complicated

## Key Takeaways

- Flexbox and Grid are **complementary**, not competing
- Use Flexbox for **components** (navbars, card internals, button groups)
- Use Grid for **layouts** (page structure, card grids, dashboards)
- Combine them: Grid for the outer structure, Flexbox for inner components
- When in doubt, start with Flexbox — you'll know when you need Grid

Master both, and you can build any layout without hacks. 🎨
