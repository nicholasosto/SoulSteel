import Fusion from "@rbxts/fusion";

/* Custom Components */
import PlayerHudGui from "client/_Fusions/PlayerHudGui";

const { New, Children } = Fusion;

// Mounting the component in a LocalScript:
const player = game.GetService("Players").LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");

const FusionApplication = New("ScreenGui")({
	Parent: playerGui,
	Name: "FusionApp",
	IgnoreGuiInset: true,
	ResetOnSpawn: false,
	[Children]: [PlayerHudGui],
});

print("Roact Client: Starting...", FusionApplication);
