import Logger from "shared/Utility/Logger";
import { Players } from "@rbxts/services";
import InfoFrame from "client/Controllers/UI Classes/InfoFrame";
import SkillBar from "shared/Epic UI/SkillUI/Skill Bar/SkillBar";
import { GetSkillSlotMap } from "shared/Data Interfaces/PlayerData";
import { GameCycleEvents, CharacterEvent } from "../net/_Client_Events";
import * as HUD from "client/ScreenGUIs/Hud";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import ProgressBar from "shared/Epic UI/Progress Bar/ProgressBar";

export default class ClientUIController {
	/* Singleton Instance*/
	private static _instance: ClientUIController;

	// UI Components
	/* Skill Bar */
	private static SkillBar = new SkillBar(HUD.SkillBarInstance);
	private static InfoFrame = new InfoFrame(HUD.CharacterInfoFrame);

	/* Resource Bar Map */
	private static ResourceBarMap = new Map<string, ProgressBar>();

	// Connections
	/* Player Data Loaded */
	private static _playerDataLoaded: RBXScriptConnection | undefined;

	/* Resource Updated */
	private static _resourceUpdated: RBXScriptConnection | undefined;

	// Constructor
	private constructor() {
		Logger.Log(script, "CONSTRUCTOR()");
	}

	public static Start() {
		if (this._instance === undefined) {
			this._instance = new ClientUIController();
			this._initializeResourceBars();
			this._initializeListeners();

			Logger.Log(script, "[UI Controller - PlayerUIReady] - Sending to Server");
			GameCycleEvents.PlayerUIReady.SendToServer();
		}
	}

	private static _initializeResourceBars() {
		HUD.ResourceBarInstanceMap.forEach((resourceBarInstance, resourceId) => {
			const progressBar = new ProgressBar(resourceBarInstance);
			this.ResourceBarMap.set(resourceId, progressBar);
		});
	}

	public static UpdateResourceBar(resourceId: string, resouce: { resourceId: string; current: number; max: number }) {
		const progressBar = this.ResourceBarMap.get(resourceId);
		if (progressBar) {
			progressBar.Update(resouce);
		}
	}

	private static _initializeListeners() {
		/* Player Data Loaded*/
		this._playerDataLoaded?.Disconnect();
		this._playerDataLoaded = GameCycleEvents.PlayerDataLoaded.Connect((playerData) => {
			const skillSlotMap = GetSkillSlotMap(playerData);
			Logger.Log(script, "[GameCycle - UI Controller] - PlayerDataLoaded", skillSlotMap as unknown as string);
			this.SkillBar.LoadSkills(skillSlotMap as Map<number, SkillId>);
			this.InfoFrame.Update(playerData);
		});

		/* Resource Updated */
		this._resourceUpdated?.Disconnect();
		this._resourceUpdated = CharacterEvent.ResourceUpdated.Connect((resource) => {
			Logger.Log(script, "[GameCycle - UI Controller] - ResourceUpdated", resource as unknown as string);
			this.UpdateResourceBar(resource.resourceId, resource);
		});
	}
}
