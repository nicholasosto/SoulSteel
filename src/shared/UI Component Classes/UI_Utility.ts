export enum ScreenGUINames {
	HUD = "HUD",
	EquipmentPanel = "EquipmentPanel",
	SkillPanel = "SkillPanel",
	MenuButtonPanel = "MenuButtonPanel",
	LoadingScreen = "LoadingScreen",
	MainMenu = "MainMenu",
	NotificationPanel = "NotificationPanel",
	AdminPanel = "AdminPanel",
}

export function findOrCreateScreenGui(player: Player, name: ScreenGUINames, parent: Instance): ScreenGui {
	let screenGui = parent.WaitForChild(name,2) as ScreenGui;
	if (!screenGui) {
		screenGui = new Instance("ScreenGui");
		screenGui.Name = name;
		screenGui.Parent = parent;
	}
	return screenGui;
}

export function getPlayersSkillBar(playerGui: PlayerGui) {
	return playerGui.WaitForChild(ScreenGUINames.HUD).WaitForChild("SkillBar") as Frame;
}
