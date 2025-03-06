import INPCCharacter from "shared/_Interfaces/INPCCharacter";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import Logger from "shared/Utility/Logger";

const PlayerCharacterMap = new Map<string, IPlayerCharacter>();
const NPCMap = new Map<string, INPCCharacter>();

/* Register Player Character */
function RegisterPlayerCharacter(playerCharacter: IPlayerCharacter): void {
	Logger.Log(script, "RegisterPlayerCharacter", `Registering ${playerCharacter.player.Name}`);
	PlayerCharacterMap.set(tostring(playerCharacter.player.UserId), playerCharacter);
}

/* Get Player Character */
function GetPlayerCharacter(playerOrUserId: Player | string): IPlayerCharacter | undefined {
	const userId =
		typeIs(playerOrUserId, "Instance") && playerOrUserId.IsA("Player")
			? tostring(playerOrUserId.UserId)
			: playerOrUserId;
	if (userId === undefined) {
		Logger.Log("PlayerCharacterMap", "GetPlayerCharacter", "Invalid userId");
		return;
	}
	Logger.Log(script, "GetPlayerCharacter", `Getting ${userId}`);
	return PlayerCharacterMap.get(userId);
}

/* Remove Player Character */
function RemovePlayerCharacter(player: Player): void {
	Logger.Log(script, "RemovePlayerCharacter", `Removing ${player.Name}`);
	PlayerCharacterMap.delete(tostring(player.UserId));
}

/* Register NPC Character */
function RegisterNPCCharacter(npcCharacter: INPCCharacter): void {
	Logger.Log(script, "RegisterNPCCharacter", `Registering ${npcCharacter.displayName}`);
	NPCMap.set(npcCharacter.characterId, npcCharacter);
}

/* Get NPC Character */
function GetNPCCharacter(characterId: string): INPCCharacter | undefined {
	Logger.Log(script, "GetNPCCharacter", `Getting ${characterId}`);
	return NPCMap.get(characterId);
}

/* Remove NPC Character */
function RemoveNPCCharacter(npcCharacter: INPCCharacter): void {
	Logger.Log(script, "RemoveNPCCharacter", `Removing ${npcCharacter.displayName}`);
	NPCMap.delete(npcCharacter.characterId);
}

export {
	RegisterPlayerCharacter,
	RegisterNPCCharacter,
	GetPlayerCharacter,
	GetNPCCharacter,
	RemovePlayerCharacter,
	RemoveNPCCharacter,
};
