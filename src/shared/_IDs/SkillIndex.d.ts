// Skill IDs
export type SkillId = "BasicMelee" | "BasicRanged" | "BasicHold" | "HallowHold" | "Unassigned";
export type SkillSlotId = "Slot_01" | "Slot_02" | "Slot_03" | "Slot_04" | "Slot_05";
export type SkillPanelData = {
	SlotMap: Map<SkillSlotId, SkillId>;
	UnlockedSkills: SkillId[];
};
export type SkillSlotMap = Map<SkillSlotId, SkillId>;
