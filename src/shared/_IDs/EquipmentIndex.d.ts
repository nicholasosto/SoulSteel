/* Equipment Id */
export type EquipmentId = "Helmet_01" | "Armor_01" | "Leggings_01" | "Boots_01" | "Gloves_01";

/* Equipment Slot */
export type EquipmentSlotId = "Weapon" | "Helmet" | "Armor" | "Accessory" | "Familiar";

/* Equipment Panel Data */
export type EquipmentPanelData = {
	SlotMap: Map<EquipmentSlotId, EquipmentId>;
	UnlockedItems: EquipmentId[];
};

/* Equipment Slot Map */
export type EquipmentSlotMap = Map<EquipmentSlotId, EquipmentId>;

/* Equipment Configuration */
export type EquipmentConfiguration = Configuration & {
	AccessoryObj: ObjectValue;

	ItemInfo: Configuration & {
		ItemImageId: StringValue;
		ItemType: StringValue;
		ItemDescription: StringValue;
		ItemDisplayName: StringValue;
		ItemId: StringValue;
	};

	EquipmentModifiers: Configuration & {
		Dexterity: NumberValue;
		Constitution: NumberValue;
		Speed: NumberValue;
		Strength: NumberValue;
		Intelligence: NumberValue;
	};
};
