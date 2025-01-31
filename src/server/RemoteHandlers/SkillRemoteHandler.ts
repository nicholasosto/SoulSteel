import Logger from "shared/Utility/Logger";
import { SkillsRemotes } from "shared/Remotes/ServerRemotes";
import { GetPlayerCharacter } from "server/Character/PlayerCharacter";

Logger.Log(script, "Skill Remote Handler Loaded");
// Assign Skill Slot
SkillsRemotes.AssignSkillSlot.Connect((player, skillId, slot) => {
	Logger.Log(script, player, skillId, slot);
	const playerCharacter = GetPlayerCharacter(player);
	if (playerCharacter === undefined) return;

	playerCharacter.AssignSkillSlot(slot, skillId);
});
