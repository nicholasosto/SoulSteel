import IItemDefinition from "shared/_Interfaces/IItemDefinition";

const ItemDefinitionsMap: Map<string, IItemDefinition> = new Map<string, IItemDefinition>();

function AddItemDefinition(
	itemId: string,
	itemDisplayName: string,
	imageId: string,
	locked: boolean,
	lockedMessage: string,
) {
	ItemDefinitionsMap.set(itemId, {
		itemId: itemId,
		displayName: itemDisplayName,
		imageId: imageId,
		locked: locked,
		lockedMessage: lockedMessage,
	});
}

AddItemDefinition("TestItem", "Test Item", "rbxassetid://130880763001331", false, "This item is locked");
AddItemDefinition("TestItem2", "Test Item Locked", "rbxassetid://130880763001331", true, "This item is locked");

export default ItemDefinitionsMap;
