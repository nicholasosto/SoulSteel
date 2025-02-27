import { UnknownSkill } from "@rbxts/wcs";
export default interface IAnimationManager {
	OnSkillStarted(skill: UnknownSkill): void;
	OnSkillEnded(skill: UnknownSkill): void;
}
