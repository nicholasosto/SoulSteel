import { SkillId } from "shared/_IDs/SkillIndex";

/* IDs */
type PanelId = "SkillPanel" | "CharacterPanel" | "EquipmentPanel";
type SlotMapId = "SkillSlotMap" | "EquipmentSlotMap";
type ResourceId = "Health" | "Stamina" | "SoulPower" | "DomainEssence" | "Experience";
type SkillSlotId = "Slot_01" | "Slot_02" | "Slot_03" | "Slot_04" | "Slot_05";
type EquipmentSlotId = "Head" | "Chest" | "Legs";
type EquipmentId = "Helmet_01" | "Armor_01" | "Leggings_01";

/* Payloads */
/* Resource Bars */
type PResourceBar = {
	resourceId: ResourceId;
	current: number;
	max: number;
};
/* Resource Bars */
type PResourceBars = {
	[resourceId: string]: PResourceBar;
};

/* Payload - InfoFrame */
interface PInfoFrame {
	Level: number;
	Name: string;
	Health: PResourceBar;
	Stamina: PResourceBar;
	SoulPower: PResourceBar;
	DomainEssence: PResourceBar;
	Experience: PResourceBar;
}

/* Payload - Generic Slot Map */
type PSkillSlotMap = Map<SkillSlotId, SkillId>;
type PEquipmentSlotMap = Map<EquipmentSlotId, EquipmentId>;

export {
	PanelId,
	SlotMapId,
	ResourceId,
	SkillId,
	PResourceBar,
	PResourceBars,
	PInfoFrame,
	PSkillSlotMap,
	PEquipmentSlotMap,
};
