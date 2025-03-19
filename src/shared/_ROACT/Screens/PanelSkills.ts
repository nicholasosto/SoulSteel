// PanelSkills.ts
import Fusion, { Computed } from "@rbxts/fusion";

interface PanelProps {
	activePanel: Fusion.Value<string>;
}

const { New } = Fusion;

export function PanelSkills(props: PanelProps) {
	const isVisible = Computed(() => props.activePanel.get() === "Skills");

	return New("Frame")({
		Name: "PanelSkills",
		Size: new UDim2(0, 400, 0, 300),
		Position: new UDim2(0.1, 0, 0.2, 0),
		BackgroundColor3: new Color3(0.1, 0.1, 0.1),
		Visible: isVisible,
		[Fusion.Children]: [
			// Your panel's UI elements here
			New("TextLabel")({
				Text: "SkillsPanel",
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				TextColor3: new Color3(1, 1, 1),
				Font: Enum.Font.GothamBold,
				TextScaled: true,
			}),
		],
	});
}
