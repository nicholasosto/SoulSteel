import { Players } from "@rbxts/services";
import StorageManager from "shared/Storage/StorageManager";
import { TSkillBar } from "shared/User Interface Classes/EpicIndex";
import { SkillButton } from "../Buttons/SkillButton";
import { SkillSlotMap } from "shared/_IDs/SkillIndex";
import { Character } from "@rbxts/wcs";

const SkillBarTemplate = StorageManager.CloneFromStorage("SkillBar_Template") as TSkillBar;

export default class SkillBar {
	private _instanceObject: TSkillBar;
	private _skillSlotMap: SkillSlotMap | undefined;
	//WCS Character
	private wcsCharacter: Character | undefined;
	constructor(parent: Instance) {
		this._instanceObject = SkillBarTemplate.Clone() as TSkillBar;
		this._instanceObject.Visible = false;
		this._instanceObject.Parent = parent;
	}

	public Update(newSlotMap: SkillSlotMap) {
		print("Updating Skill Bar with new slot map:", newSlotMap);
		this._instanceObject.Visible = true;
		this._clearSkillBar();
		// Update the skill bar UI based on the new slot map
		newSlotMap.forEach((skillId, slotId) => {
			// Update the UI elements for each skill slot
			const skillSlot = this._instanceObject.FindFirstChild(`${slotId}`, true);
			const skillButton = new SkillButton(skillId);

			skillButton._instance.Parent = skillSlot as Frame;
			skillButton.ButtonInstance.Activated.Connect(() => {
				print(`Skill button ${slotId} activated!`);
				const character = Players.LocalPlayer.Character;
				if (character === undefined) return;
				const wcsCharacter = Character.GetCharacterFromInstance(character);
				wcsCharacter?.GetSkillFromString(skillId)?.Start();
			});
			if (skillSlot) {
				warn(`Updating skill slot ${slotId} with skill ID: ${skillId}`);
			} else {
				warn(`Skill slot ${slotId} not found in the UI.`);
			}
		});
	}
	private _clearSkillBar() {
		/* Call Destroy on all Skill Buttons */
		this._skillSlotMap?.forEach((skillId, slotId) => {
			const skillSlot = this._instanceObject.FindFirstChild(`${slotId}`, true);
			if (skillSlot) {
				const skillButton = skillSlot.FindFirstChildOfClass("TextButton");
				if (skillButton) {
					skillButton.Destroy();
				}
			}
		});
	}

	public Show() {
		this._instanceObject.Visible = true;
	}

	public Hide() {
		this._instanceObject.Visible = false;
	}
	public GetInstance(): TSkillBar {
		return this._instanceObject;
	}
}
