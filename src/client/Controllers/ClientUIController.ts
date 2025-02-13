/* Shared Imports */
import Logger from "shared/Utility/Logger";
import InfoFrame from "shared/Epic UI/InfoFrame";
import { SkillId } from "shared/_Types/SkillTypes";
import ProgressBar from "shared/Epic UI/Progress Bar/ProgressBar";
import SkillBar from "shared/Epic UI/SkillUI/Skill Bar/SkillBar";
import { GetSkillSlotMap } from "shared/_Functions/DataFunctions";

/* Client Imports */
import { GameCycleEvents, CharacterEvent } from "client/net/_Client_Events";
import { InfoFrameInstance, SkillBarInstance, ResourceBarInstanceMap } from "client/ScreenGUIs/GUI_Index";

export default class ClientUIController {
	/* Singleton Instance*/
	private static _instance: ClientUIController;

	/* Skill Bar */
	private static SkillBar = new SkillBar(SkillBarInstance);

	/* Info Frame */
	private static InfoFrame = new InfoFrame(InfoFrameInstance);

	/* Resource Bar Map */
	private static ResourceBarMap = new Map<string, ProgressBar>();

	// Connections
	/* Player Data Loaded */
	private static _playerDataLoaded: RBXScriptConnection | undefined;

	/* Resource Updated */
	private static _resourceUpdated: RBXScriptConnection | undefined;

	// Constructor
	private constructor() {
		Logger.Log(script, "Client UI Controller Singleton: Instantiated");
	}

	public static Start() {
		if (this._instance === undefined) {
			this._instance = new ClientUIController();
			this._initializeResourceBars();
			this._initializeListeners();
			GameCycleEvents.PlayerUIReady.SendToServer();
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
	public static UpdateResourceBar(resourceId: string, resouce: { resourceId: string; current: number; max: number }) {
		const progressBar = this.ResourceBarMap.get(resourceId);
		if (progressBar) {
			progressBar.Update(resouce);
		}
	}

	/* Initialize Listeners */
	private static _initializeListeners() {
		/* Player Data Loaded*/
		this._playerDataLoaded?.Disconnect();
		this._playerDataLoaded = GameCycleEvents.PlayerDataLoaded.Connect((playerData) => {
			const skillSlotMap = GetSkillSlotMap(playerData);
			this.SkillBar.LoadSkills(skillSlotMap as Map<number, SkillId>);
			this.InfoFrame.Update(playerData);
		});

		/* Resource Updated */
		this._resourceUpdated?.Disconnect();
		this._resourceUpdated = CharacterEvent.ResourceUpdated.Connect((resource) => {
			this.UpdateResourceBar(resource.resourceId, resource);
		});
	}
}
