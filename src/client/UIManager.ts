// File: Modules/UIManager.ts
import { Players } from "@rbxts/services";
import HudScreen from "../shared/User Interface Classes/Classes/Screens/HudScreen";
import { SkillSlotMap } from "shared/_IDs/SkillIndex";
import { InfoFramePayload } from "shared/net/RemoteIndex";

export default class UIManager {
	private static _instance: UIManager;
	private static _playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

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
		/* Create UI Objects */
		warn("UI Manager: Initializing UI");
		// Initialize UI elements here
		this._HudScreen?.Destroy();
		print("Creating new HudScreen");
		this._HudScreen = new HudScreen();
	}
	public static UpdateSkillBar(newSlotMap: SkillSlotMap) {
		this._HudScreen?._skillBar.Update(newSlotMap);
	}
	public static UpdateInfoFrame(payload: InfoFramePayload) {
		print("Updating InfoFrame with payload:", payload);
		this._HudScreen?._infoFrame.Update(payload);
	}

	public static ClearUI() {
		this._HudScreen?.Destroy();
		this._HudScreen = undefined;
	}
}

