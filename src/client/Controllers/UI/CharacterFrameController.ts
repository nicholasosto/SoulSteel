import { CharacterFrameInstance, ResourceBarInstanceMap } from "client/_Helpers/GUI_Index";
import { ResourceId } from "shared/_IDs/IDs_Resource";
import InfoFrame from "shared/Epic UI/Classes/InfoFrame";
import ProgressBar from "shared/Epic UI/Classes/ProgressBar";
import { Remotes } from "shared/net/Remotes";
import Logger from "shared/Utility/Logger";

/* Character Frame Controller */
export default class CharacterFrameController {
	private static _instance: CharacterFrameController;
	private static _resourceBarMap: Map<ResourceId, ProgressBar> = ResourceBarInstanceMap;

	/* Classes */
	private static _characterFrame: InfoFrame;

	/* Remotes - Outbound */

	/* Connections */
	private static _playerDataConnection: RBXScriptConnection | undefined;
	private static _resourceBarConnection: RBXScriptConnection | undefined;
	private static _experienceBarConnection: RBXScriptConnection | undefined;
	private static _progressionStatsConnection: RBXScriptConnection | undefined;

	/* Constructor */
	private constructor() {
		CharacterFrameController._characterFrame = new InfoFrame(CharacterFrameInstance);
		CharacterFrameController._initializeListeners();
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new CharacterFrameController();
		}
	}

	/* Initialize Listeners */
	private static _initializeListeners() {
		/* Player Data Connection */
		this._playerDataConnection?.Disconnect();
		this._playerDataConnection = Remotes.Client.Get("SendPlayerData").Connect((playerData) => {
			this._characterFrame.Update(playerData);
		});

		/* Resource Bar Connection */
		this._resourceBarConnection?.Disconnect();
		this._resourceBarConnection = Remotes.Client.Get("SendResourceData").Connect((payload) => {
			const resourceId = payload[0] as ResourceId;
			const current = payload[1] as number;
			const max = payload[2] as number;
			this._updateResourceBar(resourceId, current, max);
		});

		/* Experience Bar Connection */
		this._experienceBarConnection?.Disconnect();
		this._experienceBarConnection = Remotes.Client.Get("SendProgressionStats").Connect((progressionData) => {
			const currentExperience = progressionData.Experience;
			const maxExperience = progressionData.ExperienceToNextLevel;
			const resourceId = "Experience" as ResourceId;
			this._updateResourceBar(resourceId, currentExperience, maxExperience);
		});

		/* Progression Stats Connection */
		this._progressionStatsConnection?.Disconnect();
		this._progressionStatsConnection = Remotes.Client.Get("SendProgressionStats").Connect((progressionData) => {
			this._characterFrame.OnProgressionStats(progressionData);
		});

		Remotes.Client.Get("StateChanged").Connect((state) => {
			if (state === "players") {
				warn("PPSDLPSLDPSLDPSLDPLDPSLDLDPSLDPSLD");
			}
			Logger.Log("CharacterFrameController", "State Changed: " + state);
		});
	}

	/* Update Resource Bar */
	private static _updateResourceBar(resourceId: ResourceId, current: number, max: number) {
		const progressBar = this._resourceBarMap.get(resourceId);
		if (progressBar) {
			progressBar.Update([resourceId, current, max]);
		}
	}
}
