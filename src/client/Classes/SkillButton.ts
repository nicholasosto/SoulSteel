import { ItemId } from "shared/_References/Inventory";
import { TSkillButton } from "../../shared/UI Component Classes/Types/SkillButton_Template";
import { SkillDefinition, SkillId, getSkillDefinition } from "shared/_References/Character/Skills";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { Skill, UnknownSkill } from "@rbxts/wcs";
import { Logger } from "shared/Utility/Logger";

export class SkillButton {
	// Main Template
	private _templateClone: TSkillButton;
	private _skill: Skill;

	// Connections
	private _connectionButton: RBXScriptConnection | undefined;

	// Public Properties
	public Parent: Instance;

	// Constructor
	constructor(unknownSkill: Skill, parent: Instance) {
		Logger.Log(script, "Skill Button Constructed", unknownSkill as unknown as string);
		// Clone and Parent the Ability Button Template
		this._templateClone = StorageManager.CloneFromStorage("SkillButton_Template") as TSkillButton;
		this.Parent = parent;
		this._templateClone.Parent = parent;

		// Setup the Skill Button
		this._skill = unknownSkill;
		this._initializeConnections();
		Logger.Log(script, this._skill as unknown as string);
	}

	// Initialize Connections
	protected _initializeConnections() {
		assert(this._templateClone.SkillButton, "Skill Button is nil");
		this._destroyConnections();
		this._connectionButton = this._templateClone.SkillButton.Activated.Connect(() => {
			this._handleButtonActivated();
		});
	}

	// Destroy Connections
	protected _destroyConnections() {
		this._connectionButton?.Disconnect();
	}

	// Handle Button Activation
	protected _handleButtonActivated() {
		this._skill.Start();
	}

	// Destroy the Ability Button
	public Destroy() {
		this._destroyConnections();
		this._templateClone.Destroy();
	}
}
