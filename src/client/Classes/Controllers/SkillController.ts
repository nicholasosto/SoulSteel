import { Logger } from "shared/Utility/Logger";
import { Players } from "@rbxts/services";
import { SkillGrid } from "shared/Skills/UIClasses/SkillGrid";
import { SkillId } from "shared/Skills/SkillIndex";
import { SkillBar } from "../SkillBar";
import Remotes, { RemoteNames } from "shared/Remotes";
import { Character } from "@rbxts/wcs";

export class SkillController {
	private static skillGrid: SkillGrid | undefined;
	private player: Player = Players.LocalPlayer;

	// Remotes for Controller
	public static remoteLoadPlayerSkills = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.LoadPlayerSkills);
	public static remoteUnlockSkill = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.UnlockSkill);
	public static remoteAssignSkillSlot = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.AssignSkillSlot);

	// Connections
	private static connectionLoadPlayerSkills: RBXScriptConnection | undefined;

	public static Initialize() {
		// Listen for the LoadPlayerSkills remote event
		SkillController?.connectionLoadPlayerSkills?.Disconnect();
		SkillController.connectionLoadPlayerSkills = SkillController.remoteLoadPlayerSkills.Connect(
			(playerSkillData: unknown) => {
				Logger.Log("Skill Assignment", playerSkillData as unknown as string);
				SkillController.AssignSkillData(playerSkillData);
			},
		);
	}

	public static UnlockSkill(skillId: SkillId) {}

	public static AssignSkillSlot(slot: number, skillId: SkillId) {}

	public static AssignSkillData(playerSkillData: unknown) {
		Logger.Log("Assign Skill Data", playerSkillData as unknown as string);
	}
}

function GetWCSSKill(wcsCharacter: Character, skillId: SkillId) {
	Logger.Log(script, "GetWCSSKill(" + wcsCharacter?.Instance?.Name + ", " + skillId + ")");
}
