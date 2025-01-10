import { StorageManager } from "shared/_References/Managers/StorageManager";

export const UITemplates = {
	getSkillBarTemplate: () => StorageManager.CloneFromStorage("SkillBar_Template"),
	getSkillButtonTemplate: () => StorageManager.CloneFromStorage("SkillButton_Template"),
	getCharacterFrameTemplate: () => StorageManager.CloneFromStorage("CharacterFrame_Template"),
	getDialogFrameTemplate: () => StorageManager.CloneFromStorage("DialogFrame_Template"),
};
