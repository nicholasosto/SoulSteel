import { QuestId } from "shared/_IDs/IDs_Quest";
import IQuest from "shared/_Interfaces/IQuest";
import { TQuestPanel } from "shared/Epic UI/Types/TQuestPanel";

export default interface IQuestPanel {
	QuestMap: Map<QuestId, IQuest>;
	_Instance: TQuestPanel;
	LoadQuests(quests: QuestId[]): void;
	OnQuestAccepted(questId: QuestId): void;
	OnQuestCompleted(questId: QuestId): void;
	OnQuestUpdated(questId: QuestId): void;
}
