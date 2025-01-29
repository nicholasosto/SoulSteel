/* Client Player Character Remotes */

// Imports
import { Logger } from "shared/Utility/Logger";
import Remotes, { RemoteNames } from "shared/Remotes/Remotes";
import { ResourceId } from "shared/_References/Resources";
import { Players } from "@rbxts/services";

// Player
const player = Players.LocalPlayer;

// UI Character Resource Update Remote
const UICharacterResourceUpdate = Remotes.Client.GetNamespace("UserInterface").Get(
	RemoteNames.UICharacterResourceUpdate,
);

async function GetCharacterResource(resourceType: ResourceId) {
	Logger.Log("GetCharacterResource", resourceType);
	const [status, result] = await UICharacterResourceUpdate.CallServerAsync(resourceType).awaitStatus();
	Logger.Log("GetCharacterResource", status, result as unknown as string);
	return status;
}

export { GetCharacterResource };
