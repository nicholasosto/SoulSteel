# Interfaces and Types Reference

This document defines the core types, interfaces, and payload structures used in our system. It serves as a technical reference for understanding how data is structured and communicated within the application.

---

## Table of Contents

1. [Types](#types)
   - [ID Types](#id-types)
   - [Map Types](#map-types)
2. [Interfaces](#interfaces)
   - [Player Level Data](#player-level-data)
   - [Class Data](#class-data)
3. [Payload Interfaces](#payload-interfaces)
4. [Entity Interfaces](#entity-interfaces)
   - [Game Character](#game-character)
   - [NPC Character](#npc-character)
   - [Player Character](#player-character)

---

## Types

### ID Types

These types are used for identification and retrieval of game data.

```ts
/* ===== Skills ===== */
type SkillId = "Basic_Melee" | "PowerShot1" | "Fireball_02"; // etc., used to fetch skill data
type SkillSlotId = "Slot_01" | "Slot_02" | "Slot_03"; // etc., used to identify placement in the GUI

/* ===== Equipment ===== */
type EquipmentId = string; // used to fetch equipment data
type EquipmentSlotId = "Helmet_01" | "Torso_01"; // etc., used for character and GUI placement

/* ===== Other ===== */
type ResourceId = "_Health" | "_Soul Power" | "_Stamina" | "_DomainBlood" | "_Domain.."; // etc., for GUI object configuration
type DomainId = "BloodDomain" | "MechanisticAIDomain" | "Fateless" | "DecayDomain" | "AngelicDomain"; // used across client and server aspects
```

### Map Types

This union type represents various slot maps used in the system.

```ts
type TSlotMap = SkillSlotMap<SkillSlotId, SkillId> | EquipmentSlotMap<EquipmentSlotId, EquipmentId>; // etc.
```

---

## Interfaces

### Player Level Data

Tracks the player's progression with respect to levels and experience.

```ts
interface LevelData {
  currentLevel: number;
  maxLevel: number;
  currentExperience: number;
  experienceToNextLevel: number;
}
```

### Class Data

Represents the progress data related to a player’s class.

```ts
interface ClassData {
  currentLevel: number;
  maxLevel: number;
  availableTalentPoints: number;
  maxTalentPoints: number;
}
```

---

## Payload Interfaces

This section defines the structure of various payloads exchanged between client and server, including player data, map data, and notifications.

```ts
interface Payloads {
  /* Core Player Data */
  PlayerData: [playerData: IPlayerData];
  IdentityData: [identityData: IPlayerData["IdentityData"]];
  LevelData: [progressionStats: IPlayerData["LevelData"]];
  ClassData: [classData: IPlayerData["ClassData"]];
  CharacterStatData: [statData: IPlayerData["CharacterStatData"]];

  /* Map-based Data */
  ActiveQuestMap: [activeQuestMap: TSlotMap];
  ConsumableSlotMap: [consumableMap: TSlotMap];
  EquipmentSlotMap: [equipmentMap: TSlotMap];
  MobilitySlotMap: [mobilitySlotMap: TSlotMap];
  SkillSlotMap: [skillMap: TSlotMap];
  ResourceDataMap: [resourceMap: Map<ResourceId, ResourceData>];

  /* Messaging Payloads */
  PlayerNotification: [success: boolean, title: string, message: string];
}
```

*Note:* The types `IPlayerData`, `ResourceData`, and others referenced here should be defined elsewhere in your codebase.

---

## Entity Interfaces

These interfaces define the structure and behavior of the core game entities.

### Game Character

The base interface for any game character, encapsulating common properties and methods.

```ts
interface IGameCharacter {
  gameCharacterModel: TGameCharacter;
  characterState: TCharacterState;
  humanoid: Humanoid;

  // Clean up instances when the character dies
  OnDeath(): void;
  // Retrieve payload based on a given payload identifier
  GetPayload(payloadId: string): TPayload;
}
```

### NPC Character

Represents non-player characters. Inherits all properties and methods from `IGameCharacter`.

```ts
interface NPCCharacter extends IGameCharacter {
  // Additional NPC-specific properties and methods can be added here.
}
```

### Player Character

The primary interface for the player’s in-game avatar. This interface extends `IGameCharacter` and includes several manager components to handle various aspects of the player's state and interaction.

```ts
interface IPlayerCharacter extends IGameCharacter {
  // Player-specific properties
  player: Player;
  playerState: TPlayerState;

  // Managers: handle core gameplay mechanics and UI payload reporting
  dataManager: IDataManager;             // Manages saving, loading, updating, and caching data.
  animationManager: IAnimationManager;   // Loads and handles animations (e.g., death animations).
  progressionManager: IProgressionManager; // Tracks level progression and requirements.
  resourceManager: IResourceManager;     // Calculates resources based on domain, class, and character stats.
  skillManager: ISkillManager;           // Registers and manages assigned skills.
  equipmentManager: IEquipmentManager;   // Manages equipped armor and gear.
  inventoryManager: IInventoryManager;   // Tracks unlocked items and provides UI payload data.
  targetManager: ITargetManager;         // Manages targeted game characters and associated UI updates.
  attributesManager: AttributesManager;  // Handles attribute point allocation, validation, and UI reporting.
  questManager: IQuestManager;           // Tracks active quests and reports related UI payloads.
  notificationManager: INotificationManager; // Manages server-to-client notifications initiated by player actions.
  mobilitySkillManager: IMobilityManager; // Handles mobility skills and related UI payload.
  stateManager: IStateManager;           // Manages state transitions for the player.

  // Clean up all associated instances and resources
  Destroy(): void;
}
```

*Note:* The types such as `TGameCharacter`, `TCharacterState`, `Humanoid`, `TPlayerState`, and all manager interfaces (`IDataManager`, `IAnimationManager`, etc.) should be defined in their respective modules.
