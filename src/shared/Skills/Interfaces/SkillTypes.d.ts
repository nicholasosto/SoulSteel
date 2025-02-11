import { ResourceId } from "../../../server/Character/Character Resources/Resources";

// Skill Type
type SkillType = "Melee" | "Ranged" | "Hold" | "Utility" | "Movement";

// Skill IDs
type SkillId =
	| "BasicMelee"
	| "BasicRanged"
	| "BasicHold"
	| "SpiritOrb"
	| "Teleport"
	| "Dash"
	| "MultiJump"
	| "Fly"
	| "Meditate"
	| "Charge"
	| "None";

type SkillResource = {
	resourceId: ResourceId;
	amount: number;
};

export { SkillType, SkillId, SkillResource };
