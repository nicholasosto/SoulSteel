import { Players, UserInputService } from "@rbxts/services";
import GUIStateComponent from "shared/State/GUI State/GUIStateComponent";

const LocalPlayer = Players.LocalPlayer;
const PlayerGui = LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
const LocalCharacter = LocalPlayer.Character || LocalPlayer.CharacterAdded.Wait()[0];
const LocalHumanoid = LocalCharacter.WaitForChild("Humanoid") as Humanoid;
import { RemoteEvents } from "shared/net/Remotes";

const GUIButtons = {
	TestButton1: PlayerGui.FindFirstChild("StateTest01", true) as TextButton,
	TestButton2: PlayerGui.FindFirstChild("StateTest02", true) as TextButton,

	PlayerDataLoaded: PlayerGui.FindFirstChild("PlayerDataLoadedButton", true) as GuiButton,
};

print("Developer Client: Starting...");
print("Local Player: ", LocalPlayer.Name);
print("Local Character: ", LocalCharacter.Name);
print("Local Humanoid: ", LocalHumanoid.Name);
