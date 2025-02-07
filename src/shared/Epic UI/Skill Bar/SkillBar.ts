/* Roblox Services */
import { Players } from "@rbxts/services";

/* Interfaces */
import { TSkillBar } from "shared/Epic UI/Skill Bar/TSkillBar";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

/* Modules */
import { SkillButton } from "./SkillButton";

/* Utility */
import Logger from "shared/Utility/Logger";
import StorageManager from "shared/Storage Manager/StorageManager";
import { Character } from "@rbxts/wcs";

/* References */
const LocalPlayer = Players.LocalPlayer;
const playerHUD = LocalPlayer.WaitForChild("PlayerGui").WaitForChild("HUD");

/* Main Class: SkillBar */
export default class SkillBar {
	// Instance
	private _instance: TSkillBar = StorageManager.CloneFromStorage("SkillBar_Template") as TSkillBar;

	//WCS Character
	private wcsCharacter: Character | undefined;

	// Skill Maps
	private _skillButtonMap = new Map<number, SkillButton>();
	private _skillConnectionMap = new Map<number, RBXScriptConnection>();

	// Constructor
	constructor() {
		this._instance.Parent = playerHUD;
	}

	// Public:  Assign Skill to Slot
	public AssignSkillToSlot(slot: number, skillId: SkillId) {
		const currentButton = this._skillButtonMap.get(slot);
		if (currentButton === undefined) {
			Logger.Log(script, "No Button Found creating new one");
			this._createSkillButton(slot, skillId);
		} else {
			currentButton.SetSkill(skillId);
		}
	}

	// Public:  Load Skills
	public LoadSkills(skillSlotMap: Map<number, SkillId>) {
		Logger.Log(script, "Load Skills", skillSlotMap as unknown as string);

		// Loop through the Skill Slot Map
		for (const [slot, skillId] of skillSlotMap) {
			this._createSkillButton(slot, skillId);
		}
	}

	/* Set WCS Character */
	public SetWCSCharacter(wcsCharacter: Character) {
		this.wcsCharacter = wcsCharacter;
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
		Logger.Log(script, "Create Skill Button", slot, skillId);
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
			this._skillButtonMap.get(slot)?.StartCooldown();
			this.wcsCharacter?.GetSkillFromString(skillId)?.Start();
		});

		this._skillConnectionMap.set(slot, connection as RBXScriptConnection);
	}

	// Destroy
	public Destroy() {
		this._skillConnectionMap.forEach((connection) => {
			connection?.Disconnect();
		});
		this._instance.Destroy();
	}
}
