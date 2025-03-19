// PanelEquipment.ts
import Fusion, { Computed } from "@rbxts/fusion";

interface PanelProps {
	activePanel: Fusion.Value<string>;
}

const { New } = Fusion;

export function PanelEquipment(props: PanelProps) {
	const isVisible = Computed(() => props.activePanel.get() === "Equipment");

	return New("Frame")({
		Name: "PanelEquipment",
		Size: new UDim2(0, 300, 0, 400),
		AnchorPoint: new Vector2(0.5, 0.5),
		Position: new UDim2(0.5, 0, 0.5, 0),
		BackgroundColor3: new Color3(0.1, 0.1, 0.1),
		Visible: isVisible,
		[Fusion.Children]: [
			// Your panel's UI elements here
			New("TextLabel")({
				Text: "EquipmentPanel",
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				TextColor3: new Color3(1, 1, 1),
				Font: Enum.Font.GothamBold,
				TextScaled: true,
			}),
		],
	});
}
