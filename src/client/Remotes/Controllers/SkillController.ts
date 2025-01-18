import { Logger } from "shared/Utility/Logger";
import { Players } from "@rbxts/services";
import { SkillGrid } from "shared/UI Component Classes/SkillGrid/SkillGrid";
import { SkillId, getSkillDefinition, PlayerSkillsData } from "shared/Skills/SkillIndex";
import { SkillBar } from "../../Classes/SkillBar";
import Remotes, { RemoteNames } from "shared/Remotes";
import { Character } from "@rbxts/wcs";

export class SkillController {
	private static skillGrid: SkillGrid | undefined;
	private player: Player = Players.LocalPlayer;
	private skillBar: SkillBar | undefined;

	// Remotes for Controller
	public static remoteLoadPlayerSkills = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.LoadPlayerSkills);
	//public static requestPlayerSkills = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.RequestPlayerSkills);
	public static remoteUnlockSkill = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.UnlockSkill);
	public static remoteAssignSkillSlot = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.AssignSkillSlot);
	public static remoteAssignSkillResponse = Remotes.Client.GetNamespace("Skills").Get(
		RemoteNames.AssignSkillResponse,
	);

	// Connections
	private static connectionLoadPlayerSkills: RBXScriptConnection | undefined;
	private static connectionUnlockSkillResponse: RBXScriptConnection | undefined;
	private static connectionAssignSlotResponse: RBXScriptConnection | undefined;


	public static Initialize(wcsCharacter: Character) {
		// Listen for the LoadPlayerSkills remote event
		SkillBar.Initialize();
		Logger.Log(script, "Skill Controller Initialized");

		// Load PlayerSkills
		SkillController?.connectionLoadPlayerSkills?.Disconnect();
		SkillController.connectionLoadPlayerSkills = SkillController.remoteLoadPlayerSkills.Connect(
			(playerSkillData: PlayerSkillsData) => {
				Logger.Log(script, "Skill Assignment", playerSkillData as unknown as string);
				SkillBar.AssignSkillData(wcsCharacter, playerSkillData);
			},
		);

		// Skill Assignment Response
		SkillController?.connectionAssignSlotResponse?.Disconnect();
		SkillController.connectionAssignSlotResponse = SkillController.remoteAssignSkillResponse.Connect((slot, skillId) => {
			SkillBar.AssignSkillToSlot(slot, skillId as SkillId);
		});
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
