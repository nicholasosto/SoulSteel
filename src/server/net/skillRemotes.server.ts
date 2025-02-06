// server/net/remotes.server.ts
import Logger from "shared/Utility/Logger";
import { SkillSignals } from "shared/Remotes/ServerRemotes";
import GameCharacterController from "server/Controllers/GameCharacterController";

import PlayerCharacter from "shared/Game Character/PlayerCharacter";

// Skill Bar Created: sends skillsMap to player
SkillSignals.SkillBarCreated.Connect((player) => {
	// Get the player character
	const playerCharacter = GameCharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
	assert(playerCharacter, "Player Character is nil");

	// Get the skill slot map
	const skillSlotMap = playerCharacter.GetSkillSlotMap();
	assert(skillSlotMap, "Skill Slot Map is nil");

	// Send the skill slot map to the player
	SkillSignals.SendSkillAssignment.SendToPlayer(player, skillSlotMap);
});


// Assign Skill Slot: assigns a skill to a slot
SkillSignals.AssignSkillSlot.Connect((player, slot, skillId) => {
	// Get the player character
	const playerCharacter = GameCharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
	assert(playerCharacter, "Player Character is nil");

	// Validate the parameters
	assert(slot >= 1 && slot <= 6, "Invalid slot");
	assert(skillId, "Invalid skillId");

	playerCharacter.AssignSkillToSlot(slot, skillId);
});
