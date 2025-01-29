import { Logger } from "shared/Utility/Logger";
import Remotes, { RemoteNames } from "shared/Remotes/Remotes";
import { ResourceId } from "shared/_References/Resources";
import { GetPlayerCharacter } from "server/Character/PlayerCharacter";

// UI Character Resource Update: Remote
const UICharacterResourceUpdate = Remotes.Server.GetNamespace("UserInterface").Get(
	RemoteNames.UICharacterResourceUpdate,
);

// UI Character Resource Update: Callback
UICharacterResourceUpdate.SetCallback((player, resourceId) => {
	Logger.Log(script, "UICharacterResourceUpdate Callback", player.Name, resourceId);
	const playerCharacter = GetPlayerCharacter(player);
	const resourceValue = playerCharacter?.GetResource(resourceId as ResourceId);
	assert(resourceValue, "Resource Value is nil");

	return resourceValue;
});
