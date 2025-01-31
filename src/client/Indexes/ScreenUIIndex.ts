import { Players } from "@rbxts/services";
import Logger from "shared/Utility/Logger";

const LocalPlayer = Players.LocalPlayer;
const PlayerGui = LocalPlayer.WaitForChild("PlayerGui");

function GetHud(): ScreenGui | undefined {
	const HUD = PlayerGui.WaitForChild("HUD") as ScreenGui;
	return HUD;
}

function GetCharacterFrame(): Frame | undefined {
	const HUD = GetHud() as ScreenGui;
	const CharacterFrame = HUD?.WaitForChild("CharacterFrame") as Frame;
	return CharacterFrame;
}
