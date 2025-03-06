import { Remotes } from "shared/net/Remotes";
import { TeleportButtons } from "client/ScreenGUIs/GUI_Index";

/* Teleport Buttons */
const TeleportButtonsInstances = TeleportButtons.filter((instance: Instance) => instance.IsA("TextButton"));

/* Activation Handler */
TeleportButtons.forEach((button) => {
	/* Location: CFrameValue - Comes from childProperty of the button */
	if (button.IsA("TextButton")) {
		const cfvLocation = button.WaitForChild("Location") as CFrameValue;
		assert(cfvLocation, "CFrameValue not found");
		button.Activated.Connect(() => {
			Remotes.Client.Get("TeleportTo").SendToServer(cfvLocation.Value.Position);
		});
	}
});
