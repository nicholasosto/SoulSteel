import GameItemManager, { ItemType, ItemData } from "shared/GameItemManager/GameItemManager";
import StorageManager from "shared/Storage/StorageManager";
import { PlayerGUI } from "client/_Helpers/GUI_Index";
import StatefulFrame, { GameItemFrameState } from "client/GUI_ComponentClasses/Frames/StatefulFrame";
import GuiStateComponent from "shared/Systems/GUIStateHandlers";

export default class SkillPanelController {
	private _screenGui: ScreenGui;
	private _itemType: ItemType;
	private _scrollingFrame: ScrollingFrame;
	private _items: ItemData[];
	private _itemNameLabel: TextLabel;
	private _itemDescriptionLabel: TextLabel;

	constructor(itemType: ItemType) {
		/* Clone the Panel */
		this._screenGui = StorageManager.CloneFromStorage("ListItemPanel_Template") as ScreenGui;
		this._screenGui.Name = "ListItemPanel - " + itemType;
		this._screenGui.Parent = PlayerGUI;

		/* Set the Item Type */
		this._itemType = itemType;

		/* Get the Objects from References */
		const ovFolder = this._screenGui.FindFirstChild("ObjectReferences") as Folder;
		this._scrollingFrame = (ovFolder.FindFirstChild("SFContainerOV") as ObjectValue).Value as ScrollingFrame;
		this._itemNameLabel = (ovFolder.FindFirstChild("ItemNameOV") as ObjectValue).Value as TextLabel;
		this._itemDescriptionLabel = (ovFolder.FindFirstChild("ItemDescriptionOV") as ObjectValue).Value as TextLabel;

		/* Load the Item Data */ //#TODO: Replace with GameItemManager
		this._items = GameItemManager.GetItemsOfType(this._itemType);
		warn("ListItemPanel: Instantiated with ", this._items, " items of type: ", this._itemType);
		this._PopulateItems();
	}

	private _PopulateItems() {
		GameItemManager.PopulateScrollingFrame(this._scrollingFrame, this._itemType);
		this._scrollingFrame
			.GetChildren()
			.filter((child) => child.IsA("Frame"))
			.forEach((child) => {
				const frame = child as Frame;
				const statefulFrame = new GuiStateComponent(frame)
			});
	}

	private _SetItemDescription(itemData: ItemData) {
		this._itemNameLabel.Text = itemData.itemDisplayName;
		this._itemDescriptionLabel.Text = itemData.itemDescription;
	}


}
