import { EAnimationID } from "../../Animation/AnimationIndex";
import { ImageIds } from "../../_References/ImageIds";
import { ESoundId } from "../../_References/Sounds";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { SkillData, SkillDefinition, PlayerSkillsData } from "shared/Skills/Interfaces/SkillInterfaces";
import { DEFAULT_RESOURCE_MANA, DEFAULT_RESOURCE_STAMINA } from "./SkillConstants";

const SkillDefinitions: Record<SkillId, SkillDefinition> = {
	BasicMelee: {
		displayName: "Melee Strike",
		skillType: "Melee",
		wcsSkillId: "BasicMelee",
		description: "Strike with fury, Its like boxing but with swords and more ouch .",
		icon: ImageIds.BasicMelee,
		animation: EAnimationID.SKILL_BasicMelee,
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
		animation: EAnimationID.SKILL_BasicRanged,
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
		animation: EAnimationID.SKILL_LifeDrain,
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
		animation: EAnimationID.SKILL_Fart,
		audio: ESoundId.SpiritOrb,
		cooldown: 8,
		resource: DEFAULT_RESOURCE_MANA,
	},
	Teleport: {
		displayName: "Teleport",
		wcsSkillId: "Teleport",
		skillType: "Utility",
		description: "Teleport to a short distance.",
		icon: ImageIds.Teleport,
		animation: EAnimationID.SKILL_Fart,
		audio: ESoundId.Teleport,
		cooldown: 15,
		resource: DEFAULT_RESOURCE_MANA,
	},
	Dash: {
		displayName: "Dash",
		wcsSkillId: "Dash",
		skillType: "Movement",
		description: "Dash forward quickly.",
		icon: ImageIds.Dash,
		animation: EAnimationID.SKILL_Fart,
		audio: ESoundId.Dash,
		cooldown: 12,
		resource: DEFAULT_RESOURCE_STAMINA,
	},
	MultiJump: {
		displayName: "Double Jump",
		wcsSkillId: "MultiJump",
		skillType: "Movement",
		description: "Jump in mid-air a second time.",
		icon: ImageIds.Dash,
		animation: EAnimationID.SKILL_Fart,
		audio: ESoundId.Dash,
		cooldown: 0,
		resource: DEFAULT_RESOURCE_MANA,
	},
	Fly: {
		displayName: "Fly",
		wcsSkillId: "Fly",
		skillType: "Movement",
		description: "Gain the ability to fly.",
		icon: ImageIds.Flight,
		animation: EAnimationID.SKILL_Fart,
		audio: ESoundId.Fly,
		cooldown: 30,
		resource: DEFAULT_RESOURCE_MANA,
	},
	Meditate: {
		displayName: "Meditate",
		wcsSkillId: "Meditate",
		skillType: "Utility",
		description: "Regenerate health and mana.",
		icon: ImageIds.DefaultIcon,
		animation: EAnimationID.SKILL_Fart,
		audio: ESoundId.Meditate,
		cooldown: 20,
		resource: DEFAULT_RESOURCE_MANA,
	},
	Charge: {
		displayName: "Charge",
		wcsSkillId: "Charge",
		skillType: "Utility",
		description: "Charge your mana reserves.",
		icon: ImageIds.Charge,
		animation: EAnimationID.SKILL_Fart,
		audio: ESoundId.Charge,
		cooldown: 18,
		resource: DEFAULT_RESOURCE_MANA,
	},
	// ... add additional skills here
};

function getSkillDefinitionMap(): Map<SkillId, SkillDefinition> {
	const skillDefinitionMap = new Map<SkillId, SkillDefinition>();
	skillDefinitionMap.set("BasicHold", SkillDefinitions.BasicHold);
	skillDefinitionMap.set("BasicMelee", SkillDefinitions.BasicMelee);
	skillDefinitionMap.set("BasicRanged", SkillDefinitions.BasicRanged);
	skillDefinitionMap.set("SpiritOrb", SkillDefinitions.SpiritOrb);
	skillDefinitionMap.set("Teleport", SkillDefinitions.Teleport);
	skillDefinitionMap.set("Dash", SkillDefinitions.Dash);
	skillDefinitionMap.set("MultiJump", SkillDefinitions.MultiJump);
	skillDefinitionMap.set("Fly", SkillDefinitions.Fly);
	skillDefinitionMap.set("Meditate", SkillDefinitions.Meditate);
	skillDefinitionMap.set("Charge", SkillDefinitions.Charge);
	// ... add additional skills here

	return skillDefinitionMap;
}

function getSkillDefinition(skillId: SkillId): SkillDefinition {
	const skillDefinition = SkillDefinitions[skillId];
	if (!skillDefinition) {
		throw `SkillDefinition not found for skillId: ${skillId}`;
	}
	return skillDefinition;
}

function getDefaultPlayerSkillsData(): PlayerSkillsData {
	const defaultPlayerSkillsData: PlayerSkillsData = {
		unlockedSkills: ["BasicMelee", "BasicRanged", "BasicHold"],
		assignedSlots: ["BasicMelee", "BasicRanged", undefined, undefined, undefined],
	};
	return defaultPlayerSkillsData;
}

export { SkillDefinitions, getSkillDefinitionMap, getSkillDefinition, getDefaultPlayerSkillsData };
