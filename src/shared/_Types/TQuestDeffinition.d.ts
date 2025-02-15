import { QuestId, QuestRequirementId } from "shared/_IDs/IDs_Quest";

type TQuestDeffinition = {
	QuestId: QuestId;
	QuestRequirementId: QuestRequirementId;
	QuestName: string;
	QuestDescription: string;
	QuestProgress: number;
	QuestMaxProgress: number;
	QuestRewards: Map<string, number>;
};
