/* GameItemManager.ts */
// This file is responsible for managing all the item data in the game.
// It will load all the item data from the server and store it in a map.
// This map will be used to access item data when needed.
// This class is a singleton class, meaning there can only be one instance of it.

/* Imports */
import { ReplicatedStorage } from "@rbxts/services";
import { ItemType, ItemData, ItemConfig, GameItemIcon } from "./ItemTypes";

/* Types */
/* ===== Replicated Storage References ====== */
const AssetPackage_GameItems = ReplicatedStorage.WaitForChild("Asset Package - Game Items") as Folder;
const ItemTemplateFolder = AssetPackage_GameItems.WaitForChild("_Templates") as Folder;
const ItemConfigurationsFolder = AssetPackage_GameItems.WaitForChild("_Items") as Folder;

/* GUI Template  */
const ItemIconTemplate = ItemTemplateFolder.WaitForChild("GameItemIcon_Template") as GameItemIcon;

/* Helper Function - Get Data from Config */
function GetItemDataFromConfig(config: ItemConfig): ItemData {
	return {
		itemId: config.ItemId.Value,
		itemDisplayName: config.ItemDisplayName.Value,
		itemType: config.ItemType.Value as ItemType,
		itemDescription: config.ItemDescription.Value,
		itemImageId: config.ItemImageId.Value,
	};
}

/* GameItemManager Class */
export default class GameItemManager {
	private static instance: GameItemManager;
	private static itemData: Map<string, ItemData> = new Map();

	/* Private Constructor */
	private constructor() {}

	/* Start the Game Item Manager */
	public static Start() {
		if (this.instance === undefined) {
			this.instance = new GameItemManager();
			this.LoadItemMap();
		}
	}

	/* Load Item Data -  */
	private static LoadItemMap() {
		/* Get all the item templates from the folder */
		const folderDecendants = ItemConfigurationsFolder.GetDescendants();
		const itemTemplates = folderDecendants.filter((child) => child.IsA("Configuration"));
		itemTemplates.forEach((itemTemplate) => {
			const itemData = GetItemDataFromConfig(itemTemplate as ItemConfig);
			this.itemData.set(itemData.itemId, itemData);
			print("Registered Item: ", itemData.itemDisplayName);
		});
	}

	/* Get Item Data */
	private static GetItemData(itemId: string): ItemData | undefined {
		return this.itemData.get(itemId);
	}

	/* Get Items of Type */
	public static GetItemsOfType(itemType: ItemType): ItemData[] {
		const items = new Array<ItemData>();
		this.itemData.forEach((itemData) => {
			if (itemData.itemType === itemType) {
				items.push(itemData);
			}
		});
		return items;
	}

	/* Get Game Item Icon */
	private static CreateGameItemFrame(itemId: string): GameItemIcon | undefined {
		const itemData = this.GetItemData(itemId);
		if (itemData === undefined) {
			warn("Item Data not found for item id: ", itemId);
			return undefined;
		}

		/* Clone the Icon Frame Template */
		const icon = ItemIconTemplate.Clone();

		/* Set the Icon Data */
		icon.Content.ItemImage.Image = itemData.itemImageId;
		icon.Content.DisplayName.Text = itemData.itemDisplayName;
		icon.Content.IDLabel.Text = itemId;
		return icon;
	}

	public static PopulateScrollingFrame(frame: ScrollingFrame, itemType: ItemType) {
		const itemData = this.GetItemsOfType(itemType);
		itemData.forEach((itemData, itemId) => {
			const icon = this.CreateGameItemFrame(itemData.itemId);
			if (icon !== undefined) {
				icon.Parent = frame;
			}
		});
	}
}

export { ItemType, ItemData, ItemConfig, GameItemIcon };
