# Robotic HUD Example

```ts
import Fusion, { New, Children, Computed } from "@rbxts/fusion";
import { ResourceBars, PlayerProgression } from "shared/_ROACT/Components/DataValueObjects";

const { Frame, TextLabel, ImageLabel, UIListLayout, UICorner } = New;

// Computed percentages for resources
const healthPct = Computed(() =>
 ResourceBars.PlayerHealth.playerCurrentHealth.get() / ResourceBars.PlayerHealth.playerMaxHealth.get(),
);
const staminaPct = Computed(
 () => ResourceBars.PlayerStamina.playerCurrentStamina.get() / ResourceBars.PlayerStamina.playerMaxStamina.get(),
);
const soulPowerPct = Computed(
 () => ResourceBars.PlayerSoulPower.playerCurrentSoulPower.get() / ResourceBars.PlayerSoulPower.playerMaxSoulPower.get(),
);

const CyberneticHUD = () => {
 return New("Frame")({
  Size: new UDim2(1, 0, 1, 0),
  BackgroundTransparency: 1,
  [Children]: [
   // Vital Stat Indicators
   New("Frame")({
    Size: new UDim2(0.2, 0, 0.15, 0),
    Position: new UDim2(0.02, 0, 0.02, 0),
    BackgroundTransparency: 1,
    [Children]: [
     // Health Bar
     createBar(new Color3(0, 1, 1), healthPct, "HP"),
     // Stamina Bar
     createBar(new Color3(0, 0.4, 1), staminaPct, "Stamina"),
     // Soul Power Bar
     createBar(new Color3(0.2, 0.8, 1), soulPowerPct, "Soul Power"),
     New("UIListLayout")({ Padding: new UDim(0, 4) }),
    ],
   }),

   // Skill Bar
   New("Frame")({
    Size: new UDim2(0.4, 0, 0, 50),
    AnchorPoint: new Vector2(0.5, 1),
    Position: new UDim2(0.5, 0, 0.95, 0),
    BackgroundTransparency: 0.5,
    BackgroundColor3: new Color3(0.1, 0.1, 0.1),
    [Children]: [
     New("UIListLayout")({ HorizontalAlignment: Enum.HorizontalAlignment.Center }),
     // Skill Icons
     // Loop this for skills
    ],
   }),

   // Domain Power
   New("Frame")({
    Size: new UDim2(0.2, 0, 0.05, 0),
    AnchorPoint: new Vector2(0.5, 0),
    Position: new UDim2(0.5, 0, 0, 10),
    BackgroundColor3: new Color3(0.2, 0.2, 0.2),
    [Children]: [
     createBar(new Color3(0.5, 0, 1), soulPowerPct, "Core Power"),
    ],
   }),

   // Movement Abilities
   New("Frame")({
    Size: new UDim2(0.1, 0, 0.05, 0),
    AnchorPoint: new Vector2(1, 1),
    Position: new UDim2(0.98, 0, 0.9, 0),
    BackgroundTransparency: 1,
    [Children]: [
     // Example single movement ability icon
     New("ImageButton")({
      Size: new UDim2(0, 40, 0, 40),
      Image: "rbxassetid://<movement_icon>",
      BackgroundTransparency: 0.5,
      [Children]: [New("UICorner")({ CornerRadius: new UDim(1, 0) })],
     }),
    ],
   }),

   // Menu Buttons
   New("Frame")({
    Size: new UDim2(0.06, 0, 0.3, 0),
    Position: new UDim2(1, -10, 0.35, 0),
    AnchorPoint: new Vector2(1, 0.5),
    BackgroundTransparency: 0.8,
    [Children]: [
     New("UIListLayout")({ Padding: new UDim(0, 4) }),
     // Menu buttons created with icons for Equipment, Skills, Quests, Inventory, Settings
     // (Icons to be filled with appropriate asset IDs)
    ],
   }),
  ],
 });

// Helper function
function createBar(color: Color3, percentage: Computed<number>, label: string): Instance {
 return New("Frame")({
  Size: new UDim2(1, 0, 0, 15),
  BackgroundColor3: new Color3(0.1, 0.1, 0.1),
  [Children]: [
   New("Frame")({
    Size: Computed(() => new UDim2(percentage.get(), 0, 1, 0)),
    BackgroundColor3: color,
   }),
   New("TextLabel")({
    Size: new UDim2(1, 0, 1, 0),
   Text: labelText,
   BackgroundTransparency: 1,
   TextColor3: new Color3(1, 1, 1),
   TextScaled: true,
   Font: Enum.Font.GothamBold,
  }),
  ],
 }),
};

export { CyberneticInterface };

// The HUD is modular and can be easily expanded or customized further.
```
