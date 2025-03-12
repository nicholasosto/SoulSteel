type ItemType = "Skill" | "Equipment" | "Consumable" | "Quest";
type ItemConfig = Configuration & {
	ItemId: StringValue;
	ItemDisplayName: StringValue;
	ItemType: StringValue;
	ItemDescription: StringValue;
	ItemImageId: StringValue;
};

type GameItemIcon = Frame & {
	Content: Frame & {
		ItemImage: ImageLabel;
		DisplayName: TextLabel;
		IDLabel: TextLabel;
	};
};

type ItemData = {
	itemId: string;
	itemDisplayName: string;
	itemType: ItemType;
	itemDescription: string;
	itemImageId: string;
};

export { ItemType, ItemConfig, GameItemIcon, ItemData };
