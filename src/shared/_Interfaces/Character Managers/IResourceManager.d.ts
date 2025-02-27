import { UnknownSkill } from "@rbxts/wcs";
import ICharacterResource from "shared/_Interfaces/ICharacterResource";

export default interface IResourceManager {
	// Skills
	HealthResource: ICharacterResource;
	ManaResource: ICharacterResource;
	StaminaResource: ICharacterResource;

	// private _playerCharacter: IPlayerCharacter;
	OnSkillStarted(skill: UnknownSkill): void;
	OnSkillEnded(skill: UnknownSkill): void;
}
