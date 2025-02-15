import { SkillId } from "shared/_IDs/IDs_Skill";
import { TSkillResource } from "shared/_Types/TSkillResource";

// Skill Definition
export default interface ISkillDefinition {
	displayName: string;
	wcsSkillId: SkillId;
	description: string;
	icon: string; // rbxassetid:// etc.
	cooldown: number; // example field
	animation: string; // example field
	audio: string; // example field
	baseDamage?: number; // example field
	resource: TSkillResource;
}
