import { UnknownSkill } from "@rbxts/wcs";
import { ResourceId } from "../_IDs/IDs_Resource";
import ICharacterResource from "./ICharacterResource";

export default interface IResourceManager {
	// Skills
	HealthResource: ICharacterResource;
	ManaResource: ICharacterResource;
	StaminaResource: ICharacterResource;
	
	// private _playerCharacter: IPlayerCharacter;
	CreatePlayerResource(resourceId: ResourceId): void;
	OnSkillStarted(skill: UnknownSkill): void;
	OnSkillEnded(skill: UnknownSkill): void;
}
