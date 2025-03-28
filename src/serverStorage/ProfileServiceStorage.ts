import ProfileService from "@rbxts/profileservice";
import { PlayerDataTemplate } from "shared/__FusionSystem/PlayerDataProfile";

export type PlayerData = typeof PlayerDataTemplate;

// Initialize ProfileService store
const ProfileStore = ProfileService.GetProfileStore("NewSSData_March_2025", PlayerDataTemplate);

function GetPlayerData(player: Player): PlayerData | undefined {
	const profile = ProfileStore.LoadProfileAsync(tostring(player.UserId), "ForceLoad");

	if (profile) {
		print("Profile Manager - GetPlayerData:  ", profile);
		profile.Reconcile(); // Reconcile the profile to ensure it is saved
		return profile.Data as PlayerData;
	} else {
		warn("Profile Manager - GetPlayerData:");
	}
	return undefined;
}

export { GetPlayerData, ProfileStore, PlayerDataTemplate };
