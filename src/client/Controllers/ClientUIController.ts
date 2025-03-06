/* Shared Imports */
import Logger from "shared/Utility/Logger";

/* Skill Imports */
import { SkillId } from "shared/_IDs/IDs_Skill";
import SkillBar from "shared/Epic UI/Classes/SkillBar";
import { GetSkillSlotMap } from "shared/_Functions/DataFunctions";
import { SkillBarInstance } from "client/ScreenGUIs/GUI_Index";

/* Remotes */
import { Remotes } from "shared/net/Remotes";

export default class ClientUIController {
	/* Singleton Instance*/
	private static _instance: ClientUIController;

	/* Skill UI*/
	private static SkillBar = new SkillBar(SkillBarInstance);

	/* Connections */
	private static _playerDataLoaded: RBXScriptConnection | undefined;

	/* Constructor */
	private constructor() {
		Logger.Log(script, "Client UI Controller Singleton: Instantiated");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new ClientUIController();
			this._initializeListeners();
			Remotes.Client.Get("PlayerUIReady").SendToServer();
		}
	}

	/* Initialize Listeners */
	private static _initializeListeners() {
		/* Player Data Loaded*/
		this._playerDataLoaded?.Disconnect();
		this._playerDataLoaded = Remotes.Client.Get("SendPlayerData").Connect(([playerData]) => {
			const skillSlotMap = GetSkillSlotMap(playerData);
			this.SkillBar.LoadSkills(skillSlotMap as Map<number, SkillId>);
		});
	}
}
