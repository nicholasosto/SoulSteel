import Remotes, { RemoteNames } from "shared/Remotes";
import { Logger } from "shared/Utility/Logger";

const SkillRemotes = {
	AssignSkillSlot: Remotes.Client.GetNamespace("Skills").Get(RemoteNames.AssignSkillSlot),
	UnlockSkill: Remotes.Client.GetNamespace("Skills").Get(RemoteNames.UnlockSkill),
	SkillAssignment: Remotes.Client.GetNamespace("Skills").Get(RemoteNames.LoadPlayerSkills),
}

export { SkillRemotes };