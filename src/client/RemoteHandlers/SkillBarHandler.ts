import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";
import { SkillRemotes } from "shared/Remotes/ClientRemotes";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import Logger from "shared/Utility/Logger";

let _skillAssignmentResponse: RBXScriptConnection | undefined;

async function StartSkillBar(skillBarInstance: SkillBar) {
	Logger.Log(script, "Start Skill Bar");
	_skillAssignmentResponse?.Disconnect();

	_skillAssignmentResponse = SkillRemotes.SendSkillAssignment.Connect((skillSlotMap: Map<number, SkillId>) => {
		print(skillSlotMap);
		skillBarInstance.LoadSkills(skillSlotMap);
	});

	Logger.Log(script, "Skill Bar Created");
	SkillRemotes.SkillBarCreated.SendToServer();
}

export { StartSkillBar };
