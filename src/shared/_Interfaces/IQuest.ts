import { QuestId, QuestRequirementId, QuestRewardId } from "shared/_IDs/IDs_Quest";
import { TQuestDeffinition } from "shared/_Types/TQuestDeffinition";

export default interface IQuest {
	/* Instance */
	_Instance: Instance;
	QuestDeffinition: TQuestDeffinition;
	RewardButton: TextButton;

	/* Status */
	SetProgress(progress: number): void;
	AddReward(rewardId: QuestRewardId, amount: number): void;
}
