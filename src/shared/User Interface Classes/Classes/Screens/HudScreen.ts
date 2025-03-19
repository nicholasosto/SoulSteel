import { Players } from "@rbxts/services";

/* Utility Imports */
import StorageManager from "shared/Storage/StorageManager";

/* Data Types */
import { TSkillBar } from "shared/User Interface Classes/Types/EpicIndex";

/* Class Imports */
import SkillBar from "shared/User Interface Classes/Classes/Panel Frames/SkillBar";
//import InfoFrame from "shared/User Interface Classes/Classes/Assemblies/InfoFrame";
import { TInfoFrame } from "shared/User Interface Classes/Types/EpicIndex";

/* Player GUI */
const PlayerGUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

/* Screen GUI */

export default class HudScreen {
	public screenGUI: ScreenGui;
	//public _infoFrame: InfoFrame;
	//public _targetFrame: InfoFrame;
	public _skillBar: SkillBar;
	public _menuBar: Frame;

	constructor(screenGUI: ScreenGui) {
		this.screenGUI = screenGUI;

		//this._infoFrame = new InfoFrame(this.screenGUI.WaitForChild("Player_InfoFrame") as TInfoFrame);
		//this._targetFrame = new InfoFrame(this.screenGUI.WaitForChild("Target_InfoFrame") as TInfoFrame);
		this._skillBar = new SkillBar(this.screenGUI.WaitForChild("SkillBar_Frame") as TSkillBar);
		this._menuBar = this.screenGUI.WaitForChild("MenuButton_Frame") as Frame;
	}
}
