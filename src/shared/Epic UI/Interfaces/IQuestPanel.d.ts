import { QuestId } from "shared/_IDs/IDs_Quest";
import IQuest from "shared/_Interfaces/IQuest";
import { TQuestPanel } from "shared/Epic UI/Types/TQuestPanel";

export default interface IQuestPanel {
	QuestMap: Map<QuestId, IQuest>;
	_Instance: TQuestPanel;
	AddQuest(quest: IQuest): void;
	RemoveQuest(questId: QuestId): void;
	LoadQuests(quests: IQuest[]): void;
	OnQuestAccepted(questId: QuestId): void;
	OnQuestCompleted(questId: QuestId): void;
	OnQuestUpdated(questId: QuestId): void;
}
