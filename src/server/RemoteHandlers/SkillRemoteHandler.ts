import Logger from "shared/Utility/Logger";
import { SkillSignals, SkillRemotes } from "shared/Remotes/ServerRemotes";
import { GetPlayerCharacter } from "server/Character/PlayerCharacter";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

Logger.Log(script, "Skill Remote Handler Loaded");

SkillSignals.SkillBarCreated.Connect((player) => {
	Logger.Log(script, "Skill Bar Created");
	const playerCharacter = GetPlayerCharacter(player);
	const skillSlotMap = playerCharacter?.GetSkillSlotMap();
	Logger.Log(script, "Skill Slot Map", skillSlotMap as unknown as string);
	assert(skillSlotMap, "Skill Slot Map is nil");


	SkillSignals.SendSkillAssignment.SendToPlayer(player, skillSlotMap);
});

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

SkillRemotes.GetUnlockedSkills.SetCallback((player) => {
	Logger.Log(script, "Get Unlocked Skills", player);

	const playerCharacter = GetPlayerCharacter(player);

	let unlockedSkills: SkillId[] = [];
	if (playerCharacter === undefined) return unlockedSkills;
	unlockedSkills = playerCharacter.GetPlayerSkillsData().unlockedSkills;
	Logger.Log(script, "Unlocked Skills", unlockedSkills);
	return unlockedSkills;
});

// Assign Skill Response
function SendAssignSkillResponse(player: Player, success: boolean, message: string) {
	// #TODO: Implement this function
	Logger.Log(script, "SendAssignSkillResponse", player, success, message);
	//SkillRemotes.AssignSkillResponse.SendToPlayer(player, 1, "Fly");
}

export { SendAssignSkillResponse };
