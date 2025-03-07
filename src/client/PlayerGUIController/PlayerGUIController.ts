import { PlayerGUI, HUD_Screen, SkillBarInstance } from "client/ScreenGUIs/GUI_Index";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import { Remotes } from "shared/net/Remotes";
import Logger from "shared/Utility/Logger";

import SkillBarUIComponent from "./Classes/SkillBarUIComponent";
import { SkillId } from "shared/_IDs/IDs_Skill";

/*Player GUI Controller */
export default class PlayerGUIController {
	private static _instance: PlayerGUIController;

	/* Remotes */
	private static _PlayerUIReady = Remotes.Client.Get("PlayerUIReady");
	private static _PlayerDataSent = Remotes.Client.Get("SendPlayerData");
	private static _SkillBarUpdate = Remotes.Client.Get("SkillBarUpdate");
	private static _AssignSkill = Remotes.Client.Get("AssignSkill");

	/* Connections */
	private static _connectionPlayerDataSent: RBXScriptConnection;
	private static _connectionSkillBarUpdate: RBXScriptConnection;

	/* Components */
	private static _skillBarUIComponent: SkillBarUIComponent = new SkillBarUIComponent(SkillBarInstance);

	/* Constructor */
	constructor() {
		PlayerGUIController._instance = this;

		/* Initialize Event Listeners */
		PlayerGUIController._initializeEventListeners();

		/* Fire Player UI Ready */
		PlayerGUIController._PlayerUIReady.SendToServer();
		print("Player UI Ready Sent - sending assignskill");
		PlayerGUIController._AssignSkill.SendToServer([1, "BasicMelee"]);
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new PlayerGUIController();
			Logger.Log("PlayerGUIController", script.Name + "Initialized");
		}
	}

	/* Initialize Event Listeners */
	private static _initializeEventListeners() {
		/* Player Data Sent */
		PlayerGUIController._connectionPlayerDataSent?.Disconnect();
		PlayerGUIController._connectionPlayerDataSent = this._PlayerDataSent.Connect((data: IPlayerData) => {
			this._skillBarUIComponent.Update(data);
		});
	}
}

function GetSkillMapFromPlayerData(playerData: IPlayerData) {
	const skillMap = new Map<number, SkillId>();
	const skillData = playerData.Skills.assignedSlots;
	for (let i = 0; i < skillData.size(); i++) {
		skillMap.set(i, skillData[i] as SkillId);
	}

	return skillMap;
}
