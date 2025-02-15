import { IPlayerData } from "shared/_Interfaces/IPlayerData";
import { SkillId } from "shared/_IDs/IDs_Skill";

export default interface ISkillManager {
	SkillMap: Map<number, SkillId>;
	UnlockedSkills: Array<SkillId>;
	InitializeSkillMap(playerData: IPlayerData): void;
	AssignSkillToSlot(slot: number, skillId: SkillId): void;
	RemoveSkillFromSlot(slot: number): void;
}
