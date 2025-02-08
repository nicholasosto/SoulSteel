import { Players } from "@rbxts/services";

const localPlayer = Players.LocalPlayer;
const PlayerGui = localPlayer.WaitForChild("PlayerGui");
const DeveloperPanel = PlayerGui.WaitForChild("Developer_Panel");
const DeveloperButtonFrame = DeveloperPanel.WaitForChild("DeveloperButtonFrame");

const GameOfLifeButton = DeveloperButtonFrame.WaitForChild("GameOfLifeButton") as TextButton;
export { GameOfLifeButton };
