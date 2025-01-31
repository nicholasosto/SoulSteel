import { SkillSignals, SkillRemotes } from "shared/Remotes/ClientRemotes";

function GetUnlockedSkills() {
	SkillRemotes.GetUnlockedSkills.CallServerAsync();
}

export { GetUnlockedSkills };