import { ItemId } from "shared/_References/Inventory";
import { SkillButton_Template } from "./Types/SkillButton_Template";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { Skill, UnknownSkill } from "@rbxts/wcs";
import { Logger } from "shared/Utility/Logger";

export class SkillButton {
	// Main Template
	private _abilityButton: SkillButton_Template;
	private _skill: Skill;

	// Connections
	private _connectionButton: RBXScriptConnection | undefined;
	private _heartBeatConnection: RBXScriptConnection | undefined;

	constructor(unknownSkill: UnknownSkill, parent: Instance) {
		// Clone and Parent the Ability Button Template
		this._abilityButton = (
			StorageManager.CloneFromStorage("AbilityButton_Template") as SkillButton_Template
		).Clone();
		this._skill = unknownSkill as Skill;
		assert(this._skill, "Skill is not defined.");
		assert(this._abilityButton, "Ability Button is not defined.");
		this._abilityButton.Parent = parent;

		// Button Reference
		this._connectionButton?.Disconnect();
		this._connectionButton = this._abilityButton.ImageButton.Activated.Connect(() => {
			this._handleButtonActivated();
		});
	}

	protected _destroyConnections() {
		this._connectionButton?.Disconnect();
	}

	// Handle Button Activation
	protected _handleButtonActivated() {
		Logger.Log(script, "Skill Button Activated");
	}

	// Destroy the Ability Button
	public Destroy() {
		this._destroyConnections();
		this._abilityButton.Destroy();
	}
}
