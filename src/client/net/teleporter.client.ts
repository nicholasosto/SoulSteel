import { WorldEvent } from "client/net/_Client_Events";
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
			WorldEvent.Teleport.SendToServer(cfvLocation.Value.Position);
		});
	}
});
