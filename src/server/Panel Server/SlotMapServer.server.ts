import { RemoteFunctions } from "shared/net/Remotes";
import { SlotMapId, TSlotMap } from "shared/net/RemoteIndex";
import { SkillId, SkillSlotId } from "shared/_IDs/SkillIndex";
import { EquipmentId, EquipmentSlotId } from "shared/_IDs/EquipmentIndex";

const GetSlotMapData = RemoteFunctions.Server.Get("GetSlotMapData");

GetSlotMapData.SetCallback((player, slotMapId) => {
	let slotMap: TSlotMap | undefined;
	switch (slotMapId) {
		case "SkillSlotMap":
			return GetSkillSlotMap();
		case "EquipmentSlotMap":
			return GetEquipmentSlotMap();
		default:
			return undefined;
	}
});

function GetSkillSlotMap() {
	// This function can be expanded to fetch actual skill slot data
	const skillSlotMap = new Map<SkillSlotId, SkillId>();

	// Example: Assigning some skill slots
	skillSlotMap.set("Slot_01", "BasicMelee");
	skillSlotMap.set("Slot_02", "HallowHold");

	return skillSlotMap as TSlotMap;
}

function GetEquipmentSlotMap() {
	// This function can be expanded to fetch actual skill slot data
	const skillSlotMap = new Map<EquipmentSlotId, EquipmentId>();

	// Example: Assigning some skill slots
	skillSlotMap.set("Head", "Helmet_01");
	skillSlotMap.set("Chest", "Armor_01");
	skillSlotMap.set("Legs", "Leggings_01");

	return skillSlotMap as TSlotMap;
}
