import IQuest from "shared/_Interfaces/IQuest";
import { QuestId, QuestRequirementId } from "shared/_IDs/IDs_Quest";
import { TQuestDeffinition } from "shared/_Types/TQuestDeffinition";

const QuestDeffinitionMap = new Map<QuestId, TQuestDeffinition>();

QuestDeffinitionMap.set("Quest1", {
	QuestId: "Quest1",
	QuestRequirementId: "QuestRequirement1",
	QuestName: "Quest Name 1",
	QuestDescription: "QuestDescription goes here",
	QuestProgress: 0,
	QuestMaxProgress: 10,
	QuestRewards: new Map(),
});

QuestDeffinitionMap.set("Quest2", {
	QuestId: "Quest2",
	QuestRequirementId: "QuestRequirement2",
	QuestName: "Quest Name 2",
	QuestDescription: "QuestDescription goes here",
	QuestProgress: 0,
	QuestMaxProgress: 10,
	QuestRewards: new Map(),
});

QuestDeffinitionMap.set("Quest3", {
	QuestId: "Quest3",
	QuestRequirementId: "QuestRequirement3",
	QuestName: "Quest Name 3",
	QuestDescription: "QuestDescription goes here",
	QuestProgress: 0,
	QuestMaxProgress: 10,
	QuestRewards: new Map(),
});

export default function GetQuestDeffinition(questId: QuestId): TQuestDeffinition | undefined {
	return QuestDeffinitionMap.get(questId);
}
