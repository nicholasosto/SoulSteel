import Logger from "shared/Utility/Logger";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import Remotes, { RemoteNames } from "shared/Remotes/Remotes";
import { TSlotAssignmentButton } from "./SlotAssignmentButtonTypes";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

export default class SlotAssignmentButton {
	public Button: TSlotAssignmentButton = StorageManager.CloneFromStorage(
		"SlotAssignmentButton_Template",
	) as TSlotAssignmentButton;

	private _remoteAssignSlot = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.AssignSkillSlot);

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
