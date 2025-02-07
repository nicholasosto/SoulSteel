// Utility
import Logger from "shared/Utility/Logger";
import StorageManager from "shared/Storage Manager/StorageManager";

// Types
import { TSkillButton } from "shared/Epic UI/Skill Bar/TSkillButton";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { SkillDefinition } from "shared/Skills/Interfaces/SkillInterfaces";
import ProgressBar from "shared/Epic UI/Progress Bar/ProgressBar";

// Functions
import { getSkillDefinition } from "shared/Skills/Data/SkillHelpers";
import { Skill } from "@rbxts/wcs";

export class SkillButton {
	// Button Frame Instance
	public _instance: TSkillButton = StorageManager.CloneFromStorage("SkillButton_Template") as TSkillButton;

	// Button
	public ButtonInstance = this._instance.SkillButton;

	// Cooldown Bar
	private _cooldownBar = new ProgressBar(this._instance.CooldownBar);
	private _cooldownTime = 0;
	private _cooldownRemaining = 0;

	// Skill Definition
	private _skillDefinition: SkillDefinition | undefined;
	private _skill: Skill | undefined;

	// Constructor
	constructor(skillId: SkillId) {
		// Set the Skill Definition
		this._skillDefinition = getSkillDefinition(skillId) as SkillDefinition;

		// Set the Cooldown Time
		this._cooldownTime = this._skillDefinition.cooldown;

		// Set the Skill Id
		this._instance.Name = this._skillDefinition.wcsSkillId;

		/* Cooldown Bar */
		// Set the Text
		this._cooldownBar.setText(this._skillDefinition.displayName);

		// Set the Cooldown Value
		this._cooldownBar.setPercent(100);

		/* Button */
		// Set the Image
		this._setImage(this._skillDefinition.icon);
	}

	// Start Cooldown
	public StartCooldown() {
		if (this._cooldownRemaining > 0) {
			return;
		}

		Logger.Log(script, "Starting Cooldown");

		task.spawn(() => {
			this._cooldownRemaining = this._cooldownTime;
			let lastTick = tick(); // Initialize lastTick at the start of the cooldown

			while (this._cooldownRemaining > 0) {
				const currentTick = tick();
				const deltaTime = currentTick - lastTick;
				lastTick = currentTick;

				// Decrement the remaining cooldown by the time since the last check
				this._cooldownRemaining -= deltaTime;

				// Clamp to 0 so it doesn't go negative
				if (this._cooldownRemaining < 0) {
					this._cooldownRemaining = 0;
				}

				this._updateCooldown(this._cooldownRemaining, this._cooldownTime);
				task.wait(0.2);
			}

			// Ensure the progress bar shows full progress when cooldown is finished
			this._cooldownBar.setPercent(100);
		});
	}

	// Set Cooldown Value
	private _updateCooldown(current: number, max: number) {
		const percent = (current / max) * 100;
		this._cooldownBar.setPercent(percent);
	}

	// Set Image
	private _setImage(image: string) {
		this._instance.SkillButton.ImageFrame.SkillImage.Image = image;
	}

	// Set Text
	public SetText(text: string) {
		this._cooldownBar.setText(text);
	}

	// Set Skill
	public SetSkill(skillId: SkillId) {
		this._skillDefinition = getSkillDefinition(skillId) as SkillDefinition;
		this._setImage(this._skillDefinition.icon);
		this._cooldownTime = this._skillDefinition.cooldown;
	}

	public ClearSkill() {
		this.SetSkill("None");
	}

	// Set Parent
	public Destroy() {
		this._instance.Destroy();
	}
}
