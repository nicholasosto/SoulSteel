import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";
import { SkillRemotes } from "shared/Remotes/ClientRemotes";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import Logger from "shared/Utility/Logger";

const SkillBarInstance: SkillBar = new SkillBar();

let _skillAssignmentResponse: RBXScriptConnection | undefined;

// function GetUnlockedSkills() {
// 	Logger.Log(script, "Get Unlocked Skills");
// }

// function AssignSkillToSlot(slot: number, skillId: SkillId) {
// 	Logger.Log(script, "Assign Skill to Slot", slot, skillId);
// 	//SkillRemotes.AssignSkillToSlot.CallServerAsync(slot, skillId);
// }

async function StartSkillBar() {
	Logger.Log(script, "Start Skill Bar");
	_skillAssignmentResponse?.Disconnect();

	_skillAssignmentResponse = SkillRemotes.SendSkillAssignment.Connect((skillSlotMap: Map<number, SkillId>) => {
		print(skillSlotMap);
		SkillBarInstance.LoadSkills(skillSlotMap);
	});

	Logger.Log(script, "Skill Bar Created");
	SkillRemotes.SkillBarCreated.SendToServer();
}

export { StartSkillBar };
