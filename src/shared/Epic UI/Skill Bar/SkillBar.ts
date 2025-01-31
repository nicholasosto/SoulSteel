
/* Roblox Services */
import { Players } from "@rbxts/services";

/* Interfaces */
import { TSkillBar } from "shared/Epic UI/Skill Bar/TSkillBar";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
//import { SkillButton } from "./SkillButton";

/* Utility */
import Logger from "shared/Utility/Logger";
import { StorageManager } from "shared/Storage Manager/StorageManager";

/* Main Class: SkillBar */
export default class SkillBar {
	// Instance
	private skillBarFrame: TSkillBar = StorageManager.CloneFromStorage("SkillBar_Template") as TSkillBar;
	private player = Players.LocalPlayer;
	private HUD = this.player.WaitForChild("PlayerGui").WaitForChild("HUD");

	private skillBarSlots: Map<number, Frame> = new Map();

	constructor() {
		this.skillBarFrame.Parent = this.HUD;
		this.skillBarSlots.set(1, this.skillBarFrame.Slot1);
		this.skillBarSlots.set(2, this.skillBarFrame.Slot2);
		this.skillBarSlots.set(3, this.skillBarFrame.Slot3);
		this.skillBarSlots.set(4, this.skillBarFrame.Slot4);
		this.skillBarSlots.set(5, this.skillBarFrame.Slot5);
	}

	// Public:  Assign Skill to Slot
	public static AssignSkillToSlot(slot: number, skillId: SkillId) {
		//const skillButton = new SkillButton(skillId);
	}

	// Public:  Load Skills
	public LoadSkills() {
		Logger.Log(script, "Load Skills");
	}

	// Private:  createSkillButton
	private _createSkillButton(skillId: SkillId) {
		//const skillButton = new SkillButton(skillId);
	}
}
