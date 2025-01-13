import { AnimationIds } from "./Animations";
import { ImageIds } from "./ImageIds";
import { Skill } from "@rbxts/wcs";
import { ResourceId } from "./Resources";
import { ESoundId } from "./Sounds";

// Skill IDs
export type SkillId =
	| "BasicMelee"
	| "BasicRanged"
	| "BasicHold"
	| "SpiritOrb"
	| "Teleport"
	| "Dash"
	| "MultiJump"
	| "Fly"
	| "Meditate"
	| "Charge";

// Skill Type
export type SkillType = "Melee" | "Ranged" | "Hold" | "Utility" | "Movement";


// Skill Definition
export interface SkillDefinition {
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

export type SkillResource = {
	resourceId: ResourceId;
	amount: number;
};

const DEFAULT_RESOURCE_MANA: SkillResource = {
	resourceId: "Mana",
	amount: 30,
};

const DEFAULT_RESOURCE_HEALTH: SkillResource = {
	resourceId: "Health",
	amount: 20,
};

const DEFAULT_RESOURCE_STAMINA: SkillResource = {
	resourceId: "Stamina",
	amount: 40,
};

// TODO: MAP Asset IDs for Icons, Animations, and Audio
export const SkillDefinitions: Record<SkillId, SkillDefinition> = {
	BasicMelee: {
		displayName: "Melee Strike",
		skillType: "Melee",
		wcsSkillId: "BasicMelee",
		description: "Strike with fury, Its like boxing but with swords and more ouch .",
		icon: ImageIds.BasicMelee,
		animation: AnimationIds.SKILL_BasicMelee,
		audio: ESoundId.BasicMelee,
		cooldown: 5,
		baseDamage: 8,
		resource: DEFAULT_RESOURCE_STAMINA,
	},
	BasicRanged: {
		displayName: "Ranged Attack",
		skillType: "Ranged",
		wcsSkillId: "BasicRanged",
		description: "Strike a single target with spirit ball.",
		icon: ImageIds.BasicRanged,
		animation: AnimationIds.SKILL_BasicRanged,
		audio: ESoundId.BasicRanged,
		cooldown: 8,
		baseDamage: 111,
		resource: DEFAULT_RESOURCE_STAMINA,
	},
	BasicHold: {
		displayName: "Hold ME",
		wcsSkillId: "BasicHold",
		skillType: "Hold",
		description: "Restore your health or an ally’s.",
		icon: ImageIds.BasicHold,
		animation: AnimationIds.SKILL_LifeDrain,
		audio: ESoundId.BasicHold,
		cooldown: 10,
		resource: DEFAULT_RESOURCE_MANA,
	},
	SpiritOrb: {
		displayName: "Spirit Orb",
		skillType: "Ranged",
		wcsSkillId: "BasicRanged",
		description: "Strike a single target with spirit ball.",
		icon: ImageIds.SimpleSoul,
		animation: AnimationIds.SKILL_Fart,
		audio: ESoundId.SpiritOrb,
		cooldown: 8,
		resource: DEFAULT_RESOURCE_MANA,
	},
	Teleport: {
		displayName: "Teleport",
		wcsSkillId: "Teleport",
		skillType: "Utility",
		description: "Teleport to a short distance.",
		icon: ImageIds.ArmorDK,
		animation: AnimationIds.SKILL_Fart,
		audio: ESoundId.Teleport,
		cooldown: 15,
		resource: DEFAULT_RESOURCE_MANA,
	},
	Dash: {
		displayName: "Dash",
		wcsSkillId: "Dash",
		skillType: "Movement",
		description: "Dash forward quickly.",
		icon: ImageIds.ArmorDK,
		animation: AnimationIds.SKILL_Fart,
		audio: ESoundId.Dash,
		cooldown: 12,
		resource: DEFAULT_RESOURCE_STAMINA,
	},
	MultiJump: {
		displayName: "Double Jump",
		wcsSkillId: "MultiJump",
		skillType: "Movement",
		description: "Jump in mid-air a second time.",
		icon: "rbxassetid://139595831174835",
		animation: AnimationIds.SKILL_Fart,
		audio: ESoundId.Dash,
		cooldown: 0,
		resource: DEFAULT_RESOURCE_MANA,
	},
	Fly: {
		displayName: "Fly",
		wcsSkillId: "Fly",
		skillType: "Movement",
		description: "Gain the ability to fly.",
		icon: ImageIds.ArmorDK,
		animation: AnimationIds.SKILL_Fart,
		audio: ESoundId.Fly,
		cooldown: 30,
		resource: DEFAULT_RESOURCE_MANA,
	},
	Meditate: {
		displayName: "Meditate",
		wcsSkillId: "Meditate",
		skillType: "Utility",
		description: "Regenerate health and mana.",
		icon: ImageIds.ArmorDK,
		animation: AnimationIds.SKILL_Fart,
		audio: ESoundId.Meditate,
		cooldown: 20,
		resource: DEFAULT_RESOURCE_MANA,
	},
	Charge: {
		displayName: "Charge",
		wcsSkillId: "Charge",
		skillType: "Utility",
		description: "Charge your mana reserves.",
		icon: ImageIds.ArmorDK,
		animation: AnimationIds.SKILL_Fart,
		audio: ESoundId.Charge,
		cooldown: 18,
		resource: DEFAULT_RESOURCE_MANA,
	},
	// ... add additional skills here
};

// Player Skills Data
export interface PlayerSkillsData {
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

// Default Player Skills Data
export function getDefaultPlayerSkillsData(): PlayerSkillsData {
	return {
		unlockedSkills: ["BasicMelee", "BasicRanged", "BasicHold", "Teleport", "Dash", "Charge", "Fly"],
		assignedSlots: ["BasicMelee", "BasicRanged", "BasicHold", "Charge", "Dash"],
	};
}

// Unlock a skill for the player
export function unlockSkill(skillData: PlayerSkillsData, skillId: SkillId): void {
	if (!skillData.unlockedSkills.includes(skillId)) {
		skillData.unlockedSkills.push(skillId);
	}
}

// Assign a skill to a slot
export function assignSkillToSlot(skillData: PlayerSkillsData, skillId: SkillId, slotIndex: number): void {
	// Validate slot index
	if (slotIndex < 0 || slotIndex > 4) {
		throw `Slot index must be between 0 and 4 (got ${slotIndex}).`;
	}
	// Ensure the skill is unlocked before assigning
	if (!skillData.unlockedSkills.includes(skillId)) {
		throw `Player has not unlocked the skill: ${skillId}.`;
	}
	// Assign
	skillData.assignedSlots[slotIndex] = skillId;
}

// Unassign a skill from a slot
export function unassignSlot(skillData: PlayerSkillsData, slotIndex: number): void {
	if (slotIndex < 0 || slotIndex > 4) {
		throw `Slot index must be between 0 and 4 (got ${slotIndex}).`;
	}
	skillData.assignedSlots[slotIndex] = undefined;
}

// Get the name of the skill in a slot
export function getSkillNameFromSlotNumber(skillData: PlayerSkillsData, slotIndex: number): string {
	if (slotIndex < 0 || slotIndex > 4) {
		throw `Slot index must be between 0 and 4 (got ${slotIndex}).`;
	}
	const skillId = skillData.assignedSlots[slotIndex];
	if (!skillId) {
		return "Empty";
	}
	const skillDef = SkillDefinitions[skillId];
	return skillDef.wcsSkillId;
}

// Get the skill definitions for all assigned skills
export function getAssignedSkillDefinitions(skillData: PlayerSkillsData): Array<SkillDefinition> {
	const returnArray: Array<SkillDefinition> = [];

	skillData.unlockedSkills.forEach((skillId, index) => {
		const assignedSkillId = skillData.assignedSlots[index];
		if (assignedSkillId) {
			const skillDef = SkillDefinitions[assignedSkillId];
			returnArray.push(skillDef);
		}
	});

	return returnArray;
}

// Get the skill definition for a specific skill ID
export function getSkillDefinition(skillId: SkillId): SkillDefinition {
	const skillDef = SkillDefinitions[skillId];
	if (!skillDef) {
		throw `Skill definition not found for skill ID: ${skillId}`;
	}
	return skillDef;
}
