// server/net/remotes.server.ts
import Logger from "shared/Utility/Logger";
import { Requests, Responses } from "shared/Remotes/ServerRemotes";

import GameCharacterController from "server/Controllers/GameCharacterController";
import PlayerCharacter from "server/Character/PlayerCharacter";

/* Skill Bar Created */
Requests.SkillMapRequest.Connect((player) => {
	// Get the player character
	const playerCharacter = GameCharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
	assert(playerCharacter, "Player Character is nil");

	// Get the skill slot map
	const skillSlotMap = playerCharacter.GetSkillSlotMap();
	assert(skillSlotMap, "Skill Slot Map is nil");

	// Send the skill slot map to the player
	Responses.SkillMapResponse.SendToPlayer(player, skillSlotMap);
});

/* Assign Skill Slot */
Requests.SkillSlotAssignmentRequest.Connect((player, slot, skillId) => {
	Logger.Log(script, `[NEW STYLE]: ${slot} ${skillId}`);
	// Get the player character
	const playerCharacter = GameCharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
	assert(playerCharacter, "Player Character is nil");

	// Validate the parameters
	assert(slot >= 1 && slot <= 6, "Invalid slot");
	assert(skillId, "Invalid skillId");

	playerCharacter.AssignSkillToSlot(slot, skillId);
});

/* Unassign Skill Slot */
Requests.UnAssignSkillSlotRequest.Connect((player, slot) => {
	// Get the player character
	const playerCharacter = GameCharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;

	// Validate the parameters
	assert(playerCharacter, "Player Character is nil");
	assert(slot >= 1 && slot <= 6, "Invalid slot");

	// Remove the skill from the slot
	playerCharacter.RemoveSkillFromSlot(slot);
});
