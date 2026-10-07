# DESIGN.md

This document outlines the core design language and aesthetic principles used in the portfolio project.

## Theme Overview
The portfolio utilizes a **Neobrutalism** (or Neo-brutalist) design style. This aesthetic is characterized by raw, bold, high-contrast, and unapologetic UI elements that prioritize clarity and structure over subtle visual polish.

## Core Properties

### 1. Colors
- **Background**: `#fafafa` (Off-white, providing high contrast for dark borders).
- **Text**: `#111111` (Near black, used universally for text to maintain strict high contrast).
- **Accents**: Primary bright colors are used for accents (e.g., `bg-yellow-300`, `bg-red-400`), typically surrounded by a harsh black border.

### 2. Typography
- **Primary Font**: `Space Grotesk`, sans-serif (Used for Headings, Body Text, and most UI elements). Heavily relies on uppercase `font-bold` or `font-black` and wide letter spacing (`tracking-widest`).
- **Secondary/Monospace Font**: `Space Mono`, monospace (Used for tags, emails, placeholder text, or technical information).

### 3. Borders & Shadows (The Signature Look)
Unlike modern "glassmorphism" or soft flat designs, this project uses solid, thick strokes and sharp shadows:
- **Borders**: All primary interactive and structural elements must have a thick solid black border: `border-2 border-black`.
- **Shadows**: Drop shadows are solid colors (typically `#000`) with no blur radius. 
  - *Standard Shadow*: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
  - *Hover/Active Shadow*: `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`

### 4. Background Patterns
- **Grid Background**: A subtle dotted grid `bg-grid` is applied to main wrapper components to give a blueprint/technical feel.

### 5. Utility Classes defined in `src/index.css`
When building new components, leverage these predefined Tailwind `@layer utilities`:
- `.brutal-card`: Standard box element with border and shadow.
- `.brutal-card-hover`: Adds a hover translation and deeper shadow interaction.
- `.brutal-btn`: The main button style, featuring an inverted (black) background with white text, uppercase styling, and brutalist shadows.
- `.brutal-tag`: Small pill/tag style using the mono font and high-contrast shadow.

## Component Principles
- **No Border Radius**: Keep elements completely square/sharp, avoiding `rounded-md` or `rounded-full` unless there is a very specific intentional exception.
- **Micro-interactions**: Use harsh transform translations (`hover:translate-x-[-2px] hover:translate-y-[-2px]`) rather than soft scaling or color-fading.
- **Spacing**: Generous padding and margins (`gap-8`, `p-8`) to prevent the heavy borders from feeling clustered.
