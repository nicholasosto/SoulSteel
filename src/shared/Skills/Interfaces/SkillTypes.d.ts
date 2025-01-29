import { ResourceId } from "../../_References/Resources";

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
	| "Charge";

type SkillResource = {
	resourceId: ResourceId;
	amount: number;
};

// GUI:  Skill Assignment Button
type Skill_Assignment_Button = ImageButton & {
	Hover: ImageLabel;
	Scripts: Folder & {
		ExtendTextButtonLocalScript: LocalScript;
	};
	SlotNumber: NumberValue;
	SkillId: StringValue;
};

export { SkillType, SkillId, SkillResource, Skill_Assignment_Button };
