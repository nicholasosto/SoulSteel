// MenuButtons.ts
import Fusion from "@rbxts/fusion";
import { CharacterFrame } from "shared/_ROACT/Components/CharacterFrame/CharacterFrameRoact";
import { PanelManager } from "../../shared/_ROACT/Screens/PanelManager";

const { New, Children } = Fusion;

const HudContainerFrame = New("Frame")({
	Name: "HudContainerFrame",
	Size: new UDim2(1, 0, 1, 0), // Adjust as needed
	Position: new UDim2(0.5, 0, 0.5, 0), // Center the frame
	AnchorPoint: new Vector2(0.5, 0.5),
	BackgroundColor3: Color3.fromRGB(0, 0, 0),
	BackgroundTransparency: 1,
});

const CharacterFrameContainer = New("Frame")({
	Name: "CharacterFrameContainer",
	Size: new UDim2(0, 400, 0, 150), // Adjust as needed
	Position: new UDim2(0, 60, 0, 60),
	AnchorPoint: new Vector2(0, 0),
	BackgroundColor3: Color3.fromRGB(161, 105, 105),
	BackgroundTransparency: 1,
	[Children]: [CharacterFrame],
});
CharacterFrameContainer.Parent = HudContainerFrame;

const PlayerHudGui = New("ScreenGui")({
	Name: "PlayerHudGui",
	ResetOnSpawn: false,
	IgnoreGuiInset: true,
	[Children]: [HudContainerFrame, PanelManager()],
});

export default PlayerHudGui;
