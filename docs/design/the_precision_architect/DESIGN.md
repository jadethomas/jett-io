```markdown
# Design System Specification

## 1. Overview & Creative North Star: "The Monolithic Blueprint"
This design system is a departure from the generic, soft-edged web. It is built on the principles of high-end architectural drafting: precision, structural integrity, and the intentional use of the "void." 

**The Creative North Star** is defined as **The Monolithic Blueprint**. The UI should feel like a physical structure carved out of midnight stone, illuminated by high-precision laser guides. We break the "template" look by rejecting symmetry in favor of balanced tension. Expect large-scale typography to act as structural pillars, while asymmetric grid placements create a sophisticated, editorial rhythm that guides the eye through technical density with ease.

---

## 2. Colors & Tonal Architecture
The palette is rooted in a deep midnight charcoal, utilizing the electric blue accent sparingly to denote "active" precision.

*   **Primary Accent (`primary_container` - #0055ff):** This is your laser. Use it for high-intent actions and critical data points. It should feel like a light source cutting through the dark.
*   **The "No-Line" Rule:** We do not use 1px solid borders to define sections. Period. Structure is created through background shifts. A section might move from `surface` (#131313) to `surface_container_low` (#1c1b1b) to signal a shift in content. The eye should perceive the change in depth, not a stroke.
*   **Surface Hierarchy & Nesting:** Treat the interface as layers of fine paper. 
    *   Base: `surface`
    *   Nested Content: `surface_container`
    *   Elevated Interactive Elements: `surface_container_highest`
*   **Signature Textures:** For primary CTAs, do not use flat fills. Apply a subtle linear gradient from `primary_container` (#0055ff) to `on_secondary` (#0e2976) at a 135-degree angle to provide a "machined" metallic finish.

---

## 3. Typography: The Swiss Grid
Typography is the core structural element of this system. We use a high-contrast scale to establish dominance and subordinance.

*   **Display & Headlines (Inter):** These are Swiss-style "Mega-type." For `display-lg` (3.5rem) and `headline-lg` (2rem), set letter-spacing to `-0.04em`. The kerning must feel tight and architectural. Headlines should often be placed asymmetrically—pushed to the far left or right of the grid to create "active" negative space.
*   **Body (Public Sans):** Used for legibility. Set `body-lg` at 1rem with a generous `line-height` (1.6) to provide breathing room against the heavy headlines.
*   **Labels (Space Grotesk):** These are our "technical annotations." Use `label-md` for metadata, captions, and micro-copy. These should feel like notes on a blueprint.

---

## 4. Elevation & Depth: Tonal Layering
Since our roundedness scale is strictly **0px (Sharp)**, we do not use "bubbles" or "pills." Everything is rectangular and monolithic.

*   **The Layering Principle:** To lift a card, place a `surface_container_high` (#2a2a2a) element on a `surface_container_low` (#1c1b1b) background. 
*   **Ambient Shadows:** Use only when a "floating" modal effect is required. Shadows must be massive and ethereal: `box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5)`. The shadow should feel like a natural occlusion of light, not a digital effect.
*   **The "Ghost Border":** If a separation is functionally required (e.g., input fields), use `outline_variant` at **15% opacity**. It should be barely visible—a "whisper" of a line.
*   **Glassmorphism:** For navigation overlays, use `surface_container` with a `backdrop-filter: blur(20px)`. This allows the "architectural" background colors to bleed through, softening the transition between layers.

---

## 5. Components

### Buttons
*   **Primary:** Sharp 0px corners. Fill: `primary_container`. Text: `on_primary_container`. Heavy weight. Use `spacing-6` for horizontal padding.
*   **Secondary:** Sharp 0px corners. No fill. "Ghost Border" using `outline_variant` at 20%.
*   **Interaction:** On hover, the background should shift to a `primary` (#b6c4ff) tint with a 0.2s ease-out.

### Inputs & Fields
*   **Styling:** Forgo the 4-sided box. Use a `surface_container_highest` background fill with a bottom-only "Ghost Border."
*   **Focus State:** The bottom border transforms into a solid `primary_container` (#0055ff) 2px line.

### Cards & Lists
*   **Rule:** No dividers. Use `spacing-10` or `spacing-12` (vertical white space) to separate list items. 
*   **Visual Separation:** Alternate background tones between `surface` and `surface_container_low` for large list blocks to create a "zebra" effect without lines.

### Precision Chips
*   **Styling:** Small, rectangular blocks using `label-sm` typography. Background: `surface_variant`. No rounding.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace the Grid:** Use the `spacing-24` and `spacing-20` tokens to create massive gaps between sections. White space is a luxury.
*   **Asymmetric Balance:** If a headline is on the left, place the supporting body copy in the center-right column. 
*   **High-Precision Kerning:** Manually adjust tracking on all headlines above 24px.

### Don't:
*   **No Rounded Corners:** Never use `border-radius`. Everything must remain 0px to maintain the architectural vibe.
*   **No Generic Shadows:** Avoid the "Standard Web" look of small, dark, offset shadows. 
*   **No Solid 1px Borders:** Do not use full-opacity outlines to contain content. Trust the tonal shifts of the `surface` tokens to do the work.
*   **No Centered "Blog" Layouts:** Avoid a single 800px centered column. Utilize the full width of the desktop grid with offset alignments.```