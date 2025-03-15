import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import { SkillId } from "shared/_IDs/SkillIndex";

export default interface ISkillManager {
	SkillMap: Map<number, SkillId>;
	UnlockedSkills: Array<SkillId>;
	InitializeSkillMap(playerData: IPlayerData): void;
	OnEquipSkillSlot(slot: number, skillId: SkillId): void;
	OnUnequipSkillSlot(slot: number): void;
}
