import { CollectionService } from "@rbxts/services";

export function StartCollectingCloseButtons() {
	CollectionService.GetTagged("CloseButton").forEach((button) => {
		const closeButton = button as GuiButton;
		closeButton.Activated.Connect(() => {
			const screenGUI = closeButton.FindFirstAncestorOfClass("ScreenGui") as ScreenGui;
			if (screenGUI) {
				screenGUI.Enabled = false;
			}
			print("Close button clicked, hiding the screen GUI.");
		});
	});

	CollectionService.GetInstanceAddedSignal("CloseButton").Connect((instance) => {
		const closeButton = instance as GuiButton;
		closeButton.Activated.Connect(() => {
			const screenGUI = closeButton.FindFirstAncestorOfClass("ScreenGui") as ScreenGui;
			if (screenGUI) {
				screenGUI.Enabled = false;
			}
			print("Close button clicked, hiding the screen GUI.");
		});
	});

	warn("Started collecting close buttons.");
}
