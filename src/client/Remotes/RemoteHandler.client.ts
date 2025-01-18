import { Logger } from "shared/Utility/Logger";
import { SkillRemotes } from "client/Remotes/ClientRemotes";
import Remotes, { RemoteNames } from "shared/Remotes";

Remotes.Client.GetNamespace("Skills").Get(RemoteNames.LoadPlayerSkills).Connect((playerSkillData: unknown) => {
    Logger.Log("Skill Assignment", playerSkillData as unknown as string);
});