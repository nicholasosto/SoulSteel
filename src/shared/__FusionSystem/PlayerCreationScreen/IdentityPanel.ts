import Fusion from "@rbxts/fusion";
import { playerName, selectedRace } from "./PlayerCreationScreen";

const { New, Children, OnChange } = Fusion;

export function IdentityPanel() {
	return New("Frame")({
		BackgroundTransparency: 0.5,
		Size: UDim2.fromScale(0.3, 0.8),
		Position: UDim2.fromScale(0.05, 0.1),
		[Children]: [
			New("TextLabel")({
				Text: "Choose Your Name",
				Size: UDim2.fromScale(1, 0.1),
				TextScaled: true,
			}),
			New("TextBox")({
				Size: UDim2.fromScale(1, 0.1),
				Position: UDim2.fromScale(0, 0.15),
				PlaceholderText: "Fateless One...",
				Text: playerName,
				[OnChange("Text")]: (newText) => playerName.set(newText),
			}),
			New("TextLabel")({
				Text: "Select Your Race",
				Size: UDim2.fromScale(1, 0.1),
				Position: UDim2.fromScale(0, 0.3),
				TextScaled: true,
			}),
		],
	});
}
