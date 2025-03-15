# Development Environment

## Index

0. [Back to Main](../SoulSteelGameDesign.md)
1. [Development Tools and Context](#development-tools-and-context)
   - [IDEs and Tools](#ides-and-tools)
   - [Language and Application](#language-and-application)
   - [Relevant External Packages](#relevant-external-packages)
2. [Standards and Guidelines](#standards-and-guidelines)
3. [Design Pattern Overview](#design-pattern-overview)
4. [Commenting Best Practices](#commenting-best-practices)

## Development Tools and Context

### IDEs and Tools

- **VS Code:** Used for all scripting.
- **Roblox Studio:** Used for modeling game objects, creating user interfaces, and animations.
- **Blender:** Used for modeling game objects and creating assets for the game.

### Language and Application

- **Language:** `Typescript` (transpiled into Luau for Roblox)
- **Application Type:** `Roblox Game`

### Relevant External Packages

- **WCS (Weapon Combat System):** [WCS Documentation](https://wad4444.github.io/WCS/)
- **ROACT:** A React-like architecture for GUI development.

## Standards and Guidelines

- Follow [TypeScript best practices](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html).
- Adhere to Roblox-specific coding conventions as outlined in the Roblox-ts documentation.

## Design Pattern Overview

The chosen design pattern should address common challenges in game development, such as event handling, state management, and modular component interaction. Key aspects include:

- **Pattern Name:** For example, Observer, Singleton, or a custom pattern tailored for game entities.
- **Intent:** A brief description of why the pattern is used and the problems it solves.
- **Structure:** An outline of class/interface relationships, dependencies, and interactions.
- **Behavior:** An explanation of how the pattern manages events, data flow, and state changes.

## Commenting Best Practices

1. **Remote Functions and Calls:**  
   Include comments with `#C2S` (client-to-server) or `#S2C` (server-to-client) to clarify the direction of communication.

2. **Header Comments:**  
   Use the following format for header comments:

    ```ts
    /* ===== Name of Header ===== */
    ```

   Each header comment should include a brief description of its purpose.

3. **General Comments:**  
   All comments should provide a brief explanation of the code's purpose and functionality.
