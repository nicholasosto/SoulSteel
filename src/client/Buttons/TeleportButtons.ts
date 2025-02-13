import { Players } from "@rbxts/services";
import { WorldEvent } from "client/net/_Client_Events";

const localPlayer = Players.LocalPlayer;
const PlayerGui = localPlayer.WaitForChild("PlayerGui");
const TeleportPanel = PlayerGui.WaitForChild("Teleport_Panel");
const TeleportButtonDecendants = TeleportPanel.WaitForChild("TeleportButtons").GetDescendants();

const TeleportButtons = TeleportButtonDecendants.filter((instance: Instance) => instance.IsA("TextButton"));

/* Assert that the TeleportButtons are TextButtons */
TeleportButtons.forEach((button) => {
	const cfvLocation = button.WaitForChild("Location") as CFrameValue;
	assert(cfvLocation, "CFrameValue not found");
	button.Activated.Connect(() => {
		WorldEvent.Teleport.SendToServer(cfvLocation.Value.Position);
	});
});

export { TeleportButtons };
