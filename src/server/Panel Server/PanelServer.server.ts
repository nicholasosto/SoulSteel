import { RemoteFunctions, RemoteEvents } from "shared/net/Remotes";
import { GenericPanelData, PanelId, TPanelData } from "shared/net/RemoteIndex";
import { GetGameCharacter } from "shared/_Registry/EntityRegistration";
import PlayerCharacter from "server/Character/PlayerCharacter";
import { SkillPanelData } from "shared/_IDs/SkillIndex";

/* Remote Functions */
const GetSkillPanelData = RemoteFunctions.Server.Get("GetSkillPanelData");

/* Remote Events */
const UpdateSkillPanelEvent = RemoteEvents.Server.Get("UpdateSkillPanel");

/**
 * PanelData Callback
 * This function is called when the client requests panel data
 * It returns the appropriate panel data based on the panelId
 * @param player - The player requesting the data
 * @param panelId - The id of the panel requested
 * @returns The panel data for the requested panelId
 */
GetSkillPanelData.SetCallback(async (player: Player) => {
	const character = GetGameCharacter(tostring(player.UserId)) as PlayerCharacter | undefined;
	if (character === undefined) {
		warn("Character not found for player:", player.Name);
		return undefined;
	}
	print("GetSkillPanelData called for player:", player.Name);
	const skillPanelData = character?.dataManager?.GetSkillPanelData() as SkillPanelData | undefined;
	print("Returning skill panel data for player:", player.Name, "Data:", skillPanelData);
	return skillPanelData;
});

export function UpdateSkillPanel(player: PlayerCharacter, panelData: SkillPanelData) {
	const panelDataToSend = panelData as SkillPanelData | undefined;
	if (panelDataToSend === undefined) {
		warn("Skill panel data is undefined");
		return;
	}
	UpdateSkillPanelEvent.SendToPlayer(player.player, panelDataToSend);
}
