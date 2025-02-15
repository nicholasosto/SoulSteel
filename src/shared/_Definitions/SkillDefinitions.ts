import { EAnimationID } from "shared/Animation/AnimationIndex";
import { ImageIds } from "shared/_Enums/EImageId";
import { ESoundId } from "shared/Audio/Sounds";
import { SkillId } from "shared/_IDs/IDs_Skill";
import  ISkillDefinition from "shared/_Interfaces/ISkillDefinition";
import { DEFAULT_RESOURCE_MANA, DEFAULT_RESOURCE_STAMINA } from "./SkillConstants";

const SkillDefinitions: Record<SkillId, ISkillDefinition> = {
	BasicMelee: {
		displayName: "Melee Strike",
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
		description: "Restore your health or an ally’s.",
		icon: ImageIds.BasicHold,
		animation: EAnimationID.BasicHold,
		audio: ESoundId.BasicHold,
		cooldown: 10,
		resource: DEFAULT_RESOURCE_MANA,
	},
};

export { SkillDefinitions };
