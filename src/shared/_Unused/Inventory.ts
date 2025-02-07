// // Inventory Types
// enum InventoryType {
// 	Weapon = "Weapon",
// 	Armor = "Armor",
// 	Helmet = "Helmet",
// 	Familiar = "Familiar",
// 	Accessory = "Accessory",
// 	Skill = "Skill",
// 	Consumable = "Consumable",
// 	Other = "Other",
// }

// enum ItemId {
// 	// Weapons
// 	ShortSword = "ShortSword",
// 	LongSword = "LongSword",
// 	// Armor
// 	LeatherArmor = "LeatherArmor",
// 	ChainMail = "ChainMail",
// 	// Helmets
// 	LeatherHelmet = "LeatherHelmet",
// 	ChainHelmet = "ChainHelmet",
// }

// interface IInventoryItem {
// 	inventoryType: InventoryType;
// 	itemId: ItemId;
// 	imageAssetId: string;
// }

// // Temp Types for now
// type EquipmentId = string; //TODO: Add EquipmentId's
// type EquipmentSlotId = string; //TODO: Add EquipmentSlotId's
// type FamiliarId = string; //TODO: Add FamiliarId's
// type AccessoryId = string; //TODO: Add AccessoryId's
// type WeaponId = string; //TODO: Add WeaponId's

// class InventoryItem implements IInventoryItem {
// 	public inventoryType: InventoryType;
// 	public itemId: ItemId;
// 	public imageAssetId: string;

// 	constructor(inventoryType: InventoryType, itemId: ItemId, imageAssetId: string) {
// 		this.inventoryType = inventoryType;
// 		this.itemId = itemId;
// 		this.imageAssetId = imageAssetId;
// 	}
// }

// export { InventoryType, ItemId, InventoryItem, EquipmentId, EquipmentSlotId, FamiliarId, AccessoryId, WeaponId };

// const DefaultInventory: Map<InventoryType, InventoryItem> = new Map([
// 	[InventoryType.Weapon, new InventoryItem(InventoryType.Weapon, ItemId.ShortSword, "rbxassetid://0")],
// 	[InventoryType.Armor, new InventoryItem(InventoryType.Armor, ItemId.LeatherArmor, "rbxassetid://0")],
// 	[InventoryType.Helmet, new InventoryItem(InventoryType.Helmet, ItemId.LeatherHelmet, "rbxassetid://0")],
// 	[InventoryType.Familiar, new InventoryItem(InventoryType.Familiar, ItemId.LeatherHelmet, "rbxassetid://0")],
// 	[InventoryType.Accessory, new InventoryItem(InventoryType.Accessory, ItemId.LeatherHelmet, "rbxassetid://0")],
// 	[InventoryType.Skill, new InventoryItem(InventoryType.Skill, ItemId.LeatherArmor, "rbxassetid://0")],
// 	[InventoryType.Consumable, new InventoryItem(InventoryType.Consumable, ItemId.LeatherHelmet, "rbxassetid://0")],
// 	[InventoryType.Other, new InventoryItem(InventoryType.Other, ItemId.LeatherHelmet, "rbxassetid://0")],
// ]);

// type Weapon = {
// 	inventoryType: InventoryType.Weapon;
// };

// // INVENTORY Events
// enum EInventoryEvent {
// 	EquipRequest = "INVENTORY_EquipRequest",
// 	UnequipRequest = "INVENTORY_UnequipRequest",
// 	EquipResponse = "INVENTORY_EquipResponse",
// 	UnequipResponse = "INVENTORY_UnequipResponse",
// 	UnlockRequest = "INVENTORY_UnlockRequest",
// 	UnlockResponse = "INVENTORY_UnlockResponse",
// }

// Attachment Names
// enum EInventorySlot {
// 	LeftHand = "LeftGripAttachment",
// 	RightHand = "RightGripAttachment",
// 	Helmet = "HatAttachment",
// 	Body = "BodyFrontAttachment",
// 	Familiar = "RightAnkleRigAttachment",
// 	Accessory = "BodyBackAttachment",
// }

// Inventory Mappping
// enum EInventoryNames {
// 	Skills = "SkillInventory",
// 	Weapon = "WeaponInventory",
// 	Armor = "ArmorInventory",
// 	Helmet = "HelmetInventory",
// 	Familiar = "FamiliarInventory",
// 	Accessory = "AccessoryInventory",
// }
