import * as GUI from "client/ScreenGUIs/GUI_Index";
import Logger from "shared/Utility/Logger";

enum PanelName {
	Developer = "Developer",
	Equipment = "Equipment",
	Character = "Character",
	Teleport = "Teleport",
	Skills = "Skills",
	Settings = "Settings",
//	Store = "Store",
}

const PanelMap = new Map<PanelName, ScreenGui>([
	[PanelName.Developer, GUI.Developer_Screen],
	[PanelName.Equipment, GUI.Equipment_Screen],
	[PanelName.Character, GUI.Character_Screen],
	[PanelName.Teleport, GUI.Teleport_Screen],
	[PanelName.Skills, GUI.Skills_Screen],
	[PanelName.Settings, GUI.Settings_Screen],
//	[PanelName.Store, GUI.Store_Screen],
]);

const ButtonMap = new Map<string, TextButton>([
	[PanelName.Developer, GUI.MainMenuFrame.WaitForChild("Developer_Button") as TextButton],
	[PanelName.Equipment, GUI.MainMenuFrame.WaitForChild("Equipment_Button") as TextButton],
	[PanelName.Character, GUI.MainMenuFrame.WaitForChild("Character_Button") as TextButton],
	[PanelName.Teleport, GUI.MainMenuFrame.WaitForChild("Teleport_Button") as TextButton],
	[PanelName.Skills, GUI.MainMenuFrame.WaitForChild("Skills_Button") as TextButton],
	[PanelName.Settings, GUI.MainMenuFrame.WaitForChild("Settings_Button") as TextButton],
//	[PanelName.Store, GUI.MainMenuFrame.WaitForChild("Store_Button") as TextButton],
]);

export default class MainMenu {
	/* Singleton Instance */
	private static _instance: MainMenu;

	/* Connections */
	private static _buttonConnections = new Map<PanelName, RBXScriptConnection>();

	/* Constructor */
	private constructor() {
		this._initializeMainMenu();
		Logger.Log(script, "Main Menu: Instantiated");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new MainMenu();
			this._initializeButtonConnections();
		}
	}

	/* Initialize Button Connections */
	private static _initializeButtonConnections() {
		/* Disconnect Existing Connections */
		if (MainMenu._buttonConnections.size() > 0) {
			MainMenu._buttonConnections.forEach((connection) => {
				connection.Disconnect();
			});
		}

		/* Create New Connections */
		ButtonMap.forEach((button, panelName) => {
			button.SetAttribute("TextValue", button.Name.split("_")[0]);
			const connection = button.MouseButton1Click.Connect(() => {
				MainMenu.TogglePanel(panelName as PanelName);
			});

			MainMenu._buttonConnections.set(panelName as PanelName, connection);
		});

		/*Close Button on Panel*/
		PanelMap.forEach((panel, panelName) => {
			const closeButton = panel
				?.WaitForChild("Window", 1)
				?.WaitForChild("Close", 0.1)
				?.WaitForChild("ImageButton") as ImageButton;
			closeButton?.MouseButton1Click.Connect(() => {
				MainMenu.DisablePanel(panelName as PanelName);
			});
		});
	}

	/* Initialize Main Menu */
	private _initializeMainMenu() {
		PanelMap.forEach((panel, panelName) => {
			panel.Enabled = false;
		});
		GUI.HUD_Screen.Enabled = true;
	}

	/* Toggle Panel */
	public static TogglePanel(panelName: PanelName) {
		const panel = PanelMap.get(panelName);
		if (panel === undefined) return;
		if (panel.Enabled) {
			this.DisablePanel(panelName);
		} else {
			this.EnablePanel(panelName);
		}
	}

	/* Enable Panel */
	public static EnablePanel(panelName: PanelName) {
		const panel = PanelMap.get(panelName);
		if (panel) {
			this._disableAllPanels();
			panel.Enabled = true;
		}
	}

	/* Disable Panel */
	public static DisablePanel(panelName: PanelName) {
		const panel = PanelMap.get(panelName);
		if (panel) {
			panel.Enabled = false;
		}
	}

	/* Disable All Panels */
	private static _disableAllPanels() {
		PanelMap.forEach((panel, panelName) => {
			panel.Enabled = false;
		});
	}
}
