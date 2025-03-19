import { SkillId, SkillSlotId } from "shared/_IDs/SkillIndex";
import { EquipmentId, EquipmentSlotId } from "shared/_IDs/EquipmentIndex";

type ResourceId = "Health" | "Stamina" | "SoulPower" | "DomainEssence" | "Experience";

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

type PCurrentResourceAmounts = {
	Health: number;
	Stamina: number;
	SoulPower: number;
	DomainEssence: number;
	Experience: number;
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
	ResourceId,
	SkillId,
	PResourceBar,
	PResourceBars,
	PInfoFrame,
	PSkillSlotMap,
	PEquipmentSlotMap,
	PCurrentResourceAmounts,
};
