import { SkillBarInstance } from "client/_Helpers/GUI_Index";
import SkillBarComponent from "client/GUI_ComponentClasses/Frames/SkillBarComponent";
import Logger from "shared/Utility/Logger";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import { Remotes } from "shared/net/Remotes";

/*Controller Events*/

export default class SkillBarController {
	/* Instance */
	private static _instance: SkillBarController;
	/* Skill Bar */
	private static _skillBar: SkillBarComponent = new SkillBarComponent(SkillBarInstance);

	/* Remotes - Outbound */
	private static _AssignSkill = Remotes.Client.Get("AssignSkill");

	/* Remotes - Inbound */
	private static _PlayerDataSent = Remotes.Client.Get("SendPlayerData");
	private static _SkillBarUpdate = Remotes.Client.Get("SkillBarUpdate");

	/* Connections */
	private static _connectionPlayerDataSent: RBXScriptConnection;
	private static _connectionSkillBarUpdate: RBXScriptConnection;

	/* Constructor */
	private constructor() {
		Logger.Log("SkillBarController", "CONSTRUCTOR()");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new SkillBarController();
			this._initializeListeners();
			Logger.Log("SkillBarController", "Initialized");
		}
	}

	/* Initialize Listeners */
	private static _initializeListeners() {
		/* #S2CRemote - Assign Skill */
		this._connectionPlayerDataSent?.Disconnect();
		this._connectionPlayerDataSent = this._PlayerDataSent.Connect((data: IPlayerData) => {
			this._skillBar.Initialize(data);
		});

		/* #S2CRemote - Skill Bar Update */
		this._connectionSkillBarUpdate?.Disconnect();
		this._connectionSkillBarUpdate = this._SkillBarUpdate.Connect((skillSlotMap) => {
			this._skillBar.Update(skillSlotMap);
		});
	}
}
