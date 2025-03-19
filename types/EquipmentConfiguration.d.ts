type BloodRobes = Configuration & {
	ItemInfo: Configuration & {
		ItemImageId: StringValue;
		AccessoryObj: ObjectValue;
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
}
