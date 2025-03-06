/* Shared Imports */
import Logger from "shared/Utility/Logger";

/* Epic UI Imports */
import InfoFrame from "shared/Epic UI/Classes/InfoFrame";
import ProgressBar from "shared/Epic UI/Classes/ProgressBar";

/* Skill Imports */
import { SkillId } from "shared/_IDs/IDs_Skill";
import SkillBar from "shared/Epic UI/Classes/SkillBar";
import SkillPanel from "client/ScreenGUIs/SkillPanel";
import { GetSkillSlotMap } from "shared/_Functions/DataFunctions";
import {
	SkillBarInstance,
	InfoFrameInstance,
	ResourceBarInstanceMap,
	Skills_Screen,
} from "client/ScreenGUIs/GUI_Index";

/* Remotes */
import { Payloads, Remotes } from "shared/net/Remotes";

export default class ClientUIController {
	/* Singleton Instance*/
	private static _instance: ClientUIController;

	/* Skill UI*/
	private static SkillBar = new SkillBar(SkillBarInstance);
	private static SkillPanel = new SkillPanel(Skills_Screen);

	/* Info Frame */
	private static InfoFrame = new InfoFrame(InfoFrameInstance);

	/* Resource Bar Map */
	private static ResourceBarMap = new Map<string, ProgressBar>();

	// Connections
	/* Player Data Loaded */
	private static _playerDataLoaded: RBXScriptConnection | undefined;
	/* Resource Updated */
	private static _resourceUpdated: RBXScriptConnection | undefined;
	/* Quest Reward */
	private static _questReward: RBXScriptConnection | undefined;
	/* Quest Accepted */
	private static _questAccepted: RBXScriptConnection | undefined;
	/* Progression Stats */
	private static _progressionStats: RBXScriptConnection | undefined;

	// Constructor
	private constructor() {
		Logger.Log(script, "Client UI Controller Singleton: Instantiated");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new ClientUIController();
			this._initializeResourceBars();
			this._initializeListeners();
			Remotes.Client.Get("PlayerUIReady").SendToServer();
		}
	}

	/* Initialize Resource Bars */
	private static _initializeResourceBars() {
		ResourceBarInstanceMap.forEach((resourceBarInstance, resourceId) => {
			const progressBar = new ProgressBar(resourceBarInstance);
			this.ResourceBarMap.set(resourceId, progressBar);
		});
	}

	/* Update Resource Bar */
	public static UpdateResourceBar(payload: Payloads["PlayerResourceData"]) {
		const progressBar = this.ResourceBarMap.get(payload[0]);
		if (progressBar) {
			progressBar.Update(payload);
		}
	}

	public static OnUnassignSkillSlot(slot: number) {
		//this.SkillBar
	}

	/* Initialize Listeners */
	private static _initializeListeners() {
		/* Player Data Loaded*/
		this._playerDataLoaded?.Disconnect();
		this._playerDataLoaded = Remotes.Client.Get("SendPlayerData").Connect((playerData) => {
			const skillSlotMap = GetSkillSlotMap(playerData);
			this.SkillBar.LoadSkills(skillSlotMap as Map<number, SkillId>);
			this.InfoFrame.Update(playerData);
		});

		/* Resource Updated */
		this._resourceUpdated?.Disconnect();
		this._resourceUpdated = Remotes.Client.Get("SendResourceData").Connect((resource) => {
			Logger.Log(script, "Resource Updated", resource);
		});

		/* Progression Stats */
		this._progressionStats?.Disconnect();
		this._progressionStats = Remotes.Client.Get("SendProgressionStats").Connect((progressionStats) => {
			this.InfoFrame.OnProgressionStats(progressionStats);
			const resource = this.ResourceBarMap.get("Experience");
			Logger.Log(script, "Experience Resource", resource as unknown as string);
		});
	}
}
