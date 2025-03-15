# GUI System Design

This document provides a detailed overview of the graphical user interface (GUI) system for our game. It is intended to inform an LLM (or any reader) about the various panels, components, and design considerations of our GUI system.

## Table of Contents

1. [Overview](#overview)
2. [Panels](#panels)
   - [Skill Panel](#skill-panel)
   - [Class Panel](#class-panel)
   - [Inventory Panel](#inventory-panel)
   - [Teleport Panel](#teleport-panel)
   - [Shop Panel](#shop-panel)
3. [Component Details](#component-details)
   - [GameItem Frame](#gameitem-frame)
   - [Talent Node Button](#talent-node-button)
4. [Design Considerations](#design-considerations)
5. [References](#references)

---

## Overview

The GUI system is designed to provide interactive and intuitive interfaces for different gameplay aspects, including skill management, class customization, inventory control, teleportation, and shop interactions. Each panel is built with modularity and scalability in mind, allowing for easy updates and future expansion.

---

## Panels

### Skill Panel

The Skill Panel is dedicated to managing and displaying the player's skills. It is divided into two main sections:

1. **Unlocked Skill List**  
   - Displays a collection of GameItem frame objects that function as UI buttons.
   - Each button corresponds to an unlocked skill available to the player.

2. **Details Panel**  
   Provides detailed information and controls for the selected skill:
   - **Basic Info:**  
     - **Rarity:** Indicates the skill's rarity level.
     - **Description:** Provides a brief overview of the skill.
     - **Type:** Classifies the skill (e.g., passive, active).
   - **Skill Info:**  
     - **Cooldown:** Displays the skill's cooldown duration.
     - **Resource Costs:** Lists the resources required to use the skill (e.g., Health, Stamina, Soul Power).
   - **Upgrades Control:**  
     - **Requirement Control 1:** Manages the first upgrade requirement.
     - **Requirement Control 2:** Manages the second upgrade requirement.

---

### Class Panel

The Class Panel is used to display and manage class-related information and talent progression:

1. **Class Data**  
   - **Class Name:** The name of the class.
   - **Class Description:** A brief description of the class.
   - **Class Experience:** Displays the experience progress for the class.

2. **Class Talent Tree**  
   - **Talent Node Buttons:**  
     - Represented as a `Map<string, TalentNodeButton>`, where each button corresponds to a node in the talent tree.
   - **Talent Background Image:**  
     - A visual layout that shows the connections and paths between talent nodes.

---

### Inventory Panel

The Inventory Panel allows players to manage their in-game items. It is organized into distinct categories:

1. **Armor & Accessories**  
   - Displays wearable items that influence the player's stats and appearance.
2. **Consumables**  
   - Lists items that can be consumed to provide temporary benefits or restore resources.
3. **Familiars**  
   - Shows companion entities or pets that assist the player during gameplay.

---

### Teleport Panel

The Teleport Panel provides functionality for navigating the game world. Although details may vary, it generally includes:

- A list or map of available teleportation destinations.
- Controls for selecting a destination.
- Visual indicators or animations that signal the teleportation process.

---

### Shop Panel

The Shop Panel serves as the interface for in-game purchases. Key features include:

- **Item Display:**  
  - A catalog of items available for purchase.
- **Category Filters:**  
  - Tools to help players browse items by category.
- **Purchase Controls:**  
  - Interactive elements to initiate and confirm transactions.

---

## Component Details

### GameItem Frame

- **Definition:**  
  A UI element that acts as an interactive button for skills and other game items.
- **Functionality:**  
  Includes visual styling, hover effects, and click events to provide feedback and trigger actions.

---

### Talent Node Button

- **Definition:**  
  A clickable UI element within the talent tree.
- **Usage:**  
  Managed within a `Map<string, TalentNodeButton>` structure to track each node's state and interaction.
- **Visuals:**  
  Often accompanied by indicators that show activation status or available upgrades.

---

## Design Considerations

- **Modularity:**  
  Each panel is designed as a standalone component, making it easier to update or replace parts of the system without affecting others.
- **Scalability:**  
  The system can be extended with additional panels or functionalities as the game evolves.
- **User Experience:**  
  Emphasis is placed on intuitive navigation, clear visual cues, and responsive interactions to enhance overall gameplay.
- **Integration:**  
  The GUI system is tightly integrated with backend game logic, ensuring that user actions are reflected in real-time game state changes.

---

## References

- Main Document: [SoulSteel Game Design](../SoulSteelGameDesign.md)
- Additional design guidelines and coding conventions can be found in the related development documents.
