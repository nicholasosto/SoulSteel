# Core Style Guide

## 1. Overall Look & Feel

**Theme:** A blend of heroic fantasy and modern minimalism.  
**Tone:** Bold, adventurous, and slightly mysterious—but clear and easy to read at a glance.  
**Influences:** Think of classic RPG menus (inventories, skill trees) meshed with a crisp, modern interface.

---

## 2. Color Palette

### Primary Colors

- **Primary Accent (Highlight):** `#FFD23F` (Golden Yellow)
  - Used for button highlights, key action indicators, and important symbols (like “Attack,” “Equip,” etc.).
- **Primary Base (Background):** `#141414` (Very Dark Gray/Black)
  - Base background color for frames, modals, or panels.

### Secondary Colors

- **Secondary Accent (Contrast):** `#50C2C9` (Teal/Cyan)
  - Used for secondary emphasis or highlighting complementary actions (e.g., “Cancel,” “Back,” “Info”).
- **Secondary Base (Panel):** `#1E1E1E` (Dark Gray)
  - For standard panels, containers, list backgrounds, and sub-sections.

### Supporting Neutrals

- **Text & Icon Default:** `#FFFFFF` (White)
- **Muted Text:** `#CFCFCF` (Light Gray)
- **Disabled/Inactive:** `#A0A0A0` (Medium Gray)
- **Borders/Dividers:** `#3A3A3A` (Dark Gray)

### Alert & Status Colors

- **Success/Positive:** `#37D67A` (Green)
- **Warning/Caution:** `#FFBB00` (Bright Amber)
- **Error/Negative:** `#E53935` (Red)

**Usage Guidelines:**

- **Primary Accent** should be used sparingly so it retains its visual “pop.”  
- **Secondary Accent** can be used slightly more often, especially for interactive or related UI elements.  
- **Ensure** that text elements have sufficient contrast with background hues for accessibility.

---

## 3. Typography

Roblox’s default font choices can be limited, but you can simulate a cohesive look and feel with carefully selected fonts. For an Action RPG, readability and clarity are key.

### Font Families

- **Headers / Titles:** `GothamBold` or `SourceSansBold` (as the bold variant)
- **Body / Paragraph:** `Gotham` or `SourceSans`
- **Small UI Labels:** `GothamSemibold` or `SourceSansSemibold`

### Font Hierarchy & Sizing

- **Title (Screen Titles or Large Section Headers):** 32–36 px  
- **Subtitle (Secondary Headers):** 24–28 px  
- **Body (General Text):** 16–18 px  
- **Captions / Small Labels:** 12–14 px

**Usage Guidelines:**

- Keep text left-aligned or center-aligned for panel headings.  
- When layering text over backgrounds, use the primary or secondary base color for the background, and ensure the text is either White or near-white for clarity.

---

## 4. Layout & Spacing

### Containers & Panels

- **Padding:** 16 px inside each panel to separate text from edges.  
- **Gap Between UI Elements:** 8–12 px.  
- **Panel Corners:** Slightly rounded (4–6 px radius), creating a subtle modern feel.

### Alignment

- Keep key content (like player stats, inventory grids, skill buttons) aligned in a grid-like structure.  
- Use uniform spacing across multiple panels to create a consistent layout.  

### Responsiveness

- Ensure panels scale proportionally for both smaller and larger screens in Roblox.  
- Let text and icons resize gracefully (e.g., shrink text from 18 px to 14 px on smaller devices).

---

## 5. Iconography & Imagery

**Style:** Flat or slightly stylized outlines, minimal shading, consistent line weights.  

- **Key Identifiers:**  
  - Swords, shields, potion bottles, etc. for quick recognition of common RPG elements.  
  - Icons for interactions (magnifying glass for “Search,” crosshair for “Attack,” anvil for “Craft,” etc.).  

- **Color Consistency:**  
  - Icons use monochromatic white silhouettes on dark backgrounds; highlight them with the **Primary Accent** color if needed.  

- **Size & Padding:**  
  - Large icons (inventory items, skill icons): 64 × 64 px.  
  - Small icons (buttons, labels): 24 × 24 px or 32 × 32 px.  
  - Keep at least 4 px of padding around each icon inside a button or frame.

---

## 6. Buttons & Interactive Elements

### Button Types

1. **Primary Button**  
   - **Background:** Primary Accent (`#FFD23F`)  
   - **Text:** Dark Gray or Black  
   - **Border/Shadow:** Use a slightly darker gold or subtle shadow for depth.  
   - **Usage:** Main action (e.g., “Equip,” “Confirm,” “Accept Quest”).

2. **Secondary Button**  
   - **Background:** Secondary Accent (`#50C2C9`)  
   - **Text:** White  
   - **Border/Shadow:** Subtle shadow or 1 px border in a deeper teal.  
   - **Usage:** Secondary action (e.g., “Cancel,” “Info,” “Back”).

3. **Tertiary Button (Minimal)**  
   - **Background:** Transparent or Panel Color  
   - **Text:** White or Light Gray  
   - **Border:** Possibly none, or a single dark border if needed.  
   - **Usage:** Less critical interactions or textual “link-style” buttons.

### Hover & Pressed States (Mouse & Touch Feedback)

- **Hover (PC Mouse):** Slightly brighten the background color or add a subtle glow.  
- **Pressed:** Darken the background color or apply an inset shadow to give a “pressed” look.

---

## 7. Interactivity & Feedback

- **Hover Tips / Tooltips:** Semi-transparent dark overlay (`#1E1E1E` with 80% opacity), white text, 8 px padding, 4 px corner radius.  
- **Loading Indicators:** Simple circular spinner or horizontal bar in the **Secondary Accent** color.  
- **Progress Bars / Health Bars:** Use a high-contrast color for the fill (e.g., **Success Green** for health, **Secondary Accent** for mana), placed over a dark background bar.

---

## 8. Microinteractions & Animations

- **Panel Transitions:** Quick fade in/out or slide from the top/bottom in ~0.2–0.3s.  
- **Button Click Animations:** Subtle scale-up or scale-down over ~0.1s.  
- **Inventory Drag & Drop:** Item ghost image shrinks slightly (~90% size) as you drag, with a slight glow.

---

## 9. Sound Cues (Optional but Recommended)

Even though this is a styleguide focusing on visuals, pairing short “click” or “chime” effects with button presses or inventory actions helps unify the experience.

- **Button Click:** Soft metallic “click” or short sword “clink”  
- **Inventory Add:** Gentle “whoosh” or “pouch coin jingle”  

---

## 10. Implementation Notes for Fusion Components

1. **Props & Style Separation:**  
   - Keep styling (colors, sizes, typography) in a central module or set of constants, so you can reuse them across multiple Fusion components.

2. **Utility Functions & Modules:**  
   - Create a utility file that returns commonly used styles (e.g., `getButtonStyle(type)`) to reduce duplication.

3. **Responsive Sizing:**  
   - When building components, ensure that all size values (width/height, padding, corner radius) are adjustable or scale with screen size as needed.

4. **State Management:**  
   - Make sure each component can handle different states (hovered, pressed, disabled). For instance, you might pass a “State” prop into a Button component that automatically toggles the style.

---

### Example of Centralized Style Module (Pseudocode)

```lua
local Styles = {
    Colors = {
        PrimaryBase = Color3.fromHex("#141414"),
        PrimaryAccent = Color3.fromHex("#FFD23F"),
        SecondaryAccent = Color3.fromHex("#50C2C9"),
        Error = Color3.fromHex("#E53935"),
        ...
    },
    Fonts = {
        Title = Enum.Font.GothamBold,
        Body = Enum.Font.Gotham,
        ...
    },
    TextSizes = {
        Title = 32,
        Body = 18,
        Caption = 14,
        ...
    },
    Spacing = {
        Padding = 16,
        Margin = 8,
        ...
    },
    -- Potentially add standard corner radius, shadow styling, etc.
}

return Styles
```
