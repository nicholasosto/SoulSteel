import { TSkillBar } from "../../shared/UI Component Classes/Types/SkillBar_Template";
import { UITemplates } from "client/TemplatesIndex";
import { getDefaultPlayerSkillsData, PlayerSkillsData, SkillId ,getAssignedSkillDefinitions} from "shared/_References/Character/Skills";
import { Logger, Printable } from "shared/Utility/Logger";
import { UnknownSkill, Character, Skill } from "@rbxts/wcs";
import * as Remote from "client/RemotesIndex";

import { SkillButton } from "./SkillButton";

export class SkillBar {
	// Main Template
	private _templateClone: TSkillBar = UITemplates.getSkillBarTemplate() as TSkillBar;
	private _playerSkillsData: PlayerSkillsData;
	private _wcsCharacter: Character | undefined;

	// Character
	//private _wcsCharacter: Character;

	// Remotes
	private _remoteSkillAssignment = Remote.RSkillAssignment;
	private _connectionSkillAssignment?: RBXScriptConnection;

	// Remote Connections

	constructor(wcsCharacter: Character, parent: Instance) {
		// Clone and Parent the Dialog Template
		assert(this._templateClone, "Template Clone is nil");
		this._wcsCharacter = wcsCharacter
		this._templateClone.Parent = parent;
		this._playerSkillsData = getDefaultPlayerSkillsData();

		this.initializeConnections();
		Logger.Log(script, "SkillBar: Constructed", script as unknown as string);
	}

	// Assign Skills
	public AssignSkills() {
		const assignedSkills = this._playerSkillsData.assignedSlots;

		assert(this._wcsCharacter, "WCS Character is nil");
		let slotNumber = 0;

		// Assign Skills to Slots
		for (const skillId of assignedSkills) {
			const skill = this._wcsCharacter.GetSkillFromString(skillId as string);
			this.AddSkillToSlot(slotNumber, skill as UnknownSkill);
			slotNumber++;
		}
	}

	// Add Skill to Slot
	public AddSkillToSlot(slot: number, skill: UnknownSkill) {
		Logger.Log(script, "Add Skill to Slot", skill as unknown as string);
		const slotName = `Slot${slot + 1}`;
		const slotFrame = this._templateClone.ActionBarMain.WaitForChild(slotName);
		assert(slotFrame, `Slot Frame ${slotName} is nil`);
		
		const skillButton = new SkillButton(skill as Skill, slotFrame);
	}

	// Remove Skill from Slot
	public RemoveSkillFromSlot(slot: number) {
		Logger.Log(script, "Remove Skill from Slot");
		//TODO: Implement
	}

	// Initialize Connections
	private initializeConnections() {
		this.destroyConnections();
		//Logger.Log(script, "SkillBar: Connection Initialization");
		this._connectionSkillAssignment = this._remoteSkillAssignment.Connect((skillData: PlayerSkillsData) => {
			//Logger.Log(script, "Skill Assignment", skillData as unknown as string);
			this._playerSkillsData = skillData;
			this.AssignSkills();
			Logger.Log(script, "Client Definitions: ", getAssignedSkillDefinitions(this._playerSkillsData) as unknown as string);
		});
	}

	// Destroy Connections
	private destroyConnections() {
		this._connectionSkillAssignment?.Disconnect();
	}
	// Show and Hide Dialog
	public Show() {
		this._templateClone.Visible = true;
	}
	public Hide() {
		this._templateClone.Visible = false;
	}

	// Destroy the Dialog
	public Destroy() {
		this.destroyConnections();
		this._templateClone.Destroy();
	}
}
