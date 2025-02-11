import { SkillType, SkillResource, SkillId } from "shared/_Types/SkillTypes";

// Skill Definition
interface SkillDefinition {
	displayName: string;
	wcsSkillId: SkillId;
	description: string;
	icon: string; // rbxassetid:// etc.
	cooldown: number; // example field
	animation: string; // example field
	audio: string; // example field
	skillType: SkillType; // example field
	baseDamage?: number; // example field
	resource: SkillResource;
}

/* Player Skills Data */
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

export { SkillDefinition, PlayerSkillsData };
