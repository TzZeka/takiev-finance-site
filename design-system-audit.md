# Design System Audit — Takiev Finance

**Date:** 2026-03-18
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · shadcn/ui · Radix UI · Framer Motion · CVA

---

## Summary

**Components reviewed:** 23 | **Issues found:** 14 | **Score: 54 / 100**

The project has a solid foundation — a coherent color palette in `tailwind.config.ts`, shadcn/ui primitives for forms, and several well-crafted bespoke components (PremiumCTA, TextPressure, ArcHeading). The main gap is the gulf between the tokens defined in config and how components actually use them: hardcoded hex values are widespread, the `secondary` color token is referenced but never defined, two parallel contact forms exist with conflicting validation rules, and no motion or surface tokens exist at all. Fixing token discipline and consolidating duplicated logic would have the highest impact.

---

## Naming Consistency

| Issue | Components affected | Recommendation |
|-------|---------------------|----------------|
| Two separate CTA systems | `ui/button.tsx` (CVA variants) + `ui/PremiumCTA.tsx` (custom) | Absorb `PremiumCTA` as a `variant="premium"` on Button, or document when each should be used |
| Duplicate contact forms with diverging validation | `shared/ContactForm.tsx` (name ≥ 2 chars) + `shared/ContactModal.tsx` (name ≥ 5 chars) | Extract a single `contactFormSchema` to `lib/validations.ts` and share it |
| `ArcHeading` has no plain `Heading` counterpart | `ui/ArcHeading.tsx` | Either rename to `ArcSectionHeading` to signal its special purpose, or add a base `Heading` component |
| `SectionBadge` and `Breadcrumbs` live in different folders despite being equally "shared" | One in `ui/`, one in `shared/` | Move `Breadcrumbs` to `shared/` or establish a clear rule: `ui/` = token-based primitives, `shared/` = composed patterns |
| Raw `<button>` used in `ContactForm` submit | `shared/ContactForm.tsx` | Replace with `<Button>` from `ui/button.tsx` for consistency |

**Score: 6 / 10**

---

## Token Coverage

### Colors

| Token | Defined in config | Hardcoded instances found |
|-------|:-----------------:|:-------------------------:|
| Primary `#19BFB7` | ✅ `primary.DEFAULT` | **19+** — in PartnersCarousel, Footer, PremiumLoader, CompanyPresentation, HeroSection, VideoPageClient, FluidBackground inline styles |
| Background/dark `#40514E` | ✅ `background` | **10+** — in TestimonialsSection, HeroSection, CompanyPresentation, ServicesPreview |
| Dark surface `#1b2b28` | ❌ not defined | **7** — in BlogListClient, BlogCard, BlogSearch, BlogHeroBanner |
| Dark surface `#2d4a44` / `#1a3530` | ❌ not defined | **10** — in QuickPanel |
| Dark surface `#060e0c` / `#06100e` / `#06121c` | ❌ not defined | **9** — in VideoPageClient, Footer, BlogHeroBanner |
| Teal accent `#1effff` | ❌ not defined | **6** — PremiumLoader only |
| Teal dark `#147d6c` | ❌ not defined | **3** — PremiumLoader only |
| Neutral `#607975` / `#4B6360` | ❌ not defined | **4** — NewsCard |
| Light `#e2e8f0` | ❌ not defined | **2** — CompanyPresentation |
| `secondary` | ❌ **missing entirely** | Button has `variant="secondary"` referencing `bg-secondary` which resolves to nothing |

**Recommended additions to `tailwind.config.ts`:**

```ts
colors: {
  // ... existing tokens ...
  secondary: {
    DEFAULT: "#2d4a44",
    foreground: "#FFFFFF",
  },
  surface: {
    DEFAULT: "#1b2b28",   // dark blog/card backgrounds
    deep: "#060e0c",      // deepest backgrounds (video, footer)
    raised: "#2d4a44",    // raised panels (QuickPanel, overlays)
  },
  "teal-bright": "#1effff",   // loader accent only
  "teal-dark": "#147d6c",     // loader gradient dark stop
}
```

### Spacing

No custom spacing scale defined. Components use arbitrary Tailwind values (`px-8`, `py-4`, `gap-3`, etc.) directly — acceptable for now since Tailwind defaults are sensible, but there's no documented component spacing standard.

### Typography

Three font families are in use: `Hubot Sans` (body + wide headings), `Berkslund` (loader brand name), `Avenir` (loader tagline). Only `Hubot Sans` is in the Tailwind `fontFamily` config. `Berkslund` and `Avenir` are used via inline `fontFamily` strings in `PremiumLoader` — these should become CSS custom properties (or Tailwind tokens) to be reusable:

```css
/* globals.css */
:root {
  --font-berkslund: 'Berkslund', serif;
  --font-avenir: 'Avenir', sans-serif;
}
```

### Motion / Animation

No animation tokens exist. Duration values are scattered as literals throughout components (`duration: 0.4`, `transitionDuration: "300ms"`, `stiffness: 400`, etc.). A token layer would prevent drift:

```ts
// tailwind.config.ts — extend.transitionDuration
transitionDuration: {
  fast: "150ms",
  base: "300ms",
  slow: "450ms",
  slower: "600ms",
}
```

**Score: 4 / 10**

---

## Component Completeness

| Component | Variants | States | Sizes | A11y | Docs | Score |
|-----------|:--------:|:------:|:-----:|:----:|:----:|:-----:|
| Button (`ui/button.tsx`) | ✅ 6 | ⚠️ no loading | ✅ 4 | ✅ | ❌ | 7 / 10 |
| Input (`ui/input.tsx`) | ❌ 1 | ⚠️ no error/success visual | ❌ 1 | ✅ | ❌ | 4 / 10 |
| Textarea (`ui/textarea.tsx`) | ❌ 1 | ⚠️ no error/success visual | ❌ 1 | ✅ | ❌ | 4 / 10 |
| Select (`ui/select.tsx`) | ✅ | ✅ disabled | ✅ | ✅ (Radix) | ❌ | 7 / 10 |
| Card (`ui/card.tsx`) | ❌ 1 | — | — | ✅ | ❌ | 5 / 10 |
| Form (`ui/form.tsx`) | ✅ | ✅ error messages | — | ✅ aria-invalid | ❌ | 8 / 10 |
| PremiumCTA (`ui/PremiumCTA.tsx`) | ✅ 2 | ⚠️ no loading state | ❌ 1 | ⚠️ (see below) | ❌ | 6 / 10 |
| ArcHeading (`ui/ArcHeading.tsx`) | ❌ 1 | — | — | ⚠️ (see below) | ❌ | 4 / 10 |
| TextPressure (`ui/TextPressure.tsx`) | ❌ 1 | — | — | ✅ | ❌ | 6 / 10 |
| FluidBackground (`ui/FluidBackground.tsx`) | ❌ 1 | — | — | ✅ aria-hidden | ❌ | 6 / 10 |
| Breadcrumbs (`ui/Breadcrumbs.tsx`) | ❌ 1 | — | — | ✅ aria-label | ❌ | 7 / 10 |
| SectionBadge (`shared/SectionBadge.tsx`) | ❌ 1 | — | — | ✅ | ❌ | 5 / 10 |
| ContactForm (`shared/ContactForm.tsx`) | — | ✅ loading/success/error | — | ⚠️ raw `<button>` | ❌ | 6 / 10 |
| ContactModal (`shared/ContactModal.tsx`) | — | ✅ | — | ✅ | ❌ | 7 / 10 |
| PremiumLoader (`shared/PremiumLoader.tsx`) | — | ✅ | — | ✅ | ❌ | 6 / 10 |

**Score: 6 / 10**

---

## Accessibility

| Issue | Severity | Location |
|-------|----------|----------|
| `role="heading"` on `<svg>` has incomplete AT support — screen readers may not announce it as a heading | High | `ui/ArcHeading.tsx` |
| `PremiumCTA` renders as `<motion.a>` when `href` is provided but has no `aria-label` prop — icon-only usage would be inaccessible | Medium | `ui/PremiumCTA.tsx` |
| Submit button in `ContactForm` is a raw `<button>` instead of `<Button>` — misses the `focus-visible:ring` styles that `Button` provides | Medium | `shared/ContactForm.tsx` |
| `FluidBackground` orb divs lack `aria-hidden` (added at parent level; child divs are fine) | Low | `ui/FluidBackground.tsx` |

**Recommended fix for ArcHeading:**

```tsx
// Wrap in a visually-hidden real heading element for AT, keep SVG visual-only
<h2 className="sr-only">{mainText} {accentText}</h2>
<svg aria-hidden="true" role="presentation" ...>
  {/* visual arc text */}
</svg>
```

**Score: 6 / 10**

---

## Priority Actions

1. **Define the missing `secondary` color token.** `Button`'s `variant="secondary"` currently renders with no background — this is a silent visual bug affecting any page that uses it.

2. **Audit and replace hardcoded `#19BFB7` and `#40514E` with token classes.** These two values appear 30+ times. A global find-replace to `text-primary` / `bg-primary` / `bg-background` would dramatically improve maintainability. Start with `FluidBackground`, `PartnersCarousel`, and `Footer`.

3. **Add surface color tokens for blog and dark panel backgrounds.** At least three distinct dark shades (`#1b2b28`, `#2d4a44`, `#060e0c`) are used across 7+ components with no token backing. Defining `surface.DEFAULT`, `surface.raised`, and `surface.deep` in config would resolve ~26 hardcoded instances.

4. **Consolidate the two contact form schemas.** `ContactForm` and `ContactModal` validate the same fields with different rules. Extract a shared schema to `lib/validations.ts`. The forms can still have different layouts while sharing identical logic.

5. **Add a `loading` state to `Button`.** The project already uses `isSubmitting` patterns with `Loader2` in forms — but the Button component itself has no `isLoading` prop. Adding one would let form authors write `<Button isLoading={isSubmitting}>` and get consistent spinner + disabled UX for free.

6. **Fix `ArcHeading` ARIA.** Replace `role="heading" aria-level={2}` on the SVG with a hidden `<h2>` sibling so heading structure is reliably announced by screen readers.

7. **Document the component boundary between `Button` and `PremiumCTA`.** Both are interactive CTA elements. Without a clear rule, the codebase will accumulate more divergence. Decision: either merge `PremiumCTA` as a `variant="premium"` in CVA, or write a short comment in each file explaining when to choose it.
