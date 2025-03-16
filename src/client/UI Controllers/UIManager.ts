// File: Modules/UIManager.ts
import { Players } from "@rbxts/services";
import HudScreen from "shared/User Interface Classes/Classes/Screens/HudScreen";
import * as Payload from "shared/net/RemoteIndex";

export default class UIManager {
	private static _instance: UIManager;

	/*Screen Instances */
	private static _HudScreen: HudScreen | undefined;

	private constructor() {}

	public static Start() {
		if (this._instance === undefined) {
			this._instance = new UIManager();
		}
		this.initialzeUI();
		return this._instance;
	}

	/* Initialize UI */
	private static initialzeUI() {
		this.ClearUI();
		this._initializeScreens();
	}

	/* Initialize Screens */
	private static _initializeScreens() {
		this._HudScreen = new HudScreen();
	}

	/* Update Skill Bar */
	public static UpdateSkillBar(newSlotMap: Payload.PSkillSlotMap) {
		this._HudScreen?._skillBar.Update(newSlotMap);
	}

	/* Update Character Frame */
	public static UpdateInfoFrame(payload: Payload.PInfoFrame) {
		print("Updating InfoFrame with payload:", payload);
		this._HudScreen?._infoFrame.Update(payload);
	}

	/* Clear UI */
	public static ClearUI() {
		this._HudScreen?.Destroy();
		this._HudScreen = undefined;
	}
}
