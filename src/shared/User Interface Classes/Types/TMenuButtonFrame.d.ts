type MenuButtonId = "Equipment" | "Inventory" | "Settings" | "Teleport";

export type TMenuButtonFrame = Frame & {
	Equipment: GuiButton;
	Inventory: GuiButton;
	Settings: GuiButton;
	Teleport: GuiButton;
	Skills: GuiButton;
};
