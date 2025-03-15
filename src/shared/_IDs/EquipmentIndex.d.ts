// Skill IDs
export type EquipmentId = "Helmet_01" | "Armor_01" | "Leggings_01" | "Boots_01" | "Gloves_01";
export type EquipmentSlotId = "Head" | "Chest" | "Legs" | "Feet" | "Hands";

export type EquipmentPanelData = {
	SlotMap: Map<EquipmentSlotId, EquipmentId>;
	UnlockedItems: EquipmentId[];
};
export type EquipmentSlotMap = Map<EquipmentSlotId, EquipmentId>;
