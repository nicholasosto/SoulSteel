# Fusion Component Examples

## Health Bar

```ts
import Fusion, { Children, Computed } from "@rbxts/fusion";
import { ResourceBars } from "shared/_ROACT/Components/DataValueObjects";

const { New } = Fusion;

const healthPercentage = Computed(() => {
 return ResourceBars.PlayerHealth.playerCurrentHealth.get() / ResourceBars.PlayerHealth.playerMaxHealth.get();
});

const HealthBarFill = New("Frame")({
 Size: Computed(() => new UDim2(healthPercentage.get(), 0, 1, 0)),
 BackgroundColor3: new Color3(0.91, 0.03, 0.03),
 BorderSizePixel: 0,
});

const HealthBarLabel = New("TextLabel")({
 Text: Computed(
  () =>
   `Health: ${ResourceBars.PlayerHealth.playerCurrentHealth.get()} / ${ResourceBars.PlayerHealth.playerCurrentHealth.get()}`,
 ),
 Size: new UDim2(1, 0, 1, 0),
 BackgroundTransparency: 1,
 TextColor3: new Color3(0.19, 0.04, 0.04),
 FontSize: Enum.FontSize.Size14,
 TextScaled: true,
});

const HealthBar = New("Frame")({
 Size: new UDim2(1, 0, 0, 20),
 BackgroundColor3: new Color3(0.18, 0.03, 0.03),
 BorderSizePixel: 0,
 Position: new UDim2(0, 0, 0, 0),

 [Children]: [HealthBarFill, HealthBarLabel],
});

export { HealthBar };

```

## Experience Bar

```ts

import Fusion, { Children, Computed } from "@rbxts/fusion";
import { PlayerProgression } from "shared/_ROACT/Components/DataValueObjects";

const { New } = Fusion;

const experiencePercent = Computed(() => {
 return PlayerProgression.playerExperience.get() / PlayerProgression.experienceToNextLevel.get();
});

const ExperienceBarFill = New("Frame")({
 Size: Computed(() => new UDim2(experiencePercent.get(), 0, 1, 0)),
 BackgroundColor3: new Color3(0, 1, 0),
 BorderSizePixel: 0,
});

const ExperienceBarLabel = New("TextLabel")({
 Text: Computed(
  () => `XP: ${PlayerProgression.playerExperience.get()} / ${PlayerProgression.experienceToNextLevel.get()}`,
 ),
 Size: new UDim2(1, 0, 1, 0),
 BackgroundTransparency: 1,
 TextColor3: new Color3(1, 1, 1),
 FontSize: Enum.FontSize.Size14,
 TextScaled: true,
});

const ExperienceBar = New("Frame")({
 Size: new UDim2(1, 0, 0, 20),
 BackgroundColor3: new Color3(0.2, 0.2, 0.2),
 BorderSizePixel: 0,
 Position: new UDim2(0, 0, 0, 0),

 [Children]: [ExperienceBarFill, ExperienceBarLabel],
});

export { ExperienceBar };

```

## Components

```ts
/** Data Value Objects for Game Data
 * Value Object Exports for import in other Modules like ClientNetManager
 *
 * */

import Fusion, { Computed } from "@rbxts/fusion";

const { Value } = Fusion;

/* Values */
/* Basic Information */
const playerDisplayName = Value("Player");

/* ==== Currency Information ===== */
const playerSoulChips = Value(0);
const playerSoulShards = Value(0);
const playerSoulGems = Value(0);
const PlayerCurrency = {
 playerSoulChips,
 playerSoulShards,
 playerSoulGems,
};

/* ===== Player Stats ====== */
/* Basic Stats */
const playerStrength = Value(10);
const playerDexteriy = Value(10);
const playerIntelligence = Value(10);
const playerConstitution = Value(10);
/* Attribute Points */
const playerAttributePoints = Value(0);
const playerSpentAttributePoints = Value(0);

const PlayerStats = {
 playerStrength,
 playerDexteriy,
 playerIntelligence,
 playerConstitution,

 playerAttributePoints,
 playerSpentAttributePoints,
};

/* Computed Stats */

/* Leveling Information */
const playerLevel = Value(1);
const playerExperience = Value(0);
const experienceToNextLevel = Computed(() => {
 return playerLevel.get() * 100; // Example: each level requires 100 more experience
});
const PlayerProgression = {
 playerLevel,
 playerExperience,
 experienceToNextLevel,
};

/*====== Resource Bars =======*/
/* Health Property*/
const playerMaxHealth = Computed(() => {
 return playerConstitution.get() * 10; // Example: each constitution point gives 10 health
});
const playerCurrentHealth = Value(playerMaxHealth.get());
const PlayerHealth = {
 playerMaxHealth,
 playerCurrentHealth,
};

/* Stamina Property*/
const playerMaxStamina = Computed(() => {
 return playerDexteriy.get() * 5; // Example: each dexterity point gives 5 stamina
});
const playerCurrentStamina = Value(playerMaxStamina.get());
const PlayerStamina = {
 playerMaxStamina,
 playerCurrentStamina,
};

/* Soul Power Property*/
const playerMaxSoulPower = Computed(() => {
 return playerIntelligence.get() * playerDexteriy.get() * playerConstitution.get(); // Example: each intelligence point gives 2 soul power
});
const playerCurrentSoulPower = Value(playerMaxSoulPower.get());
const PlayerSoulPower = {
 playerMaxSoulPower,
 playerCurrentSoulPower,
};

/* Domain Resource */
const playerDomainResourceMax = Computed(() => {
 return playerMaxSoulPower.get() + playerMaxStamina.get() + playerMaxHealth.get();
});
const playerDomainResourceCurrent = Computed(() => {
 return playerMaxSoulPower.get() + playerMaxHealth.get() + playerCurrentHealth.get();
});
const PlayerDomainResource = {
 playerDomainResourceMax,
 playerDomainResourceCurrent,
};

const ResourceBars = {
 PlayerProgression,
 PlayerHealth,
 PlayerStamina,
 PlayerSoulPower,
 PlayerDomainResource,
};

export { PlayerProgression, ResourceBars, PlayerCurrency, PlayerStats };

```

## Complex Example (Great Character Frame!)

```ts
import Fusion, { Computed, Children } from "@rbxts/fusion";
import { ResourceBars, PlayerProgression } from "shared/_ROACT/Components/DataValueObjects";

const { New } = Fusion;

/**
 * Example computed values for each bar's fill percentage.
 * Adjust these to match your actual stats.
 */
const healthPct = Computed(
 () => ResourceBars.PlayerHealth.playerCurrentHealth.get() / ResourceBars.PlayerHealth.playerMaxHealth.get(),
);
const staminaPct = Computed(
 () => ResourceBars.PlayerStamina.playerCurrentStamina.get() / ResourceBars.PlayerStamina.playerMaxStamina.get(),
);
const soulPowerPct = Computed(
 () =>
  ResourceBars.PlayerSoulPower.playerCurrentSoulPower.get() /
  ResourceBars.PlayerSoulPower.playerMaxSoulPower.get(),
);
const xpPct = Computed(() => PlayerProgression.playerExperience.get() / PlayerProgression.experienceToNextLevel.get());

// Helper function to create a bar frame
function createBar(color: Color3, percentage: Computed<number>, labelText?: Computed<string> | string): Instance {
 const textToDisplay = labelText
  ? typeIs(labelText, "string")
   ? labelText
   : Computed(() => labelText.get())
  : Computed(() => `${math.floor(percentage.get() * 100)}%`);

 return New("Frame")({
  Size: new UDim2(1, 0, 0, 20),
  BackgroundColor3: new Color3(0.2, 0.2, 0.2),
  BorderSizePixel: 0,
  [Children]: [
   // The colored fill
   New("Frame")({
    Size: Computed(() => new UDim2(percentage.get(), 0, 1, 0)),
    BackgroundColor3: color,
    BorderSizePixel: 0,
    [Children]: [
     New("UICorner")({
      CornerRadius: new UDim(0, 4),
     }),
    ],
   }),
   // Label on top
   New("TextLabel")({
    Text: textToDisplay,
    Size: new UDim2(1, 0, 1, 0),
    BackgroundTransparency: 1,
    TextColor3: new Color3(1, 1, 1),
    Font: Enum.Font.GothamBold,
    TextScaled: true,
    ZIndex: 2,
   }),
   // Rounded corners for the bar container
   New("UICorner")({
    CornerRadius: new UDim(0, 4),
   }),
  ],
 });
}

const CharacterFrame = New("Frame")({
 Size: new UDim2(0, 420, 0, 110),
 Position: new UDim2(0.05, 0, 0.05, 0), // Example position; adjust as needed
 BackgroundColor3: new Color3(0.07, 0.07, 0.07),
 BorderSizePixel: 0,
 [Children]: [
  // Rounded corners for the overall frame
  New("UICorner")({
   CornerRadius: new UDim(0, 8),
  }),
  // Player name label
  New("TextLabel")({
   Text: "PLAYER",
   Position: new UDim2(0, 95, 0, 5),
   Size: new UDim2(0, 300, 0, 30),
   BackgroundTransparency: 1,
   TextColor3: new Color3(1, 1, 1),
   Font: Enum.Font.GothamBold,
   TextScaled: true,
   TextXAlignment: Enum.TextXAlignment.Left,
   ZIndex: 2,
  }),
  // The circular avatar ring
  New("ImageLabel")({
   // Replace with your metallic ring image asset
   Image: "rbxassetid://00000000",
   Position: new UDim2(0, 10, 0, 10),
   Size: new UDim2(0, 80, 0, 80),
   BackgroundTransparency: 1,
   ZIndex: 1,
   [Children]: [
    // The avatar image
    New("ImageLabel")({
     // Replace with the player's avatar or your own placeholder image
     Image: "rbxassetid://12345678",
     Size: new UDim2(0.8, 0, 0.8, 0),
     AnchorPoint: new Vector2(0.5, 0.5),
     Position: new UDim2(0.5, 0, 0.5, 0),
     BackgroundTransparency: 1,
     ZIndex: 2,
     [Children]: [
      // Make the avatar image a circle
      New("UICorner")({
       CornerRadius: new UDim(1, 0),
      }),
     ],
    }),
   ],
  }),
  // Level circle
  New("Frame")({
   Position: new UDim2(0, 60, 0, 60), // Slightly overlapping the bottom-right of the ring
   Size: new UDim2(0, 30, 0, 30),
   BackgroundColor3: new Color3(0.2, 0.2, 0.2),
   BorderSizePixel: 0,
   ZIndex: 3,
   [Children]: [
    New("UICorner")({
     CornerRadius: new UDim(1, 0),
    }),
    New("TextLabel")({
     Text: Computed(() => `${PlayerProgression.playerLevel.get()}`),
     Size: new UDim2(1, 0, 1, 0),
     BackgroundTransparency: 1,
     TextColor3: new Color3(1, 1, 1),
     Font: Enum.Font.GothamBold,
     TextScaled: true,
     ZIndex: 4,
    }),
   ],
  }),
  // Resource bars container
  New("Frame")({
   Position: new UDim2(0, 95, 0, 40),
   Size: new UDim2(1, -105, 1, -50),
   BackgroundTransparency: 1,
   [Children]: [
    // Stack the bars vertically
    New("UIListLayout")({
     Padding: new UDim(0, 5),
     FillDirection: Enum.FillDirection.Vertical,
     SortOrder: Enum.SortOrder.LayoutOrder,
    }),
    // Health bar (red)
    createBar(new Color3(1, 0, 0), healthPct),
    // Stamina bar (blue)
    createBar(new Color3(0, 0.4, 1), staminaPct),
    // Soul Power bar (yellow)
    createBar(new Color3(1, 1, 0), soulPowerPct),
    // XP bar (green) with custom text
    createBar(new Color3(0, 1, 0), xpPct, "XP"),
   ],
  }),
 ],
});

export { CharacterFrame };
```
