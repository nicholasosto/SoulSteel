import { QuestId, QuestRequirementId, QuestRewardId } from "shared/_IDs/IDs_Quest";
import StorageManager from "shared/Storage/StorageManager";
import { TQuestItemFrame } from "shared/User Interface Classes/Types/TQuestItem";
import GetQuestDeffinition from "shared/_Definitions/QuestDeffinitions";
import { TQuestDeffinition } from "shared/_Types/TQuestDeffinition";
import IQuest from "shared/_Interfaces/IQuest";
import Logger from "shared/Utility/Logger";

export default class Quest implements IQuest {
	/* Instance */
	_Instance: TQuestItemFrame;
	QuestDeffinition: TQuestDeffinition;

	/* Button */
	RewardButton: TextButton;

	private _template: TQuestItemFrame = StorageManager.CloneFromStorage("QuestItem_Template") as TQuestItemFrame;

	constructor(questId: QuestId) {
		this._Instance = this._template.Clone();
		this.RewardButton = this._Instance.EUIReference.RewardButton.Value as TextButton;
		this.QuestDeffinition = GetQuestDeffinition(questId) as TQuestDeffinition;
		assert(this.RewardButton, "RewardButton not found");
	}

	public SetProgress(progress: number) {
		this.QuestDeffinition.QuestProgress = progress;
	}

	public AddReward(rewardId: QuestRewardId, amount: number) {
		this.QuestDeffinition.QuestRewards.set(rewardId, amount);
	}

	public Destroy() {
		Logger.Log(script, "Quest: Destroyed");
		this._Instance.Destroy();
	}
}
