/* Roblox Services */
import { Players } from "@rbxts/services";

/* Interfaces */
import { TSkillBar } from "shared/Epic UI/Types/TSkillBar";
import { SkillId } from "shared/_IDs/IDs_Skill";

/* Modules */
import { SkillButton } from "../../Classes/SkillButton";

/* Utility */
import Logger from "shared/Utility/Logger";
import { Character } from "@rbxts/wcs";

/* Main Class: SkillBar */
export default class SkillBar {
	// Instance
	private _instance: TSkillBar;
	//WCS Character
	private wcsCharacter: Character | undefined;

	// Skill Maps
	private _skillButtonMap = new Map<number, SkillButton>();
	private _skillConnectionMap = new Map<number, RBXScriptConnection>();

	// Constructor
	constructor(skillBarInstance: TSkillBar) {
		this._instance = skillBarInstance;
	}

	// Public:  Assign Skill to Slot
	public AssignSkillToSlot(slot: number, skillId: SkillId) {
		const currentButton = this._skillButtonMap.get(slot);
		if (currentButton === undefined) {
			this._createSkillButton(slot, skillId);
		} else {
			currentButton.SetSkill(skillId);
		}
	}

	// Public:  Load Skills
	public LoadSkills(skillSlotMap: Map<number, SkillId>) {
		// Loop through the Skill Slot Map
		for (const [slot, skillId] of skillSlotMap) {
			this._createSkillButton(slot, skillId);
		}
	}

	/* Set WCS Character */
	public SetWCSCharacter(wcsCharacter: Character) {
		this.wcsCharacter = wcsCharacter;
	}

	public ClearWCSCharacter() {
		this.wcsCharacter = undefined;
	}

	public ClearSlot(slot: number) {
		const skillButton = this._skillButtonMap.get(slot);
		if (skillButton !== undefined) {
			skillButton.Destroy();
		}
		this._createSkillButton(slot, "None");
	}

	// Private:  createSkillButton
	private _createSkillButton(slot: number, skillId: SkillId) {
		let parent: Frame | undefined;

		/* Check if the Instance is Valid */
		if (this._instance === undefined) return;

		// Get the Parent Frame
		switch (slot) {
			case 1:
				parent = this._instance.Slot1.Content;
				break;
			case 2:
				parent = this._instance.Slot2.Content;
				break;
			case 3:
				parent = this._instance.Slot3;
				break;
			case 4:
				parent = this._instance.Slot4;
				break;
			case 5:
				parent = this._instance.Slot5;
				break;
			default:
				Logger.Log(script, "Invalid Slot Number");
				return;
		}

		// Create the Skill Button
		this._skillButtonMap.set(slot, new SkillButton(skillId));
		this._skillButtonMap.get(slot)!._instance.Parent = parent;

		// Connect the Skill Button and add it to the map
		this._skillConnectionMap.get(slot)?.Disconnect();
		const connection = this._skillButtonMap.get(slot)?.ButtonInstance.Activated.Connect(() => {
			const characterModel = Players.LocalPlayer?.Character;
			if (characterModel === undefined) return;

			/* Get the WCS Character */
			const wcsCharacter = Character.GetCharacterFromInstance(characterModel);

			/* Get the Skill */
			const skill = wcsCharacter?.GetSkillFromString(skillId);

			/* Start the Skill */
			if (skill === undefined) return;
			this._skillButtonMap.get(slot)?.StartCooldown();
			skill.Start();
		});

		// Add the Connection to the Map
		this._skillConnectionMap.set(slot, connection as RBXScriptConnection);
	}

	// Destroy
	public Destroy() {
		this._skillConnectionMap.forEach((connection) => {
			connection?.Disconnect();
		});
		this._instance?.Destroy();
	}
}
