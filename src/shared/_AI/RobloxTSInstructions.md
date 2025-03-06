# GitHub Copilot Custom Instructions for Roblox TypeScript Projects

## General Guidelines

- **Code Clarity:** Use clear, consistent TypeScript syntax and maintain well-commented code.
- **Modular Design:** Favor modular, reusable code and adhere to the principle of separation of concerns.
- **Naming Conventions:** Use descriptive names for functions, variables, and classes that match our project's style.
- **Commenting Style:**
  - File Header:

  ```ts
  /*
  Filename: PlayerCharacterController.ts
  Location: src/server/Controllers
  Project: SoulSteel
  Author: TrembusTech
  Date: March 06 2025
  Instructions: This singleton should be started in the main server script.
  Description: Controller for managing player characters on the server.
               Handles creation, registration, removal, and cleanup of player characters.

  Custom Events / Remotes: None
  Other Events:
  - WcsCharacterDestroyed
  Revision History:
  - Initial implementation.
  */ 
  ```

  - Top Level:

  ```ts
  /*===========| NAME_OF_TITLE | ============*/
  ```

  - Sub Level:

  ```ts
  /* COMMENT */
  ```

## Game Logic & Architecture

- **Client/Server Separation:** Clearly separate client and server logic. Use RemoteEvents/RemoteFunctions for communication between them.
- **Framework Conventions:** When applicable, use our designated framework (e.g., Flamework or an ECS library) for structuring game systems.
- **Modular Systems:** Organize game systems (e.g., NPC behavior, state machines, event handling) into independent modules or classes.
- **Type Safety:** Leverage TypeScript types to enforce contracts and catch errors at compile time.

## UI Development

- **Preferred UI Framework:** Pleas review my client UI classes ensuring proper communication with server.  Use existing code where possible.
- **Component Naming:** Name UI components using PascalCase (e.g., `MainMenu`, `InventoryUI`).
- **Separation of Concerns:** Separate layout, styling, and logic in your UI code to enhance reusability and readability.
- **Responsive Design:** Structure UI code to be easily adaptable as the game evolves.

## Debugging and Logging

- **Custom Logging:** Always use our `Logger.Log` utility for debugging instead of using plain `print` statements. but use `warn` or `assert()` to inform of errors.
- **Error Handling:** Include proper error checking and assertions, especially around remote calls and asset loading.
- **Inline Documentation:** Add concise comments to explain complex logic or non-obvious code segments to ease future debugging.

## Performance and Optimization

- **Event-Driven Patterns:** Avoid busy-wait loops; utilize Roblox’s event systems (e.g., `RunService.Heartbeat`) for periodic tasks.
- **Resource Management:** Ensure proper cleanup of event connections and Instances to prevent memory leaks.
- **Optimize Critical Paths:** Keep frequently executed code lean and avoid unnecessary computations within game loops.
- **Object Reuse:** Implement object pooling strategies when creating and destroying objects frequently.

## Testing, Commit Messages, and Code Review

- **Testing Practices:** Write unit tests following our preferred framework and project guidelines.
- **Commit Message Standards:** Use clear, conventional commit messages that reflect the nature of changes (e.g., following the Conventional Commits standard).
- **Code Review Focus:** During reviews, check for adherence to architectural patterns, performance optimizations, and consistent naming conventions.

## Final Notes

- **New Features:** When adding new functionality, ensure that new modules follow the established patterns and guidelines.
- **Documentation:** Update this file as the project evolves to reflect any new best practices or architectural changes.
- **Team Collaboration:** These instructions serve as a shared guide—feel free to suggest improvements based on ongoing project needs.
