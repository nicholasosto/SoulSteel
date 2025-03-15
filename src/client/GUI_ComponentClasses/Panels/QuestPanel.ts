import IQuestPanel from "shared/User Interface Classes/Interfaces/IQuestPanel";
import { TQuestPanel } from "shared/User Interface Classes/Types/TQuestPanel";
import Quest from "shared/_Classes/Quest";
import { QuestId } from "shared/_IDs/IDs_Quest";
import Logger from "shared/Utility/Logger";
import StorageManager from "shared/Storage/StorageManager";


import { TQuestItemFrame } from "shared/User Interface Classes/Types/TQuestItem";

export default class QuestPanel implements IQuestPanel {
	QuestMap: Map<QuestId, Quest> = new Map();
	_Instance: TQuestPanel;

	private _scrollingFrame: ScrollingFrame;
	private _titleFrame: Frame;
	private _questItemTemplate = StorageManager.CloneFromStorage("QuestItem_Template") as TQuestItemFrame;

	constructor(questPanel: TQuestPanel) {
		this._Instance = questPanel;
		this._scrollingFrame = this._Instance.EUIReference.ScrollingFrameReference?.Value as ScrollingFrame;
		this._titleFrame = this._Instance.EUIReference.TitleReference?.Value as Frame;

		assert(this._scrollingFrame, "ScrollingFrame not found");
		assert(this._titleFrame, "TitleFrame not found");
		assert(this._questItemTemplate, "QuestItemTemplate not found");

		Logger.Log(script, "Quest Panel: Instantiated", this.QuestMap as unknown as string);
	}

	private _AddQuest(questId: QuestId): void {
		const quest = this.QuestMap.get(questId);
		Logger.Log(script, "Quest Panel: Quest Added", questId);
		if (this.QuestMap.get(questId) !== undefined) {
			Logger.Log(script, "Quest Panel: Quest Already Accepted", this.QuestMap.get(questId) as unknown as string);
			return;
		} else {
			Logger.Log(script, "Quest Panel: Quest Added");
			const newQuest = new Quest(questId);
			this.QuestMap.set(questId, newQuest);
			newQuest._Instance.Parent = this._scrollingFrame;
		}
	}

	private _RemoveQuest(questId: QuestId): void {
		const quest = this.QuestMap.get(questId);
		if (quest) {
			this.QuestMap.delete(questId);
			quest._Instance.Destroy();
		} else {
			Logger.Log(script, "Quest Panel: Quest Not Found");
		}
	}

	GetQuest(questId: QuestId): Quest | undefined {
		return this.QuestMap.get(questId);
	}

	LoadQuests(quests: QuestId[]): void {
		quests.forEach((quest) => {
			this._AddQuest(quest);
		});
	}

	OnQuestAccepted(questId: QuestId): void {
		this._AddQuest(questId);
	}

	OnQuestCompleted(questId: QuestId): void {
		this._RemoveQuest(questId);
	}

	OnQuestUpdated(questId: QuestId): void {
		const quest = this.QuestMap.get(questId);
		if (quest) {
			quest.SetProgress(quest.QuestDeffinition.QuestProgress + 1);
		}
	}
}
