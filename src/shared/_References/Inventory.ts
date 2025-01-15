import { SkillId } from "shared/Skills/SkillIndex";

// Inventory Types
export enum InventoryType {
	Weapon = "Weapon",
	Armor = "Armor",
	Helmet = "Helmet",
	Familiar = "Familiar",
	Accessory = "Accessory",
	Skill = "Skill",
	Consumable = "Consumable",
	Other = "Other",
}

export enum ItemId {
	// Weapons
	ShortSword = "ShortSword",
	LongSword = "LongSword",
	// Armor
	LeatherArmor = "LeatherArmor",
	ChainMail = "ChainMail",
	// Helmets
	LeatherHelmet = "LeatherHelmet",
	ChainHelmet = "ChainHelmet",
	// Familiars
	// Accessories
	// Skills
	// SkillId
	// SkillId
	// SkillId
	// SkillId
	// SkillId
}

export interface IInventoryItem {
	inventoryType: InventoryType;
	itemId: ItemId;
	imageAssetId: string;
}

export class InventoryItem implements IInventoryItem {
	public inventoryType: InventoryType;
	public itemId: ItemId;
	public imageAssetId: string;

	constructor(inventoryType: InventoryType, itemId: ItemId, imageAssetId: string) {
		this.inventoryType = inventoryType;
		this.itemId = itemId;
		this.imageAssetId = imageAssetId;
	}
}

export const DefaultInventory: Map<InventoryType, InventoryItem> = new Map([
	[InventoryType.Weapon, new InventoryItem(InventoryType.Weapon, ItemId.ShortSword, "rbxassetid://0")],
	[InventoryType.Armor, new InventoryItem(InventoryType.Armor, ItemId.LeatherArmor, "rbxassetid://0")],
	[InventoryType.Helmet, new InventoryItem(InventoryType.Helmet, ItemId.LeatherHelmet, "rbxassetid://0")],
	[InventoryType.Familiar, new InventoryItem(InventoryType.Familiar, ItemId.LeatherHelmet, "rbxassetid://0")],
	[InventoryType.Accessory, new InventoryItem(InventoryType.Accessory, ItemId.LeatherHelmet, "rbxassetid://0")],
	[InventoryType.Skill, new InventoryItem(InventoryType.Skill, ItemId.LeatherArmor, "rbxassetid://0")],
	[InventoryType.Consumable, new InventoryItem(InventoryType.Consumable, ItemId.LeatherHelmet, "rbxassetid://0")],
	[InventoryType.Other, new InventoryItem(InventoryType.Other, ItemId.LeatherHelmet, "rbxassetid://0")],
]);

export type Weapon = {
	inventoryType: InventoryType.Weapon;
};
// Temp Types for now
//TODO: Move to shared
export type EquipmentId = string;
export type FamiliarId = string;
export type AccessoryId = string;
export type WeaponId = string;
//Move to shared END

// INVENTORY Events
export enum EInventoryEvent {
	EquipRequest = "INVENTORY_EquipRequest",
	UnequipRequest = "INVENTORY_UnequipRequest",
	EquipResponse = "INVENTORY_EquipResponse",
	UnequipResponse = "INVENTORY_UnequipResponse",
	UnlockRequest = "INVENTORY_UnlockRequest",
	UnlockResponse = "INVENTORY_UnlockResponse",
}

// Attachment Names
export enum EInventorySlot {
	LeftHand = "LeftGripAttachment",
	RightHand = "RightGripAttachment",
	Helmet = "HatAttachment",
	Body = "BodyFrontAttachment",
	Familiar = "RightAnkleRigAttachment",
	Accessory = "BodyBackAttachment",
}

// Inventory Mappping
export enum EInventoryNames {
	Skills = "SkillInventory",
	Weapon = "WeaponInventory",
	Armor = "ArmorInventory",
	Helmet = "HelmetInventory",
	Familiar = "FamiliarInventory",
	Accessory = "AccessoryInventory",
}
