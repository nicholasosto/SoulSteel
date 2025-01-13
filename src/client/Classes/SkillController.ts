import { Logger } from "shared/Utility/Logger";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { TSkillBar } from "../../shared/UI Component Classes/Types/SkillBar_Template";
import { SkillDefinition, SkillId, getSkillDefinition } from "shared/_References/Skills";
import { SkillButton } from "./SkillButton";
import { Character, Skill } from "@rbxts/wcs";
import { PlayerSkillsData } from "shared/_References/Skills";

export class SkillController {
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

		// Populate the GUI
		this.PopulateGUI();
	}

	public static AssignSkillData(wcsCharacter: Character, skillArray: PlayerSkillsData) {
		// Set Assigned Skills
		this.SetAssignedSkills(wcsCharacter, skillArray.assignedSlots);

		this.SetUnlockedSkills(skillArray.unlockedSkills);

		this.SetSkillDefinitions();

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
}

// import { TSkillBar } from "../../shared/UI Component Classes/Types/SkillBar_Template";
// import { UITemplates } from "client/TemplatesIndex";
// import {
// 	getDefaultPlayerSkillsData,
// 	PlayerSkillsData,
// 	SkillId,
// 	getAssignedSkillDefinitions,
// } from "shared/_References/Skills";
// import { Logger, Printable } from "shared/Utility/Logger";
// import { UnknownSkill, Character, Skill } from "@rbxts/wcs";
// import * as Remote from "client/RemotesIndex";
// import { StorageManager } from "shared/_References/Managers/StorageManager";

// import { SkillButton } from "./SkillButton";

// const player = game.GetService("Players").LocalPlayer;
// const playerGui = player.WaitForChild("PlayerGui");
// const playerHUD = playerGui.WaitForChild("HUD");
// const skillBarTemplate = StorageManager.CloneFromStorage("SkillBar_Template") as TSkillBar;

// export class SkillController {
// 	private static _instance: SkillController;
// 	private static _slotMap: Map<number, Frame> = new Map();

// 	private constructor() {
// 		// Singleton
// 	}
// 	public static Start() {
// 		if (!SkillController._instance) {
// 			SkillController._instance = new SkillController();
// 		}
// 	}

// 	public static AssignSkills(wcsCharacter: Character, playerSkillsData: PlayerSkillsData) {
// 		Logger.Log(script, "Assign Skills");
// 		const assignedSkills = playerSkillsData.assignedSlots;

// 		SkillController._updateSkillBar(playerSkillsData);
// 	}
// 	private static _assignSkillButtonToSlot(slot: number, skill: Skill) {
// 		const slotFrame = SkillController._slotMap.get(slot);
// 		assert(slotFrame, `Slot Frame ${slot} is nil`);

// 		const skillButton = new SkillButton(skill, slotFrame);
// 	}

// 	private static async _updateSkillBar(skillData: PlayerSkillsData) {
// 		// Assigned Skills
// 		const assignedSkills = skillData.assignedSlots;
// 		const wcsCharacter = Character.GetCharacterFromInstance(player.Character as Model) as Character;
// 		Logger.Log(script, "Update SkillBar", wcsCharacter as unknown as string);
// 		let slotNumber = 0;

// 		// Assign Skills to Slots
// 		for (const skillId of assignedSkills) {
// 			const skill = wcsCharacter.GetSkillFromString(skillId as string);
// 			skill?.GetName();
// 			slotNumber++;
// 			Logger.Log(script, `CTRL - Skill Assigned: ${skillId}`);
// 		}

// 		//Logger.Log(script, "Update SkillBar",skill?.GetName(), assignedSkills as unknown as string);
// 	}

// 	private static _addSkillToSlot(slot: number, skill: Skill) {

// 		//const wcsCharacter = Character.GetCharacterFromInstance(player.Character);

// 		if(SkillController._wcsCharacter === undefined) {
// 			Logger.Log(script, "WCS Character is nil");
// 			return;
// 		}

// 		switch (slot) {
// 			case 0:
// 				Logger.Log(script, "Slot 1");
// 				break;
// 			case 1:
// 				Logger.Log(script, "Slot 2");
// 				break;
// 			case 2:
// 				Logger.Log(script, "Slot 3");
// 				break;
// 			default:
// 				Logger.Log(script, "Invalid Slot");
// 				break;
// 		}
// 		Logger.Log(script, "Add Skill to Slot");
// 	}
// }

// Character.CharacterCreated.Connect((character) => {

// 	Logger.Log(script, "Character Created");
// 	character.Humanoid.Died.Connect(() => {
// 		Logger.Log(script, "Character Died");
// 	});
// });

// export class SkillBar {
// 	// Main Template
// 	private _templateClone: TSkillBar = UITemplates.getSkillBarTemplate() as TSkillBar;
// 	private _playerSkillsData: PlayerSkillsData;
// 	private _wcsCharacter: Character | undefined;

// 	// Remotes
// 	private _remoteSkillAssignment = Remote.RSkillAssignment;
// 	private _connectionSkillAssignment?: RBXScriptConnection;

// 	// Remote Connections

// 	constructor(wcsCharacter: Character, parent: Instance) {
// 		// Clone and Parent the Dialog Template
// 		assert(this._templateClone, "Template Clone is nil");
// 		this._wcsCharacter = wcsCharacter;
// 		this._templateClone.Parent = parent;
// 		this._playerSkillsData = getDefaultPlayerSkillsData();

// 		this.initializeConnections();
// 	}

// 	// Assign Skills
// 	public AssignSkills() {
// 		const assignedSkills = this._playerSkillsData.assignedSlots;

// 		assert(this._wcsCharacter, "WCS Character is nil");

// 		let slotNumber = 0;

// 		// Assign Skills to Slots
// 		for (const skillId of assignedSkills) {
// 			const skill = this._wcsCharacter.GetSkillFromString(skillId as string);
// 			this.AddSkillToSlot(slotNumber, skill as UnknownSkill);
// 			slotNumber++;
// 			Logger.Log(script, `Skill Assigned: ${skillId}`);
// 		}
// 	}

// 	// Add Skill to Slot
// 	public AddSkillToSlot(slot: number, skill: UnknownSkill) {
// 		const slotName = `Slot${slot + 1}`;
// 		const slotFrame = this._templateClone.ActionBarMain.WaitForChild(slotName);
// 		assert(slotFrame, `Slot Frame ${slotName} is nil`);

// 		const skillButton = new SkillButton(skill as Skill, slotFrame);
// 	}

// 	// Remove Skill from Slot
// 	public RemoveSkillFromSlot(slot: number) {
// 		Logger.Log(script, "Remove Skill from Slot");
// 		//TODO: Implement
// 	}

// 	// Initialize Connections
// 	private initializeConnections() {
// 		this.destroyConnections();
// 		//Logger.Log(script, "SkillBar: Connection Initialization");
// 		this._connectionSkillAssignment = this._remoteSkillAssignment.Connect((skillData: PlayerSkillsData) => {
// 			this._playerSkillsData = skillData;
// 			this.AssignSkills();
// 		});
// 	}

// 	// Destroy Connections
// 	private destroyConnections() {
// 		this._connectionSkillAssignment?.Disconnect();
// 	}
// 	// Show and Hide Dialog
// 	public Show() {
// 		this._templateClone.Visible = true;
// 	}
// 	public Hide() {
// 		this._templateClone.Visible = false;
// 	}

// 	// Destroy the Dialog
// 	public Destroy() {
// 		this.destroyConnections();
// 		this._templateClone.Destroy();
// 	}
// }
