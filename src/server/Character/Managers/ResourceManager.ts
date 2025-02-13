import Logger from "shared/Utility/Logger";
import { ResourceId } from "server/Character/Index/CharacterIndex";
import { CharacterResource } from "../Classes/CharacterResource";
import { Character, UnknownSkill } from "@rbxts/wcs";

/* Responibilities */
// - Create and manage resources for the character
// - Listen for skill events and update resources accordingly
// - Listen for combat events and update resources accordingly

/* Resource Manager */
export default class ResourceManager {
	// Skills
	ResourceMap = new Map<ResourceId, CharacterResource>();

	/* Constructor */
	constructor() {}

	/* Load Skills from List */
	CreatePlayerResource(resourceId: ResourceId): void {
		Logger.Log(script, `[ResourceManager]: Creating Resource: ${resourceId}`);
	}

	public OnSkillStarted(skill: UnknownSkill): void {
		Logger.Log(script, `[SkillsManager]: Skill Started: ${skill}`);
	}

	public OnSkillEnded(skill: UnknownSkill): void {
		Logger.Log(script, `[SkillsManager]: Skill Ended: ${skill}`);
	}
}
