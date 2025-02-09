import { WorldEvent } from "./ServerEvents";

export default function StartTeleportListener() {
	/* Teleport Player */
	WorldEvent.Teleport.Connect((player: Player, position: Vector3) => {
		// Get the player character
		const character = player.Character;
		if (character === undefined) return;
		assert(position, "Position is undefined");
		const cFrame = new CFrame(position);
		// Teleport the player
		character?.PivotTo(cFrame);
	});
}
