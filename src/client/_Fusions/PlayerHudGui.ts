// MenuButtons.ts
import Fusion from "@rbxts/fusion";
import { CharacterFrame } from "client/_Fusions/Components/CharacterFrameRoact";
import { PanelManager } from "./PlayerHud/Screens/PanelManager";
import CharacterCreationScreen from "shared/__FusionSystem/PlayerCreationScreen/CharacterCreationUi";

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
	//Size: new UDim2(0, 400, 0, 150), // Adjust as needed
	AnchorPoint: new Vector2(0, 0),
	BackgroundColor3: Color3.fromRGB(161, 105, 105),
	BackgroundTransparency: 1,
	[Children]: [CharacterFrame],
});
CharacterFrameContainer.Parent = HudContainerFrame;

const CharacterCreationProps = {
	displayName: "Player Name",
	selectedRace: "Human",
	onCreate: () => {
		print("Character Created! I Guess");
	},
};

const PlayerHudGui = New("ScreenGui")({
	Name: "PlayerHudGui",
	ResetOnSpawn: false,
	IgnoreGuiInset: true,
	[Children]: [HudContainerFrame, PanelManager(), CharacterCreationScreen(CharacterCreationProps)],
});

export default PlayerHudGui;
