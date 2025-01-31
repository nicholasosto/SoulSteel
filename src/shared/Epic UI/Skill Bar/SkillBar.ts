/* Roblox Services */
import { Players } from "@rbxts/services";

/* Interfaces */
import { TSkillBar } from "shared/Epic UI/Skill Bar/TSkillBar";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

/* Modules */
import { SkillButton, SkillButtonBase } from "./SkillButton";

/* Utility */
import Logger from "shared/Utility/Logger";
import { StorageManager } from "shared/Storage Manager/StorageManager";
import { getSkillDefinition } from "shared/Skills/Data/SkillHelpers";

/* References */
const playerHUD = Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("HUD");

/* Main Class: SkillBar */
export default class SkillBar {
	// Instance
	private _instance: TSkillBar = StorageManager.CloneFromStorage("SkillBar_Template") as TSkillBar;

	// Skill Bar Slots
	private skillBarSlots: Map<number, Frame> = new Map();

	// Constructor
	constructor() {
		this._instance.Parent = playerHUD;
		Logger.Log(script, "Skill Bar Created");
	}

	// Public:  Assign Skill to Slot
	public AssignSkillToSlot(slot: number, skillId: SkillId) {
		const parentFrame = this.skillBarSlots.get(slot);
		const skillDeffinition = getSkillDefinition(skillId);
	}

	// Public:  Load Skills
	public LoadSkills(skillSlotMap: Map<number, SkillId>) {
		Logger.Log(script, "Load Skills", skillSlotMap as unknown as string);

		// Loop through the Skill Slot Map
		for (const [slot, skillId] of skillSlotMap) {
			this._createSkillButton(slot, skillId);
		}
	}

	// Private:  createSkillButton
	private _createSkillButton(slotNumber:number, skillId: SkillId) {
		let parent: Frame | undefined;
		switch (slotNumber) {
			case 1:
				parent = this._instance.Slot1;
				break;
			case 2:
				parent = this._instance.Slot2;
				break;
			case 3:
				parent = this._instance.Slot3;
				break;
			case 4:
				parent = this._instance.Slot4;
				break;
			case 5:
				parent = this._instance.Slot5;
				break;
			default:
				Logger.Log(script, "Invalid Slot Number");
				break;
		}
		if (parent) {
			const skillButton = new SkillButtonBase(skillId, parent);
			this.skillBarSlots.set(slotNumber, parent);
		}
	}
}
