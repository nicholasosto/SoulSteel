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
	[Children]: [
		// Rounded corners for the fill
		New("UICorner")({
			CornerRadius: new UDim(0, 6),
		}),
		// Gradient effect for the fill
		New("UIGradient")({
			Color: new ColorSequence([
				new ColorSequenceKeypoint(0, new Color3(1, 0.4, 0.4)),
				new ColorSequenceKeypoint(1, new Color3(0.8, 0, 0)),
			]),
			Rotation: 90,
		}),
	],
});

const HealthBarLabel = New("TextLabel")({
	Text: Computed(
		() =>
			`Health: ${ResourceBars.PlayerHealth.playerCurrentHealth.get()} / ${ResourceBars.PlayerHealth.playerMaxHealth.get()}`,
	),
	Size: new UDim2(1, 0, 1, 0),
	BackgroundTransparency: 1,
	TextColor3: new Color3(1, 1, 1),
	Font: Enum.Font.GothamBold,
	TextScaled: true,
	// Ensure label is on top of the fill
	ZIndex: 2,
});

const HealthBar = New("Frame")({
	Size: new UDim2(1, 0, 0, 25),
	BackgroundColor3: new Color3(0.18, 0.03, 0.03),
	BorderSizePixel: 0,
	Position: new UDim2(0, 0, 0, 0),
	[Children]: [
		// Border stroke for a subtle outline
		New("UIStroke")({
			Color: new Color3(0, 0, 0),
			Thickness: 2,
			Transparency: 0.5,
		}),
		// Rounded corners for the outer frame
		New("UICorner")({
			CornerRadius: new UDim(0, 6),
		}),
		HealthBarFill,
		HealthBarLabel,
	],
});

export { HealthBar };
