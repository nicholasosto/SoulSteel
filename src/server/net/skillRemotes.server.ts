// server/net/remotes.server.ts
import Logger from "shared/Utility/Logger";
import { SkillSignals, SkillRemotes } from "shared/Remotes/ServerRemotes";

import { IPlayerCharacter } from "shared/Game Character/Interfaces";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

import GameCharacterController from "server/Controllers/GameCharacterController";
import PlayerCharacter from "server/Character/PlayerCharacter";

/* Skill Bar Created */
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

/* Assign Skill Slot */
SkillSignals.AssignSkillSlot.Connect((player, slot, skillId) => {
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
SkillSignals.UnAssignSkillSlot.Connect((player, slot) => {
	// Get the player character
	const playerCharacter = GameCharacterController.GetGameCharacter(tostring(player.UserId)) as PlayerCharacter;
	assert(playerCharacter, "Player Character is nil");

	// Validate the parameters
	assert(slot >= 1 && slot <= 6, "Invalid slot");

	playerCharacter.RemoveSkillFromSlot(slot);
});

/* ==================== Callbacks ============================= */

/* Get Unlocked Skills */
SkillRemotes.GetUnlockedSkills.SetCallback((player) => {
	const userId = tostring(player.UserId);
	const playerCharacter = GameCharacterController.GetGameCharacter(userId) as IPlayerCharacter;

	let unlockedSkills: SkillId[] = [];
	if (playerCharacter === undefined) return unlockedSkills;
	unlockedSkills = playerCharacter.GetUnlockedSkills();
	Logger.Log(script, "Unlocked Skills", unlockedSkills);
	return unlockedSkills;
});
