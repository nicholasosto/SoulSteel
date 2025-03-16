import { Players } from "@rbxts/services";

/* Utility Imports */
import StorageManager from "shared/Storage/StorageManager";

/* Data Types */
import { TSkillBar } from "shared/User Interface Classes/Types/EpicIndex";

/* Class Imports */
import SkillBar from "shared/User Interface Classes/Classes/Panel Frames/SkillBar";
import InfoFrame from "shared/User Interface Classes/Classes/Assemblies/InfoFrame";
import { TInfoFrame } from "shared/User Interface Classes/Types/EpicIndex";

/* Player GUI */
const PlayerGUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

/* Screen GUI */
const HUDTemplate = StorageManager.CloneFromStorage("HUD_ScreenGUI") as ScreenGui;

export default class HudScreen {
	public screenGUI: ScreenGui = HUDTemplate.Clone() as ScreenGui;
	public _infoFrame: InfoFrame = new InfoFrame(this.screenGUI.WaitForChild("Player_InfoFrame") as TInfoFrame);
	public _targetFrame: InfoFrame = new InfoFrame(this.screenGUI.WaitForChild("Target_InfoFrame") as TInfoFrame);
	public _skillBar: SkillBar = new SkillBar(this.screenGUI.WaitForChild("SkillBar_Frame") as TSkillBar);
	constructor() {
		this.screenGUI.Parent = PlayerGUI;
		warn("HudScreen: Instantiated");
	}

	public Destroy() {
		this.screenGUI.Destroy();
	}
}
