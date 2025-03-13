# Interface and TypesReference

-Main document <[Back to Main](../SoulSteelGameDesign.md)>

## Types

### ID Types

```ts
/* ===== Skills ===== */
type SkillId = "Basic_Melee" | "PowerShot1" | "Fireball_02" //ect used to get skill data 
type SkillSlotId = "Slot_01" | "Slot_02" | "Slot_03" //ect used to identify the correct placement in gui

/* ==== Equipment ===== */
type EquipmentId = string // used to get data on equipment
type EquipmentSlotId = "Helmet_01" | "Torso_01" //ect used to identify placement on character and GUI

/* ===== Other ===== */
type ResourceId = "_Health" | "_Soul Power" | "_Stamina" | "_DomainBlood" | "_Domain.." //ect used for identification and configuration of gui object
type DomainId = "BloodDomain" | "MechanisticAIDomain" | "Fateless" | "DecayDomain" | "AngelicDomain" // used for many game aspects both client and server side
```

### Map Types

```ts
type TSlotMap = SkillSlotMap<SkillSlotId, SkillId> | EquipmentSlotMap<EquipmentSlotId, EquipmentId> // ect
```

## Interfaces

### Player Level

- Tracks player level data

```ts
interface LevelData: {currentLevel: number, maxLevel: number, currentExperience: number, experienceToNextLevel: number}
```

### Class Data

- Tracks class progress data

```ts
interface ClassData: {currentLevel: number, maxLevel: number, availableTalentPoints: number, maxTalentPoints: number }
```

## Payload Interfaces

```ts
interface Payloads {
 /* Core Player Data */
 PlayerData: [playerData: IPlayerData];
 IdentityData: [identityData: IPlayerData["IdentityData"]];
 LevelData: [progressionStats: IPlayerData["LevelData"]];
 ClassData: [classData: IPlayerData["ClassData"]];
 CharacterStatData: [statData: IPlayerData["CharacterStatData"]];
 
 /* Map based Data */
 ActiveQuestMap: [activeQuestMap: TSlotMap];
 ConsumeableSlotMap: [consumableMap: TSlotMap];
 EquipmentSlotMap: [equipmenttMap: TSlotMap];
 MobilitySlotMap: [mobilitySlotMap: TSlotMap];
 SkillSlotMap: [skillMap: TSlotMap];
 ResourceDataMap: [resourceMap: Map<ResourceId, ResourceData>];


 /* Messaging Payloads */
 PlayerNotification: [success: boolean, title: string, message: string];
}
```

## Entity Interfaces

### GameCharacter

```ts
interface IGameCharacter {
    gameCharacterModel: TGameCharacter;
    characterState: TCharacterState;
    humanoid: Humanoid; 

    // Destroy - Cleans up instances
    OnDeath(): void
    GetPayload(payloadId): TPayload
}
```

### NPCCharacter

```ts
interface NPCCharacter extends IGameCharacter {
    gameCharacterModel: TGameCharacter;
    characterState: TCharacterState;
    humanoid: Humanoid; 

    // Destroy - Cleans up instances
    OnDeath(): void
    GetPayload(payloadId): TPayload
}
```

### PlayerCharacter

1. Description: Main game object through which the player interacts with the game.
2. Interface (see code)

    ```ts
    interface IPlayerCharacter extends IGameCharacter {
    // Player
    player: Player;
    playerState: TPlayerState;

    // Managers
    dataManager: IDataManager; // Handles saving, loading, updating, and cache management 
    animationManager: IAnimationManager; // Handles loading animations and is called as part of the Player Character functions like PerformDeathAct
    progressionManager: IProgressionManager; // Handles tracking and reporting of the level data, requirements and restrictions
    resourceManager: IResourceManager;// Handles the calculation of resources based on domain, class, and character stats
    skillManager: ISkillManager;// Handles the registering and reporting of assigned skills 
    equipmentManager: IEquipmentManager // Handles the registering and reporting of equipped armor
    inventoryManager: IInventoryManager // Handles the registering and reporting of unlocked equipment, skills, ect and reports UI Payload for client
    targetManager: ITargetManager; // Handles the registering and reporting of the targeted game character and UI Payload
    attributesManager: AttributesManager; // Handles the attibute point pool, validation and reporting UI Payload
    questManager: IQuestManager; // Handles the tracking of activequests and requirements and UI Payload reporting
    notificationManager: INotificationManager; // Master controller for sending Server to Client events originating from PlayerCharacter function calls
    mobilitySkillManager: IMobilityManager; // Handles loading mobility skills and Client Payload
    stateManager: IStateManager; // Handles state transitions

    // Destroy - Cleans up instances
    Destroy(): void;

    }
    ```