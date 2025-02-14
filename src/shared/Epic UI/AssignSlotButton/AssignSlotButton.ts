import Logger from "shared/Utility/Logger";
import StorageManager from "shared/Storage Manager/StorageManager";
import { TSlotAssignmentButton } from "./SlotAssignmentButtonTypes";
import { SkillId } from "shared/_IDs/IDs_Skill";

export default class SlotAssignmentButton {
	public Button: TSlotAssignmentButton = StorageManager.CloneFromStorage(
		"SlotAssignmentButton_Template",
	) as TSlotAssignmentButton;

	constructor(slotId: number, itemId: SkillId) {
		assert(this.Button.SlotId !== undefined, "Slot ID is undefined");
		assert(this.Button.ItemId !== undefined, "Item ID is undefined");

		this.Button.SlotId.Value = slotId;
		this.Button.ItemId.Value = itemId;
		this.Button.Activated.Connect(() => {
			this.OnActivate();
		});
	}

	public OnActivate() {
		Logger.Log(this.Button, "Slot Assignment Button Activated");
		assert(this.Button.SlotId !== undefined, "Slot ID is undefined");
		assert(this.Button.ItemId !== undefined, "Item ID is undefined");
		//this._remoteAssignSlot.SendToServer(this.Button.SlotId.Value, this.Button.ItemId.Value);
	}
}
