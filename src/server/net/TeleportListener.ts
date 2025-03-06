import { Remotes } from "shared/net/Remotes";

let _teleportConnection: RBXScriptConnection | undefined;


export default function StartTeleportListener() {
	/* Teleport Player */
	_teleportConnection?.Disconnect();
	_teleportConnection = Remotes.Server.Get("TeleportTo").Connect((player: Player, position: Vector3) => {
		// Get the player character
		const character = player.Character;
		if (character === undefined) return;
		assert(position, "Position is undefined");
		const cFrame = new CFrame(position);
		// Teleport the player
		character?.PivotTo(cFrame);
	});
}
