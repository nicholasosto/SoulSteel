/**
 *  ExperienceBar.ts
 * This is a component using the Fusion library
 * It is a simple ProgressBar with a forground and background
 * It is updated when the player's experience changes
 */

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
