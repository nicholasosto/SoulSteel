import { Logger } from "shared/Utility/Logger";
import { Players } from "@rbxts/services";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { PlayerSkillsData } from "shared/Skills/Interfaces/SkillInterfaces";
import Remotes, { RemoteNames } from "shared/Remotes/Remotes";
import { Character } from "@rbxts/wcs";
import { SkillPanel } from "shared/UI Component Classes/SkillPanel/SkillPanel";

export class SkillController {
	private static skillPanel: SkillPanel;
	private static wcsCharacter: Character;

	// Remotes for Controller
	public static remoteLoadPlayerSkills = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.LoadPlayerSkills);
	public static requestPlayerSkills = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.RequestPlayerSkills);
	public static remoteUnlockSkill = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.UnlockSkill);
	public static remoteAssignSkillSlot = Remotes.Client.GetNamespace("Skills").Get(RemoteNames.AssignSkillSlot);
	public static remoteAssignSkillResponse = Remotes.Client.GetNamespace("Skills").Get(
		RemoteNames.AssignSkillResponse,
	);

	// Connections
	private static connectionLoadPlayerSkills: RBXScriptConnection | undefined;
	private static connectionAssignSlotResponse: RBXScriptConnection | undefined;

	public static Initialize(wcsCharacter: Character) {
		const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
		SkillController.skillPanel = new SkillPanel(playerGui);
		SkillController.wcsCharacter = wcsCharacter;
		SkillController._LoadSkillGrid();
		SkillController._initializeConnections();
		// Request Player Skills
		SkillController.requestPlayerSkills.SendToServer();
	}

	private static _initializeConnections() {
		SkillController.connectionLoadPlayerSkills?.Disconnect();
		SkillController.connectionAssignSlotResponse?.Disconnect();

		// Load Player Skills
		SkillController.connectionLoadPlayerSkills = SkillController.remoteLoadPlayerSkills.Connect(
			(playerSkillData: PlayerSkillsData) => {
				Logger.Log(script, "Load Player Skills", "Creating Skill Panel");
				SkillController.skillPanel.LoadPlayerSkillData(this.wcsCharacter, playerSkillData);
			},
		);

		SkillController.connectionAssignSlotResponse = SkillController.remoteAssignSkillResponse.Connect(
			(slot, skill) => {
				Logger.Log(script, "Assign Slot Response", slot, skill as unknown as string);
			},
		);
	}

	private static _LoadSkillGrid() {
		// Load the skill grid
	}
}
