import Logger from "shared/Utility/Logger";
import DefinitionsManager from "shared/Storage/DefinitionsManager";
import { DragableItem } from "shared/User Interface Classes/Classes/DragableItem";

/* Skill Panel Type */
export type TSkillPanel = ScreenGui & {
	Window: Frame & {
		Content: Frame & {
			Body: Frame & {
				ScrollingFrame: ScrollingFrame;
			};
		};
	};
};

/* Skill Panel Class */
export default class SkillPanel {
	private _instance: TSkillPanel;
	private _skillDefinitions = DefinitionsManager.SkillDefinitions;
	constructor(screenGui: TSkillPanel) {
		this._instance = screenGui;
		Logger.Log(script, "Skill Panel: Instantiated", this._skillDefinitions as unknown as string);
		this._loadSkillItems();
	}
	private _loadSkillItems() {
		for (const [skillId, skillDefinition] of pairs(this._skillDefinitions)) {
			const skillItem = new DragableItem(this._instance.Window.Content.Body.ScrollingFrame, skillId);
			//Logger.Log(script, "Skill Panel: Loading Skill Item", skillId, skillDefinition.displayName);
		}
	}
}
