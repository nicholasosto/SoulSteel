import { ItemId } from "shared/_References/Inventory";
import { RunService } from "@rbxts/services";
import { TSkillButton } from "shared/Epic UI/Skill Bar/TSkillButton";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { SkillDefinition } from "shared/Skills/Interfaces/SkillInterfaces";
import { getSkillDefinition } from "shared/Skills/Data/SkillHelpers";

import { StorageManager } from "shared/Storage Manager/StorageManager";
import { Skill } from "@rbxts/wcs";
import Logger from "shared/Utility/Logger";
import { EEpicUIAttributes } from "shared/Epic UI/EpicUIAttributes";

export class SkillButtonBase {
	private _instance: TSkillButton = StorageManager.CloneFromStorage("SkillButton_Template") as TSkillButton;

	private _skillDefinition: SkillDefinition | undefined;

	constructor(skillId: SkillId, parent?: Instance) {
		this._skillDefinition = getSkillDefinition(skillId);
		this._instance.Name = this._skillDefinition.displayName;
		this._instance.Parent = parent;
		this._instance.SkillButton.Image.SkillImage.Image = this._skillDefinition.icon;
		Logger.Log(script, "Skill Button Created", this._skillDefinition.displayName);
	}

	public Destroy() {
		this._instance.Destroy();
	}
}

export class SkillButton {
	// Main Template
	private _templateClone: TSkillButton;
	private _skillDefinition: SkillDefinition;
	private _skill: Skill;

	// Cooldown
	private _cooldownBar: TSkillButton["CooldownBar"];
	private _cooldownTime: number = 0;
	private _cooldownRemaining = 0;

	// Connections
	private _connectionButton: RBXScriptConnection | undefined;
	private _connectionCooldown: RBXScriptConnection | undefined;

	// Constructor
	constructor(unknownSkill: Skill) {
		// Clone and Parent the Ability Button Template
		this._templateClone = StorageManager.CloneFromStorage("SkillButton_Template") as TSkillButton;
		const name = unknownSkill.GetName();
		assert(name, "Skill Name is nil");
		this._skillDefinition = getSkillDefinition(name as SkillId);
		this._cooldownBar = this._templateClone.CooldownBar;
		this._cooldownTime = this._skillDefinition.cooldown;

		// Setup the Skill Button
		this._skill = unknownSkill;

		assert(this._skillDefinition, "Skill Definition is nil");
		assert(this._templateClone, "Template Clone is nil");
		assert(this._skill, "Skill is nil");
		assert(this._cooldownBar, "Cooldown Bar is nil");

		this._setGUIProperties();

		this._initializeConnections();
		Logger.Log(script, "Skill Button Created");
		//Logger.Log(script, getSkillDefinition(unknownSkill.GetName() as SkillId) as unknown as string);
	}

	protected _setGUIProperties() {
		this._templateClone.SkillButton.Image.SkillImage.Image = this._skillDefinition.icon;
		this._templateClone.CooldownBar.SetAttribute(EEpicUIAttributes.TextValue, this._skillDefinition.displayName);
	}

	public SetParent(parent: Instance) {
		this._templateClone.Parent = parent;
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

	// Update Cooldown Bar
	protected _updateCooldownBar() {
		if (this._connectionCooldown) {
			this._connectionCooldown.Disconnect();
		}

		this._connectionCooldown = RunService.RenderStepped.Connect(() => {
			this._cooldownRemaining -= 0.016;
			if (this._cooldownRemaining <= 0) {
				this._cooldownRemaining = 0;
				this._connectionCooldown?.Disconnect();
				this._templateClone.CooldownBar.SetAttribute(
					EEpicUIAttributes.TextValue,
					this._skillDefinition.displayName,
				);
			}
			this._cooldownBar.SetAttribute(
				EEpicUIAttributes.TextValue,
				`${this._skillDefinition.displayName} (${math.ceil(this._cooldownRemaining)})`,
			);
			this._cooldownBar.SetAttribute(
				EEpicUIAttributes.BarPercent,
				(this._cooldownRemaining / this._cooldownTime) * 100,
			);
		});
	}

	// Handle Button Activation
	protected _handleButtonActivated() {
		if (this._cooldownRemaining > 0) {
			return;
		}
		this._skill.Start();
		this._cooldownRemaining = this._cooldownTime;
		this._updateCooldownBar();
		this._skill.GetDebounceEndTimestamp();
	}

	// Destroy the Ability Button
	public Destroy() {
		this._destroyConnections();
		this._templateClone.Destroy();
	}
}
