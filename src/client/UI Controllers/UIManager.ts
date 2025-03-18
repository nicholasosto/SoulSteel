// File: Modules/UIManager.ts
import { Players } from "@rbxts/services";
import HudScreen from "shared/User Interface Classes/Classes/Screens/HudScreen";
import DeveloperConsole from "shared/User Interface Classes/Classes/Screens/DeveloperConsole";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import * as Payload from "shared/net/RemoteIndex";
import EquipmentPanel from "shared/User Interface Classes/Classes/Screens/EquipmentPanel";
import GameScreenBase from "shared/User Interface Classes/Classes/Screens/GameScreenBase";
import SkillsPanel from "shared/User Interface Classes/Classes/Screens/SkillsPanel";
/**
 * UIManager.ts
 * Manages all UI elements and updates
 * Called from ClientNetManager
 * to handle UI updates and interactions
 */

const PanelNames = {
	Equipment: "Equipment",
	Inventory: "Inventory",
	Skills: "Skills",
	Teleport: "Teleport",
	Settings: "Settings",
	Character: "Character",
};

export default class UIManager {
	private static _instance: UIManager;

	/*Screen Instances */

	private static _LocalPlayer = Players.LocalPlayer;
	private static _PlayerGui = this._LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
	private static _PlayerHud: HudScreen | undefined;
	private static _menuButtons = new Map<string, GuiButton>();
	private static _panelMap = new Map<string, GameScreenBase>();
	private static _DeveloperConsole: DeveloperConsole | undefined;
	private static _EquipmentPanel: EquipmentPanel | undefined;
	/* Constructor */
	private constructor() {}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new UIManager();
			this._InitializePanels();
		}
		return this._instance;
	}

	private static _InitializePanels() {
		/* Developer Console */
		this._DeveloperConsole = new DeveloperConsole(this._PlayerGui.WaitForChild("DeveloperHUD") as ScreenGui);

		/*Panels in Folder */

		const PanelFolder = this._PlayerGui.WaitForChild("GamePanels") as Folder;
		/* Panel Map */
		this._panelMap.set("Equipment", new EquipmentPanel(PanelFolder.WaitForChild("EquipmentPanel") as ScreenGui));
		this._panelMap.set("Inventory", new GameScreenBase(PanelFolder.WaitForChild("InventoryPanel") as ScreenGui));
		this._panelMap.set("Skills", new SkillsPanel(PanelFolder.WaitForChild("SkillsPanel") as ScreenGui));

		/* Hud Screen */
		this._PlayerHud = new HudScreen(PanelFolder.WaitForChild("PlayerHud") as ScreenGui);

		/* Buttons */
		this._menuButtons.set("Equipment", this._PlayerHud._menuBar.WaitForChild("Equipment") as GuiButton);
		this._menuButtons.set("Skills", this._PlayerHud._menuBar.WaitForChild("Equipment") as GuiButton);

		this._menuButtons.forEach((button, name) => {
			button.MouseButton1Click.Connect(() => {
				this._panelMap.get(name)?.Toggle();
			});
		});
	}

	/* Player Data Loaded */
	public static OnPlayerDataLoaded(playerData: IPlayerData) {
		print("Player Data Loaded:", playerData);
		this._DeveloperConsole?.setState("PlayerData", "GUI_Selected");
	}

	/* Update Skill Bar */
	public static UpdateSkillBar(newSlotMap: Payload.PSkillSlotMap) {
		this._PlayerHud?._skillBar.Update(newSlotMap);
	}

	/* Update Character Frame */
	public static UpdateInfoFrame(payload: Payload.PInfoFrame) {
		print("Updating InfoFrame with payload:", payload);
		this._PlayerHud?._infoFrame.Update(payload);
	}
}
