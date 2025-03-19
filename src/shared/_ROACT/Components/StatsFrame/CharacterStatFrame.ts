import Fusion, { Children, Computed } from "@rbxts/fusion";
import { PlayerStats } from "shared/_ROACT/Components/DataValueObjects";

const { New } = Fusion;

const StatsFrame = New("Frame")({
	Size: new UDim2(0, 300, 0, 350),
	Position: new UDim2(0.5, -150, 0.5, -175),
	BackgroundColor3: new Color3(0.15, 0.15, 0.15),
	BorderSizePixel: 0,
	[Children]: [
		// Rounded corners for the outer frame
		New("UICorner")({
			CornerRadius: new UDim(0, 12),
		}),
		// A subtle border stroke for definition
		New("UIStroke")({
			Color: new Color3(0, 0, 0),
			Thickness: 2,
			Transparency: 0.3,
		}),
		// Title label
		New("TextLabel")({
			Text: "Character Stats",
			Size: new UDim2(1, 0, 0, 50),
			BackgroundTransparency: 1,
			TextColor3: new Color3(1, 1, 1),
			Font: Enum.Font.GothamBold,
			TextScaled: true,
			TextStrokeTransparency: 0,
			ZIndex: 2,
		}),
		// Container for the stat fields
		New("Frame")({
			Position: new UDim2(0, 10, 0, 60),
			Size: new UDim2(1, -20, 1, -70),
			BackgroundTransparency: 1,
			[Children]: [
				// Strength
				New("TextLabel")({
					Text: Computed(() => `Strength: ${PlayerStats.playerStrength.get()}`),
					Size: new UDim2(1, 0, 0, 35),
					BackgroundTransparency: 1,
					TextColor3: new Color3(0.9, 0.9, 0.9),
					Font: Enum.Font.Gotham,
					TextScaled: true,
					Position: new UDim2(0, 0, 0, 0),
					ZIndex: 2,
				}),
				// Dexterity
				New("TextLabel")({
					Text: Computed(() => `Dexterity: ${PlayerStats.playerDexteriy.get()}`),
					Size: new UDim2(1, 0, 0, 35),
					BackgroundTransparency: 1,
					TextColor3: new Color3(0.9, 0.9, 0.9),
					Font: Enum.Font.Gotham,
					TextScaled: true,
					Position: new UDim2(0, 0, 0, 40),
					ZIndex: 2,
				}),
				// Intelligence
				New("TextLabel")({
					Text: Computed(() => `Intelligence: ${PlayerStats.playerIntelligence.get()}`),
					Size: new UDim2(1, 0, 0, 35),
					BackgroundTransparency: 1,
					TextColor3: new Color3(0.9, 0.9, 0.9),
					Font: Enum.Font.Gotham,
					TextScaled: true,
					Position: new UDim2(0, 0, 0, 80),
					ZIndex: 2,
				}),
				// Constitution
				New("TextLabel")({
					Text: Computed(() => `Constitution: ${PlayerStats.playerConstitution.get()}`),
					Size: new UDim2(1, 0, 0, 35),
					BackgroundTransparency: 1,
					TextColor3: new Color3(0.9, 0.9, 0.9),
					Font: Enum.Font.Gotham,
					TextScaled: true,
					Position: new UDim2(0, 0, 0, 120),
					ZIndex: 2,
				}),
				// Attribute Points
				New("TextLabel")({
					Text: Computed(() => `Attribute Points: ${PlayerStats.playerAttributePoints.get()}`),
					Size: new UDim2(1, 0, 0, 35),
					BackgroundTransparency: 1,
					TextColor3: new Color3(0.9, 0.9, 0.9),
					Font: Enum.Font.Gotham,
					TextScaled: true,
					Position: new UDim2(0, 0, 0, 160),
					ZIndex: 2,
				}),
				// Spent Attribute Points
				New("TextLabel")({
					Text: Computed(() => `Spent Points: ${PlayerStats.playerSpentAttributePoints.get()}`),
					Size: new UDim2(1, 0, 0, 35),
					BackgroundTransparency: 1,
					TextColor3: new Color3(0.9, 0.9, 0.9),
					Font: Enum.Font.Gotham,
					TextScaled: true,
					Position: new UDim2(0, 0, 0, 200),
					ZIndex: 2,
				}),
			],
		}),
	],
});

export { StatsFrame };
