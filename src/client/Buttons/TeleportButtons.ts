import { Players } from "@rbxts/services";
import { Requests } from "shared/Remotes/ClientRemotes";
import Logger from "shared/Utility/Logger";

const localPlayer = Players.LocalPlayer;
const PlayerGui = localPlayer.WaitForChild("PlayerGui");
const TeleportPanel = PlayerGui.WaitForChild("Teleport_Panel");
const TeleportButtonDecendants = TeleportPanel.WaitForChild("TeleportButtons").GetDescendants();

const TeleportButtons = TeleportButtonDecendants.filter((instance: Instance) => instance.IsA("TextButton"));

Logger.Log("[ButtonScript]", TeleportButtons);
TeleportButtons.forEach((button) => {
    const cfvLocation = button.WaitForChild("Location") as CFrameValue;
    assert(cfvLocation, "CFrameValue not found");
	button.Activated.Connect(() => {

		Requests.TeleportRequest.SendToServer(cfvLocation.Value.Position);
	});
});

export { TeleportButtons };
