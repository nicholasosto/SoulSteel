import { SkillType, SkillResource, SkillId } from "./SkillTypes";
import { ResourceId } from "server/Character/Character Resources/Resources";

// Player Skills Data
interface PlayerSkillsData {
	/**
	 * All the skill IDs that this player has unlocked.
	 * Could be an array or a Set-like structure.
	 */
	unlockedSkills: SkillId[];

	/**
	 * Which skill is assigned to each of the 5 slots in the action bar.
	 * If a slot isn’t assigned, store `undefined`.
	 */
	assignedSlots: Array<SkillId | undefined>;
}

// Skill Data
// interface SkillData {
// 	id: string; // Unique identifier for the skill
// 	name: string; // Display name of the skill
// 	description: string; // Brief description of the skill
// 	icon: string; // Path or key for the skill's icon
// 	cooldown: number; // Cooldown time in seconds
// 	currentCooldown?: number; // Remaining cooldown time, optional
// 	resourceCost: number; // Cost of the resource required to use the skill
// 	resourceType: ResourceId; // Type of resource consumed
// 	isUnlocked: boolean; // Whether the skill is unlocked for use
// 	assigned?: boolean; // Whether the skill is assigned to a slot
// 	slot?: number; // Optional slot number for assigned skills
// }

// Skill Definition
interface SkillDefinition {
	displayName: string;
	wcsSkillId: string;
	description: string;
	icon: string; // rbxassetid:// etc.
	cooldown: number; // example field
	animation: string; // example field
	audio: string; // example field
	skillType: SkillType; // example field
	baseDamage?: number; // example field
	resource: SkillResource;
}

export { PlayerSkillsData, SkillDefinition };
