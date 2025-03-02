// Utility
import Logger from "shared/Utility/Logger";
import StorageManager from "shared/Storage/StorageManager";

// Types
import { TSkillButton } from "shared/Epic UI/Types/TSkillButton";
import { SkillId } from "shared/_IDs/IDs_Skill";
import ISkillDefinition from "shared/_Interfaces/ISkillDefinition";
import ProgressBar from "shared/Epic UI/Classes/ProgressBar";

// Functions
//import { getSkillDefinition } from "shared/_Functions/SkillFunctions";
import DefinitionsManager from "shared/Storage/DefinitionsManager";

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
	private _skillDefinition: ISkillDefinition | undefined;

	// Constructor
	constructor(skillId: SkillId) {
		// Set the Skill Definition
		//this._skillDefinition = getSkillDefinition(skillId) as ISkillDefinition;
		this._skillDefinition = DefinitionsManager.GetSkillDefinition(skillId) as ISkillDefinition;

		// Set the Cooldown Time
		this._cooldownTime = this._skillDefinition.cooldown;

		// Set the Skill Id
		this._instance.Name = this._skillDefinition.itemId;

		/* Cooldown Bar */
		this._cooldownBar.SetEpicAttribute("TextValue", this._skillDefinition.displayName);
		this._cooldownBar.SetEpicAttribute("BarPercent", "0");

		/* Button */
		this._setImage(this._skillDefinition.imageId);
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
			this._cooldownBar.SetEpicAttribute("BarPercent", "0");
		});
	}

	// Set Cooldown Value
	private _updateCooldown(current: number, max: number) {
		const percent = (current / max) * 100;
		this._cooldownBar.SetEpicAttribute("BarPercent", tostring(percent));
	}

	// Set Image
	private _setImage(image: string) {
		this._instance.SkillButton.ImageFrame.SkillImage.Image = image;
	}

	// // Set Text
	// public SetText(text: string) {
	// 	this._cooldownBar.SetEpicAttribute("TextValue", text);
	// }

	// Set Skill
	// private SetSkill(skillId: SkillId) {
	// 	this._skillDefinition = getSkillDefinition(skillId) as ISkillDefinition;
	// 	this._setImage(this._skillDefinition.icon);
	// 	this._cooldownTime = this._skillDefinition.cooldown;
	// }
}
