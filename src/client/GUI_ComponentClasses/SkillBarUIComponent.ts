import { SkillId } from "shared/_IDs/IDs_Skill";
import { TSkillBar, TSkillButton } from "shared/Epic UI/EpicIndex";
//import { SkillButton } from "shared/Epic UI/Classes/SkillButton";
import StorageManager from "shared/Storage/StorageManager";
import DefinitionsManager from "shared/Storage/DefinitionsManager";
import ISkillDefinition from "shared/_Interfaces/ISkillDefinition";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import Logger from "shared/Utility/Logger";

type TSkillSlotMap = Map<number, SkillId>;

class NewSkillButton {
	/* Frame Instance */
	private _frameInstance: TSkillButton;

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

		/* Set the Cooldown Timer */
		this._cooldownTimer = {
			cooldownTime: this._skillDeffinition.cooldown,
			cooldownRemaining: 0,
		};

		/* Connect the Button */
		this._frameInstance.SkillButton.MouseButton1Click.Connect(() => {
			print("Skill Button Clicked");
			this._startCooldown();
		});

		/* Initialize the Skill Button */
		this._setImage(this._skillDeffinition.imageId);
		this._displayName(this._skillDeffinition.displayName);
		this._initializeCooldownBar();
	}

	private _setImage(imageId: string): void {
		this._frameInstance.SkillButton.ImageFrame.SkillImage.Image = imageId;
	}

	private _displayName(displayName: string): void {
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

export default class SkillBarUIComponent {
	private _skillBar: TSkillBar;
	private _slotFrameMap: Map<number, Frame> = new Map();
	private _slotButtonsMap: Map<Frame, NewSkillButton> = new Map();

	constructor(skillBar: TSkillBar) {
		this._skillBar = skillBar;

		/* Set the Slot Frame Map */
		this._slotFrameMap.set(0, skillBar.Slot1);
		this._slotFrameMap.set(1, skillBar.Slot2);
		this._slotFrameMap.set(2, skillBar.Slot3);
		this._slotFrameMap.set(3, skillBar.Slot4);
		this._slotFrameMap.set(4, skillBar.Slot5);

		//const testButton = new NewSkillButton(skillBar.Slot1, "BasicMelee");
		warn("SkillBarUIComponent Constructor Not Implemented", skillBar.Slot1);
	}

	public Initialize(data: IPlayerData): void {
		Logger.Log("Skill Bar 2 - Initialize", data as unknown as string);
		this._initializeSkillButtons(data);
	}

	public Update(skillSlotMap: TSkillSlotMap): void {
		Logger.Log("Skill Bar 2 - Update", skillSlotMap as unknown as string);
		this._updateSkillButtons(skillSlotMap);
	}

	private _updateSkillButtons(skillMap: TSkillSlotMap): void {
		/* Loop through the Skill Slot Map */
		for (const [slot, skillId] of skillMap) {
			/* Get the Parent Frame */
			const parent = this._slotFrameMap.get(slot);

			/* Check if the Parent Frame is Valid */
			if (parent === undefined) {
				warn("Initialize - SkillBarUIComponent: Parent Frame Not Found", [slot, skillId]);
				continue;
			}

			/* Check if the Skill Button Exists and Destroy it */
			const existingSkillButton = this._slotButtonsMap.get(parent);
			if (existingSkillButton !== undefined) {
				existingSkillButton.Destroy();
			}

			/* Create the New Skill Button */
			const newSkillButton = new NewSkillButton(parent, skillId);

			/* Set the Skill Button */
			this._slotButtonsMap.set(parent, newSkillButton);
		}
	}

	private _initializeSkillButtons(data: IPlayerData): void {
		const skillMap = GetSkillMapFromPlayerData(data);
		this._updateSkillButtons(skillMap);
	}
}

function GetSkillMapFromPlayerData(playerData: IPlayerData) {
	const skillMap = new Map<number, SkillId>();
	const skillData = playerData.Skills.assignedSlots;
	for (let i = 0; i < skillData.size(); i++) {
		skillMap.set(i, skillData[i] as SkillId);
	}

	return skillMap;
}
