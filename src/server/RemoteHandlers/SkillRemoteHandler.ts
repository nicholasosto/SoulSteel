import Logger from "shared/Utility/Logger";
import { SkillRemotes, SkillSignals } from "shared/Remotes/ServerRemotes";
import { GetPlayerCharacter } from "server/Character/PlayerCharacter";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

Logger.Log(script, "Skill Remote Handler Loaded");
// Assign Skill Slot
SkillSignals.AssignSkillSlot.Connect((player, skillId, slot) => {
	Logger.Log(script, "Assign Skill Slot", player, skillId, slot);
	const playerCharacter = GetPlayerCharacter(player);
	if (playerCharacter === undefined) return;

	playerCharacter.AssignSkillSlot(slot, skillId);
});

// UnAssign Skill Slot
SkillSignals.UnAssignSkillSlot.Connect((player, slot) => {
	Logger.Log(script, "UnAssign Skill Slot", player, slot);
	const playerCharacter = GetPlayerCharacter(player);
	if (playerCharacter === undefined) return;

	playerCharacter.UnAssignSkillSlot(slot);
});

// Unlock Skill
SkillSignals.UnlockSkill.Connect((player, skillId) => {
	Logger.Log(script, "Unlock Skill", player, skillId);
	const playerCharacter = GetPlayerCharacter(player);
	if (playerCharacter === undefined) return;

	// #TODO: Implement this function
	//playerCharacter.UnlockSkill(skillId);
});

// Assign Skill Response
function SendAssignSkillResponse(player: Player, success: boolean, message: string) {
	// #TODO: Implement this function
	Logger.Log(script, "SendAssignSkillResponse", player, success, message);
	//SkillRemotes.AssignSkillResponse.SendToPlayer(player, 1, "Fly");
}

SkillRemotes.GetUnlockedSkills.SetCallback((player) => {
	const playerCharacter = GetPlayerCharacter(player);
	let unlockedSkills: string[] = [];
	if (playerCharacter !== undefined) {
		unlockedSkills = playerCharacter.GetPlayerSkillsData().unlockedSkills;
		return unlockedSkills as [SkillId];
	}
	return ["Fly"];
});

export { SendAssignSkillResponse };
