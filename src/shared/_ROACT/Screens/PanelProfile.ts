// PanelProfile.ts
import Fusion, { Computed } from "@rbxts/fusion";

interface PanelProps {
	activePanel: Fusion.Value<string>;
}

const { New } = Fusion;

export function PanelProfile(props: PanelProps) {
	// Compute the visibility based on whether the active panel matches this panel's id ("Profile")
	const isVisible = Computed(() => props.activePanel.get() === "Profile");

	return New("Frame")({
		Name: "PanelProfile",
		Size: new UDim2(0, 400, 0, 300),
		Position: new UDim2(0.1, 0, 0.2, 0),
		BackgroundColor3: new Color3(0.1, 0.1, 0.1),
		Visible: isVisible,
		[Fusion.Children]: [
			// Your panel's UI elements here
			New("TextLabel")({
				Text: "Profile Panel",
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				TextColor3: new Color3(1, 1, 1),
				Font: Enum.Font.GothamBold,
				TextScaled: true,
			}),
		],
	});
}
