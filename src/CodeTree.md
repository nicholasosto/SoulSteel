# Project Code Tree

This document lists all files under the **src** directory along with a brief description of their purpose.

## src
- **shared**
  - **Utility**
    - **Logger.ts**  
      // A logging utility that provides standardized logging methods.
  - **Storage**
    - **StorageManager.ts**  
      // Manages cloning and registration of assets from ReplicatedStorage.
    - **Packages.ts**  
      // Defines shared packages (folders) used throughout the project.
    - **DefinitionsManager.ts**  
      // Provides definitions for skills and items by reading shared maps.
  - **Skills**
    - **WCSStatus**
      - **Stund.ts**  
        // Implements a stun status effect using the WCS framework.
    - **WCSSkills**
      - **HallowHold.ts**  
        // Implements the HallowHold skill with tween and effect logic.
      - **BasicRanged.ts**  
        // Implements a basic ranged attack skill.
      - **BasicMelee.ts**  
        // Implements a basic melee attack skill with hitbox logic.
    - **SkillParts**
      - **Projectiles.ts**  
        // Contains prototype/projectile models used by skills.
  - **net**
    - **Remotes.ts**  
      // Defines remote events and functions for client–server communication.
  - **Epic UI**
    - **Classes**
      - **SkillButton.ts**  
        // (Commented out) A UI class for displaying a skill button.
      - **InfoFrame.ts**  
        // Handles updating character info such as level and profile picture.
    - **AssignSlotButton**
      - **AssignSlotButton.ts**  
        // Implements a button UI component for skill/slot assignment.
  - **Animation**
    - **Enums.ts**  
      // Contains animation asset IDs as enums.
    - **AnimationIndex.ts**  
      // Bundles animation types and helper functions into a single index.
  - **_Unused**
    - **Particles.ts**  
      // (Unused) Functions and enums related to particle effects.
    - **Inventory.ts**  
      // (Unused) Sample inventory item definitions.
    - **Attachments.ts**  
      // (Unused) Attachment names and helpers.
  - **_Types**
    - **TSkillResource.ts**  
      // Defines the type used to represent skill resource costs.
    - **TBillboardGUI.ts**  
      // Defines the composite type for a BillboardGui health bar.
  - **_Registry**
    - **EntityRegistration.ts**  
      // Registers and retrieves game character instances (players and NPCs).
  - **_Interfaces**
    - **ISkillDefinition.d.ts**  
      // Interface that defines the shape of a skill definition.
    - **IPlayerCharacter.d.ts**  
      // Describes properties and methods expected on a player character.
    - **ICharacterResource.d.ts**  
      // Defines the contract for a character’s resource (health, mana, etc.).
    - **Character Managers**
      - **IResourceManager.d.ts**  
        // Interface for a resource manager that handles health, mana, stamina.
  - **_Functions**
    - **TweenFunctions.ts**  
      // Provides functions for tweening (scaling, rotating, shooting, etc.).
    - **SkillFunctions.ts**  
      // Functions to create skills from IDs and to return default player skill data.
    - **AnimationFunctions.ts**  
      // Functions to create animations and animation tracks for a character.
  - **_Factories**
    - **Model Factory**
      - **Classes**
        - **ReferenceBlockClass.ts**  
          // Implements a reference block for visual effects such as spinning or replication.
    - **Humanoid Factory**
      - **HumanoidFactory.ts**  
        // Handles loading and applying humanoid descriptions to characters.
  - **_Enums**
    - **EImageId.ts**  
      // Contains image identifiers for UI icons and asset placeholders.
  - **_Definitions**
    - **SkillDefinitions.ts**  
      // Maps skill IDs to their definitions (name, description, cooldown, etc.).
    - **SkillConstants.ts**  
      // Constants used within skill definitions (default resources, etc.).

- **server**
  - **main.server.ts**  
    // Main bootstrap server file that starts controllers and collections.
  - **Controllers**
    - **PlayerCharacterController.ts**  
      // Creates and manages player character instances.
    - **SkillController.ts**  
      // Handles skill assignment, validation and bar updates.
    - **TargetingController.ts**  
      // Listens for and processes target selection events.
    - **TeleportController.ts**  
      // Controls teleportation functionalities.
    - **PlayerDataController.ts**  
      // Serves player data via remotes and triggers UI updates.
  - **Collections**
    - **NPCCollector.ts**  
      // Collects tagged NPCs and registers them into the game.
    - **LavaCollector.ts**  
      // (Assumed) Collects and manages lava/game hazards.
    - **ResourceDrain.ts**  
      // Applies resource drain effects when characters touch designated parts.
    - **ZoneCollector.ts**  
      // Implements zone detection for when players enter/exit areas.
    - **QuestBlock.ts**  
      // Registers and manages quest-related blocks in the world.
  - **Character**
    - **PlayerCharacter.ts**  
      // Implements server-side logic for player characters.
    - **NPCCharacter.ts**  
      // Implements NPC character features and event handling.
    - **Managers**
      - **SkillsManager.ts**  
        // Manages skills (equipping, unequipping, cooldowns) for a character.
      - **ResourceManager.ts**  
        // Manages health, mana, stamina and resource regeneration.
      - **AnimationManager.ts**  
        // Oversees animation playback and interruption on characters.
    - **Index**
      - **Interfaces.d.ts**  
        // Contains interfaces used by server-side character classes.
      - **CharacterIndex.d.ts**  
        // Aggregates character-related types and IDs.
    - **Classes**
      - **CharacterResource.ts**  
        // Class for managing a character’s resource pool.
    - **GameCharacter.ts**  
      // Base class for all game characters containing common methods.
    
- **client**
  - **main.client.ts**  
    // Client bootstrap file that initializes controllers, UI and WCS.
  - **Controllers**
    - **Input**
      - **KeyboardController.ts**  
        // Handles keyboard inputs for character control.
      - **MovementController.ts**  
        // Processes movement input and sends impulses.
      - **ClientTargetController.ts**  
        // Enables target selection via mouse/touch and sends to server.
    - **UI**
      - **StartScreenController.ts**  
        // Manages the start screen (character list and selection).
      - **MainMenuController.ts**  
        // (Assumed) Handles the main menu UI interactions.
      - **SkillBarController.ts**  
        // Updates and manages the skill bar display.
      - **CharacterFrameController.ts**  
        // Refreshes character info (level, name, resource bars) on the UI.
      - **TeleportPanelController.ts**  
        // Manages the teleport panel UI and button actions.
  - **GUI_ComponentClasses**
    - **Frames**
      - **SkillBarComponent.ts**  
        // Represents the skill bar layout and instantiates skill buttons.
      - **CharacterSlotComponent.ts**  
        // Represents an individual character slot in the UI list.
    - **Buttons**
      - **SkillButtonComponent.ts**  
        // Displays a button for each skill with cooldown and icon.
    - **Panels**
      - **SkillPanel.ts**  
        // (Assumed) Panel displaying additional skill details.
  - **_WCS**
    - **WCSClient.ts**  
      // Initializes the WCS client and registers directories for skills.
  - **Collectors**
    - **PulseTween.ts**  
      // Collects tweening functions used for pulsing UI effects.
  - **_Helpers**
    - **GUI_Index.ts**  
      // Aggregates references to UI components (HUD, buttons, frames).

- **replicatedFirst**
  - **AssetPreloader.client.ts**  
    // Preloads assets (e.g. environments) before the client loads fully.

- **shared**
  - **_AI**
    - **Code Review and Design Document Links.md**  
      // Markdown document with links to design documents and review notes.
