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

/* Quest Imports */
import QuestPanel from "client/ScreenGUIs/QuestPanel";
import Quest from "shared/_Classes/Quest";

/* Client Imports */
import {
	GameCycleEvents,
	CharacterEvent,
	QuestToServer,
	QuestRewarded,
	QuestAssigned,
	OnProgressionStats,
} from "client/net/_Client_Events";
import {
	InfoFrameInstance,
	SkillBarInstance,
	ResourceBarInstanceMap,
	QuestPanelGUI,
	Skills_Screen,
} from "client/ScreenGUIs/GUI_Index";
import { QuestId } from "shared/_IDs/IDs_Quest";
import QuestDeffinitions from "shared/_Definitions/QuestDeffinitions";

export default class ClientUIController {
	/* Singleton Instance*/
	private static _instance: ClientUIController;

	/* Quest Panel */
	private static QuestPanel = new QuestPanel(QuestPanelGUI);

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

	public static OnUnassignSkillSlot(slot: number) {
		//this.SkillBar
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

		/* Quest Completed */
		this._questReward?.Disconnect();
		this._questReward = QuestRewarded.Connect((questId) => {
			this.QuestPanel.OnQuestCompleted(questId);
		});

		/* Quest Accepted */
		this._questAccepted?.Disconnect();
		this._questAccepted = QuestAssigned.Connect((questId) => {
			this.QuestPanel.OnQuestAccepted(questId);
			const _rewardButton = this.QuestPanel.GetQuest(questId)?.RewardButton;
			if (_rewardButton) {
				_rewardButton.MouseButton1Click.Connect(() => {
					QuestToServer.SendQuestComplete(questId);
				});
			}
		});

		/* Progression Stats */
		this._progressionStats?.Disconnect();
		this._progressionStats = OnProgressionStats.Connect((progressionStats) => {
			this.InfoFrame.OnProgressionStats(progressionStats);
			const resource = this.ResourceBarMap.get("Experience");
			assert(resource, "Experience Resource Bar is nil");
			resource.Update({
				resourceId: "Experience",
				current: progressionStats.Experience,
				max: progressionStats.ExperienceToNextLevel,
			});
		});
	}
}
