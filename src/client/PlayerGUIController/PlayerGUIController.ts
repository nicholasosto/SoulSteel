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
		PlayerGUIController._connectionPlayerDataSent = this._PlayerDataSent.Connect((data: [IPlayerData]) => {
			Logger.Log("PlayerGUIController", "Player Data Sent: " + data[0].Skills.assignedSlots);
			const skillMap = new Map<number, SkillId>();
			const skillData = data[0].Skills.assignedSlots;
			for (let i = 0; i < skillData.size(); i++) {
				skillMap.set(i, skillData[i] as SkillId);
			}

			this._skillBarUIComponent.Initialize(skillMap);
		});

		/* Skill Bar Update */
		PlayerGUIController._connectionSkillBarUpdate?.Disconnect();
		PlayerGUIController._connectionSkillBarUpdate = this._SkillBarUpdate.Connect(([data]) => {
			Logger.Log("PlayerGUIController", "Player UI Ready");
			this._skillBarUIComponent.Update(data);
		});
	}
}
