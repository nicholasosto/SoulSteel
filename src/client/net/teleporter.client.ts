import { WorldEvent } from "client/net/_Client_Events";
import { Players } from "@rbxts/services";
import Logger from "shared/Utility/Logger";

const localPlayer = Players.LocalPlayer;
const PlayerGui = localPlayer.WaitForChild("PlayerGui");
const TeleportPanel = PlayerGui.WaitForChild("Teleport_Panel");
const TeleportButtonDecendants = TeleportPanel.WaitForChild("TeleportButtons").GetDescendants();

const TeleportButtons = TeleportButtonDecendants.filter((instance: Instance) => instance.IsA("TextButton"));

Logger.Log("Teleport Listener Started: ", TeleportButtons);

TeleportButtons.forEach((button) => {
	const cfvLocation = button.WaitForChild("Location") as CFrameValue;
	assert(cfvLocation, "CFrameValue not found");
	button.Activated.Connect(() => {
		WorldEvent.Teleport.SendToServer(cfvLocation.Value.Position);
	});
});
