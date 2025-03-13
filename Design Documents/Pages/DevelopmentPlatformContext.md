# Coding Environment

-Main document <[Back to Main](../SoulSteelGameDesign.md)>

## File Tree Structure

### Development Tools and Context

1. IDE(s)
    - ```VS Code```: used for all scripting
    - ```Roblox Studio```: used for modeling game objects and creating user interfaces and animations
    - ```Blender Studio```: used for modeling game objects (scripting and UI Tool)
2. Development Language: ```Typescript``` (transpiled into luau for roblox)
3. Application Type: ```Roblox Game```

### Relevant External Packages

1. WCS: weapon combat system (<https://wad4444.github.io/WCS/>)
2. ROACT: React like architecture for GUI

## Standards and Guidelines

- Follow [TypeScript best practices](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html).
- Adhere to Roblox-specific coding conventions as outlined in the Roblox-ts documentation.

## Design Pattern Overview

The chosen design pattern should address common challenges in game development, such as event handling, state management, and modular component interaction. The document outlines the following key aspects:

- **Pattern Name:** (e.g., Observer, Singleton, or a custom pattern tailored for game entities)
- **Intent:** A brief description of why the pattern is used and what problems it solves.
- **Structure:** Outline of the class/interface relationships, dependencies, and interactions.
- **Behavior:** Explanation of how the pattern manages events, data flow, and state changes.

## Commenting Best Practices

1. Remotefunctions and calls should have a comment containing #C2S or #S2C for client to server or server to client respectively
2. Comments for headers should be of the form:

    ```ts
    /* ===== Name of Header ===== */ 
    ```

3. Comments should include a breif description and purpose
