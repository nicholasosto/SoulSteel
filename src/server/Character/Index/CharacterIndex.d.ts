/* Interfaces */

/* Shared Interfaces */
import { ResourceId, CharacterStatId, ICharacterStats, ICharacterResource } from "shared/_Types/GameCharacterShared";

/* Server Interfaces */
import { IGameCharacter, INPCCharacter, IPlayerCharacter, ISkillManager } from "server/Character/Index/Interfaces";

/* Types */
import { GameCharacterModel } from "shared/_Types/TGameCharacter";

export {
	/* Interfaces */
	IGameCharacter,
	INPCCharacter,
	IPlayerCharacter,
	ISkillManager,
	ICharacterStats,
	ICharacterResource,

	/* Types */
	GameCharacterModel,
	CharacterStatId,
	ResourceId,
};
