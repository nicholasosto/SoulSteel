import { SkillSlotMap, SkillPanelData } from "shared/_IDs/SkillIndex";
import { EquipmentSlotMap, EquipmentPanelData } from "shared/_IDs/EquipmentIndex";
import { ResourceId } from "shared/_IDs/IDs_Resource";

type ResourceBarData = {
	resourceId: ResourceId;
	current: number;
	max: number;
};

interface InfoFramePayload {
	Level: number;
	Name: string;
	Health: ResourceBarData;
	Stamina: ResourceBarData;
	SoulPower: ResourceBarData;
	DomainEssence: ResourceBarData;
	Experience: ResourceBarData;
}


type PanelId = "SkillPanel" | "CharacterPanel" | "EquipmentPanel";
type SlotMapId = "SkillSlotMap" | "EquipmentSlotMap";

type GenericPanelData = {
	StringMap: Map<string, string>;
	UnlockedItems: Array<string>;
};

type TPanelData = SkillPanelData | EquipmentPanelData | GenericPanelData;
type TSlotMap = SkillSlotMap | EquipmentSlotMap;

export { PanelId, SlotMapId, TPanelData, TSlotMap, GenericPanelData, InfoFramePayload, ResourceBarData };
