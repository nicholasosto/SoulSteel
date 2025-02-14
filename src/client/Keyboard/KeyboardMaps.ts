import { SkillId } from "shared/_IDs/IDs_Skill";
// Set the skills here
const SkillKeyMap: Map<Enum.KeyCode, SkillId> = new Map<Enum.KeyCode, SkillId>();
SkillKeyMap.set(Enum.KeyCode.Q, "BasicMelee");
SkillKeyMap.set(Enum.KeyCode.E, "BasicRanged");
SkillKeyMap.set(Enum.KeyCode.R, "BasicHold");

export { SkillKeyMap };
