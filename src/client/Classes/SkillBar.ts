import { Logger } from "shared/Utility/Logger";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { TSkillBar } from "../../shared/UI Component Classes/Skill Bar/SkillBar_Template";
import { SkillDefinition, SkillId, getSkillDefinition } from "shared/Skills/SkillIndex";
import { SkillButton } from "../../shared/UI Component Classes/SkillButton/SkillButton";
import AssignSlotButton from "shared/UI Component Classes/AssignSlotButton/AssignSlotButton";
import { Character, Skill } from "@rbxts/wcs";
import { PlayerSkillsData } from "shared/Skills/SkillIndex";
import { TSlotAssignmentButton } from "shared/UI Component Classes/AssignSlotButton/SlotAssignmentButtonTypes";

export class SkillBar {
	// GUI Components
	private static skillBarFrame: TSkillBar = StorageManager.CloneFromStorage("SkillBar_Template") as TSkillBar;
	private static skillBarSlots: Map<number, Frame> = new Map();
	private static skillDefinitions: Map<SkillId, SkillDefinition> = new Map();
	private static finalMap: Map<Frame, SkillButton> = new Map();

	// Skill Data
	private static assignedSkills: Array<SkillId | undefined> = [];
	private static unlockedSkills: Array<SkillId> = [];

	public static Initialize() {
		// Initialize the Slot Map
		this.InitializeSlotMap();
		Logger.Log(script, "Skill Bar Initialized");
	}

	public static AssignSkillData(wcsCharacter: Character, skillArray: PlayerSkillsData) {
		// Set Assigned Skills
		assert(wcsCharacter, "WCS Character is nil");
		assert(skillArray, "Skill Array is nil");
		Logger.Log(script, "Assign Skill Data: ", skillArray as unknown as string);
		this.SetAssignedSkills(wcsCharacter, skillArray.assignedSlots);

		this.SetUnlockedSkills(skillArray.unlockedSkills);

		this.SetSkillDefinitions();

		// Populate the GUI
		this.PopulateGUI();
	}

	public static AssignSkillToSlot(slot: number, skillId: SkillId) {
		Logger.Log(script, "Assign Skill to Slot: ", slot, skillId);
		this.assignedSkills[slot] = skillId;
	}

	private static SetAssignedSkills(wcsCharacter: Character, skillArray: Array<SkillId | undefined>) {
		Logger.Log(script, "Set Assigned Skills");
		// Set the Assigned Skills
		this.assignedSkills.clear();
		this.assignedSkills = skillArray;

		Logger.Log(script, "Destroy Skill Buttons");
		this.DestroySkillButtons();

		for (let i = 0; i < this.assignedSkills.size(); i++) {
			const slotFrame = this.skillBarSlots.get(i);
			const skillId = this.assignedSkills[i];
			const skillModule = wcsCharacter.GetSkillFromString(skillId as string);
			assert(slotFrame, `Slot Frame ${i} is nil`);
			assert(skillModule, `Skill Module ${skillId} is nil`);
			this.finalMap.set(slotFrame, new SkillButton(skillModule as unknown as Skill, slotFrame));
		}

		Logger.Log(
			script,
			"Set-Assigned Final Map: ",
			this.finalMap.get(this.skillBarSlots.get(0) as Frame) as unknown as string,
		);
	}

	private static DestroySkillButtons() {
		Logger.Log(script, "Destroy Skill Buttons");
		// Destroy Skill Buttons
		this.finalMap.forEach((skillButton) => {
			skillButton.Destroy();
		});
		this.finalMap.clear();
	}

	private static SetSkillDefinitions() {
		Logger.Log(script, "Set Skill Definitions");
		// Set Skill Definitions
		this.skillDefinitions.clear();
		this.unlockedSkills.forEach((skillId) => {
			const skillDeffinition = getSkillDefinition(skillId);
			assert(skillDeffinition, `Skill Definition ${skillId} is nil`);
			this.skillDefinitions.set(skillId, skillDeffinition);
		});
	}

	// Set Unlocked Skills
	private static SetUnlockedSkills(skillArray: Array<SkillId>) {
		Logger.Log(script, "Set Unlocked Skills");
		this.unlockedSkills = skillArray;
	}

	// Add SkillBar to GUI
	private static PopulateGUI() {
		const playerHUD = game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui").WaitForChild("HUD");
		this.skillBarFrame.Parent = playerHUD;
		const slotAssignbutton = new AssignSlotButton(3, "BasicMelee");
		slotAssignbutton.Button.Parent = this.skillBarFrame;
	}

	// Utility Functions
	// Initialize the Slot Map
	private static InitializeSlotMap() {
		this.skillBarSlots.clear();
		this.skillBarSlots.set(0, this.skillBarFrame.ActionBarMain.Slot1.Content);
		this.skillBarSlots.set(1, this.skillBarFrame.ActionBarMain.Slot2.Content);
		this.skillBarSlots.set(2, this.skillBarFrame.ActionBarMain.Slot3.Content);
		this.skillBarSlots.set(3, this.skillBarFrame.ActionBarMain.Slot4.Content);
		this.skillBarSlots.set(4, this.skillBarFrame.ActionBarMain.Slot5.Content);
	}

	private static CreateSkillAssignmentButton() {
		// Create Skill Assignment Button
	}
}
