import IQuestPanel from "shared/Epic UI/Interfaces/IQuestPanel";
import Quest from "shared/_Classes/Quest";
import { TQuestPanel } from "shared/Epic UI/Types/TQuestPanel";
import Logger from "shared/Utility/Logger";
import { QuestId } from "shared/_IDs/IDs_Quest";
import StorageManager from "shared/Storage Manager/StorageManager";
import { TQuestItemFrame } from "shared/Epic UI/Types/TQuestItem";
import { QuestToServer } from "client/net/_Client_Events";

export default class QuestPanel implements IQuestPanel {
	QuestMap: Map<QuestId, Quest>;
	_Instance: TQuestPanel;

	private _scrollingFrame: ScrollingFrame;
	private _titleFrame: Frame;
	private _questItemTemplate = StorageManager.CloneFromStorage("QuestItem_Template") as TQuestItemFrame;

	constructor(questPanel: TQuestPanel) {
		this._Instance = questPanel;
		this.QuestMap = new Map<QuestId, Quest>();
		this._scrollingFrame = this._Instance.EUIReference.ScrollingFrameReference?.Value as ScrollingFrame;
		this._titleFrame = this._Instance.EUIReference.TitleReference?.Value as Frame;

		assert(this._scrollingFrame, "ScrollingFrame not found");
		assert(this._titleFrame, "TitleFrame not found");
		assert(this._questItemTemplate, "QuestItemTemplate not found");

		Logger.Log(script, "Quest Panel: Instantiated", this.QuestMap as unknown as string);
	}

	AddQuest(quest: Quest): void {
		Logger.Log(script, "Quest Panel: Add Quest");
		if (this.QuestMap.get(quest.QuestDeffinition.QuestId)) {
			Logger.Log(script, "Quest Panel: Quest Already Exists");
			return;
		}
		const questId = quest.QuestDeffinition.QuestId;

		/*Add Quest to QuestMap*/
		this.QuestMap.set(questId, quest);

		/*Parent Quest to ScrollingFrame*/
		quest._Instance.Parent = this._scrollingFrame;
	}

	RemoveQuest(questId: QuestId): void {
		this.QuestMap.delete(questId);
	}

	GetQuest(questId: QuestId): Quest | undefined {
		return this.QuestMap.get(questId);
	}

	LoadQuests(quests: Quest[]): void {
		quests.forEach((quest) => {
			this.AddQuest(quest);
		});
	}

	OnQuestAccepted(questId: QuestId): void {
		const quest = this.QuestMap.get(questId);
		if (quest) {
			Logger.Log(script, "Quest Panel: Quest Accepted");
		}
	}

	OnQuestCompleted(questId: QuestId): void {
		const quest = this.QuestMap.get(questId);
		this.QuestMap.delete(questId);
		if (quest) {
			Logger.Log(script, "Quest Panel: Quest Completed");
			quest.Destroy();
		}
	}

	OnQuestUpdated(questId: QuestId): void {
		const quest = this.QuestMap.get(questId);
		if (quest) {
			quest.SetProgress(quest.QuestDeffinition.QuestProgress + 1);
		}
	}
}
