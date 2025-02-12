import { EAnimationID } from "shared/Animation/AnimationIndex";
import { ImageIds } from "shared/Epic UI/ImageIds";
import { ESoundId } from "shared/Audio/Sounds";
import { SkillId } from "shared/_Types/SkillTypes";
import { SkillDefinition } from "shared/_Interfaces/SkillInterfaces";
import { DEFAULT_RESOURCE_MANA, DEFAULT_RESOURCE_STAMINA } from "./SkillConstants";

const SkillDefinitions: Record<SkillId, SkillDefinition> = {
	BasicMelee: {
		displayName: "Melee Strike",
		skillType: "Melee",
		wcsSkillId: "BasicMelee",
		description: "Strike with fury, Its like boxing but with swords and more ouch .",
		icon: ImageIds.BasicMelee,
		animation: EAnimationID.BasicMelee,
		audio: ESoundId.BasicMelee,
		cooldown: 5,
		baseDamage: 12,
		resource: DEFAULT_RESOURCE_STAMINA,
	},
	BasicRanged: {
		displayName: "Ranged Attack",
		skillType: "Ranged",
		wcsSkillId: "BasicRanged",
		description: "Strike a single target with spirit ball.",
		icon: ImageIds.BasicRanged,
		animation: EAnimationID.BasicRanged,
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
		animation: EAnimationID.BasicHold,
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
		animation: EAnimationID.MoonPartAnimation,
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
		animation: EAnimationID.MoonPartAnimation,
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
		animation: EAnimationID.Dash,
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
		animation: EAnimationID.MoonPartAnimation,
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
		animation: EAnimationID.Fly,
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
		animation: EAnimationID.MoonPartAnimation,
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
		animation: EAnimationID.MoonPartAnimation,
		audio: ESoundId.Charge,
		cooldown: 18,
		resource: DEFAULT_RESOURCE_MANA,
	},
	None: {
		displayName: "Unassigned",
		wcsSkillId: "None",
		skillType: "Utility",
		description: "No skill assigned.",
		icon: ImageIds.DefaultIcon,
		animation: EAnimationID.MoonPartAnimation,
		audio: ESoundId.None,
		cooldown: 0,
		resource: DEFAULT_RESOURCE_MANA,
	},
	// ... add additional skills here
};

export { SkillDefinitions };
