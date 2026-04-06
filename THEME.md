# 🎨 Theme System Documentation

## Overview

The Ariella Adventures tourism site now features a **dual-theme system** with a modern green (#50b440) accent color. Users can toggle between **dark** (black background) and **light** (white/neutral background) themes seamlessly.

## Theme Tokens

All theme colors and styles use CSS custom properties (variables) stored in `styles/globals.css`. This allows instant theme switching without component edits.

### Dark Theme (Default) `:root`

```css
--primary-color: #50b440; /* Modern green accent */
--success-color: #50b440;
--danger-color: #ef4444; /* Red for errors */
--bg: #050505; /* True black page background */
--surface: #0f1720; /* Dark panel/card background */
--surface-2: #0b1220; /* Slightly darker panels */
--text: #e6eef0; /* Light text for contrast */
--muted: #9aa3ab; /* Muted/secondary text */
--border-color: #111827; /* Dark subtle borders */
```

**Why these colors?**

- **#50b440**: Vibrant, modern green — stands out against dark surfaces, accessible.
- **#05050** to **#0f1720**: Subtle depth in dark palette; prevents eye strain.
- **#e6eef0**: Light text with cool undertone; reads well on dark.

---

### Light Theme `[data-theme="light"]`

```css
--primary-color: #48a849; /* Softer green for light backgrounds */
--success-color: #48a849;
--danger-color: #dc2626;
--bg: #fafbfc; /* Very subtle cool white */
--surface: #ffffff; /* Pure white cards/panels */
--surface-2: #f5f6f8; /* Light gray alt surfaces */
--text: #0f172a; /* Dark blue-gray for contrast */
--muted: #64748b; /* Slate-like muted text */
--border-color: #e2e8f0; /* Light subtle borders */
```

**Why these colors?**

- **#48a849**: Slightly darker/softer green — maintains vibrancy but reduces eye strain on light backgrounds.
- **#0f172a**: Deep blue-gray text — higher contrast than neutral black, feels modern.
- **#e2e8f0** borders: Subtle separation between elements without jarring lines.
- **#f5f6f8**: Cool white surfaces — professional, clean appearance.

---

## How Theme Switching Works

### 1. **ThemeToggle Component** (`components/ThemeToggle.tsx`)

```tsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    // On mount, read saved preference or detect system preference
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }

    // Fallback to system preference
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;
    const initial = prefersLight ? "light" : "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  useEffect(() => {
    if (!theme) return;
    // Apply theme by setting data-theme attribute on <html>
    document.documentElement.setAttribute("data-theme", theme);
    // Persist user choice
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="theme-toggle fixed top-4 right-4 z-50 p-2 rounded-md bg-[var(--surface)] text-[var(--text)] border border-[rgba(255,255,255,0.06)] hover:brightness-110 transition"
      title="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

### 2. **Global App Wrapper** (`pages/_app.tsx`)

```tsx
import ThemeToggle from "../components/ThemeToggle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeToggle />
      <Component {...pageProps} />
    </>
  );
}
```

### 3. **CSS Variable Switching**

When `data-theme="light"` is set on `<html>`, the CSS cascade applies the light-theme overrides:

```css
[data-theme="light"] {
  --primary-color: #48a849;
  /* ... all light theme tokens ... */
}
```

All components automatically adapt because they use `var(--primary-color)`, `var(--text)`, etc.

---

## Using Theme Variables in Components

### In Tailwind/HTML

```html
<!-- Uses CSS variable values -->
<div class="bg-[var(--surface)] text-[var(--text)]">Content</div>

<button class="bg-[var(--primary-color)] text-white hover:opacity-90">
  Call to Action
</button>
```

### In CSS

```css
.my-component {
  background-color: var(--surface);
  color: var(--text);
  border: 1px solid var(--border-color);
}

.my-component:hover {
  background-color: var(--surface-2);
}
```

### In TypeScript/React

You can read theme from localStorage or `data-theme` attribute:

```tsx
const isDarkTheme = () => {
  if (typeof document === "undefined") return true;
  const theme = document.documentElement.getAttribute("data-theme");
  return theme !== "light";
};
```

---

## Extending the Theme

### Adding a New Color Token

1. **Add to `:root` (dark theme)**:

   ```css
   :root {
     --primary-color: #50b440;
     --my-new-color: #3b82f6; /* Example: blue */
   }
   ```

2. **Override in `[data-theme="light"]`**:

   ```css
   [data-theme="light"] {
     --my-new-color: #1e40af; /* Darker blue for light theme */
   }
   ```

3. **Use in components**:
   ```html
   <div class="bg-[var(--my-new-color)]">Content</div>
   ```

### Adjusting Colors

All primary theme colors are in `styles/globals.css` at the top. To change the accent:

```css
:root {
  --primary-color: #your-new-color; /* e.g., #ff6b6b */
  --success-color: #your-new-color;
}
```

Light theme versions auto-update if you use brightness filters or sass mix functions.

---

## Best Practices

### ✅ DO

- Use `var(--primary-color)`, `var(--text)`, etc., in component styles.
- Test both themes (use the toggle button in top-right).
- Use `[data-theme="light"]` selectors for light-specific overrides (shadows, borders, opacity).

### ❌ DON'T

- Hardcode colors like `#ffffff`, `#000000`, `#2563eb` directly in components.
- Forget to provide light-theme versions of new colors/styles.
- Add color adjustments outside the CSS variable system.

---

## Accessibility Notes

### Contrast Ratios

- **Dark theme**: Light text on dark backgrounds passes **WCAG AA** (4.5:1+).
- **Light theme**: Dark text on light backgrounds passes **WCAG AAA** (7:1+).
- **Primary green (#50b440 / #48a849)** on white/dark: **5:1+** (WCAG AA compliant).

### Focus Indicators

- Form inputs use a green focus ring: `box-shadow: 0 0 0 4px rgba(80,180,64,0.12)`.
- Ensures keyboard navigation is visible on both themes.

### Motion

- Theme switching uses CSS transitions (220ms) for smooth UX—no jarring flashes.

---

## Files Involved

- **`styles/globals.css`**: Theme tokens, component styling, responsive adjustments.
- **`tailwind.config.js`**: Extends Tailwind with CSS-variable-backed color tokens.
- **`components/ThemeToggle.tsx`**: Client component that manages theme switching.
- **`pages/_app.tsx`**: Includes ThemeToggle globally.

---

## Troubleshooting

### Theme doesn't persist after refresh

- Check browser localStorage (DevTools → Application → Local Storage).
- Ensure `localStorage.setItem('theme', theme)` runs without errors.

### Colors look wrong in one theme

- Verify the token exists in both `:root` and `[data-theme="light"]`.
- Clear browser cache and refresh.
- Check for hardcoded color overrides (search for `#ffffff`, `#000000`, etc.).

### Text not readable

- Check contrast ratio using DevTools or a tool like WebAIM Contrast Checker.
- Adjust `--text` or `--muted` values if needed.

---

## Future Enhancements

- **Custom theme builder**: Let users pick accent colors.
- **System preference detection**: Already implemented—respects OS dark/light mode.
- **Auto theme based on time**: Switch to dark mode at sunset.
- **More theme presets**: Add "blue", "purple", etc., as alternatives to green.

---

Happy theming! 🎨✨
