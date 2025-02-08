import { Requests, Responses } from "shared/Remotes/ClientRemotes";
import { Players } from "@rbxts/services";
import Logger from "shared/Utility/Logger";

Responses.TeleportResponse.Connect((position: Vector3) => {
	Logger.Log("Teleporting to position: ", position, TeleportButtons);
});

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
		Requests.TeleportRequest.SendToServer(cfvLocation.Value.Position);
	});
});
