import { SkillId } from "shared/_IDs/IDs_Skill";
import { TSkillBar } from "shared/Epic UI/EpicIndex";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import Logger from "shared/Utility/Logger";

import SkillButtonComponent from "../Buttons/SkillButtonComponent";

type TSkillSlotMap = Map<number, SkillId>;

export default class SkillBarComponent {
	private _slotFrameMap: Map<number, Frame> = new Map();
	private _slotButtonsMap: Map<Frame, SkillButtonComponent> = new Map();

	constructor(skillBar: TSkillBar) {
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
		const skillMap = GetSkillMapFromPlayerData(data);
		this.Update(skillMap);
	}

	/* Update */
	public Update(skillSlotMap: TSkillSlotMap): void {
		/* Loop through the Skill Slot Map */
		for (const [slot, skillId] of skillSlotMap) {
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
			const newSkillButton = new SkillButtonComponent(parent, skillId);

			/* Set the Skill Button */
			this._slotButtonsMap.set(parent, newSkillButton);
		}
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
