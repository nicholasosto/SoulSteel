import { SkillId } from "shared/_IDs/IDs_Skill";
import { TSkillButton } from "shared/Epic UI/EpicIndex";

import StorageManager from "shared/Storage/StorageManager";
import DefinitionsManager from "shared/Storage/DefinitionsManager";
import ISkillDefinition from "shared/_Interfaces/ISkillDefinition";

import { Players } from "@rbxts/services";
import { Character } from "@rbxts/wcs";

export default class SkillButtonComponent {
	/* Frame Instance */
	private _frameInstance: TSkillButton;
	private _player = Players.LocalPlayer;
	private _skillId: SkillId;

	/* Skill Deffinition */
	private _skillDeffinition: ISkillDefinition;

	/* Cooldown Timer */
	private _cooldownTimer: {
		cooldownTime: number;
		cooldownRemaining: number;
	};

	/* Constructor */
	constructor(parent: Frame, skillId: SkillId) {
		print("New Skill Button Constructor: ", skillId);
		/* Create the Frame Instance */
		this._frameInstance = StorageManager.CloneFromStorage("SkillButton_Template") as TSkillButton;
		this._frameInstance.Parent = parent;

		/* Set the Skill Deffinition */
		this._skillDeffinition = DefinitionsManager.GetSkillDefinition(skillId) as ISkillDefinition;

		/* Set the Skill Id */
		this._skillId = skillId;

		/* Set the Cooldown Timer */
		this._cooldownTimer = {
			cooldownTime: this._skillDeffinition.cooldown,
			cooldownRemaining: 0,
		};

		/* Connect the Button */
		this._frameInstance.SkillButton.MouseButton1Click.Connect(() => {
			const characterModel = this._player.Character;
			if (characterModel === undefined) {
				warn("NewSkillButton - Character Model Not Found");
				return;
			}
			const wcsCharacter = Character.GetCharacterFromInstance(characterModel);
			if (wcsCharacter === undefined) {
				warn("NewSkillButton - WCS Character Not Found");
				return;
			}
			wcsCharacter.GetSkillFromString(this._skillId as string)?.Start();

			print("Skill Button Clicked");
			this._startCooldown();
		});

		/* Initialize the Skill Button */
		this._setImage(this._skillDeffinition.imageId);
		this._setDisplayName(this._skillDeffinition.displayName);
		this._initializeCooldownBar();
	}

	private _setImage(imageId: string): void {
		this._frameInstance.SkillButton.ImageFrame.SkillImage.Image = imageId;
	}

	private _setDisplayName(displayName: string): void {
		this._frameInstance.CooldownBar.SetAttribute("TextValue", displayName);
	}

	private _initializeCooldownBar(): void {
		this._frameInstance.CooldownBar.SetAttribute("BarPercent", 100 - this._cooldownTimer.cooldownRemaining);
	}

	private _startCooldown(): void {
		if (this._cooldownTimer.cooldownRemaining > 0) {
			return;
		}

		task.spawn(() => {
			this._cooldownTimer.cooldownRemaining = this._cooldownTimer.cooldownTime;
			let lastTick = tick();

			while (this._cooldownTimer.cooldownRemaining > 0) {
				const deltaTime = tick() - lastTick;
				this._cooldownTimer.cooldownRemaining -= deltaTime;
				const percentage = (this._cooldownTimer.cooldownRemaining / this._cooldownTimer.cooldownTime) * 100;
				this._frameInstance.CooldownBar.SetAttribute("BarPercent", percentage);
				lastTick = tick();
				task.wait(0.2);
			}

			this._frameInstance.CooldownBar.SetAttribute("BarPercent", 100);
		});
	}

	public Destroy(): void {
		this._frameInstance.SkillButton.Destroy();
		this._frameInstance.Destroy();
	}
}
