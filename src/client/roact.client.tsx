import Fusion from "@rbxts/fusion";

/* Custom Components */
import { CharacterFrame } from "shared/_ROACT/Components/CharacterFrame/CharacterFrameRoact";
import { PanelManager } from "shared/_ROACT/Screens/PanelManager";

const { New, Children } = Fusion;

// Mounting the component in a LocalScript:
const player = game.GetService("Players").LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");

const FusionApplication = New("ScreenGui")({
	Parent: playerGui,
	Name: "FusionApp",
	IgnoreGuiInset: true,
	ResetOnSpawn: false,
	[Children]: [CharacterFrame, PanelManager()],
});

print("Roact Client: Starting...", FusionApplication);
