import { Zone } from "@rbxts/zone-plus";
import { CollectionService } from "@rbxts/services";

function StartZoneDetection() {
	for (const zonePart of CollectionService.GetTagged("Zone")) {
		if (!zonePart.IsA("BasePart")) {
			continue;
		}

		const zone = new Zone(zonePart);

		zone.playerEntered.Connect((player) => {
			print(`${player.Name} entered the zone!`);
		});

		zone.playerExited.Connect((player) => {
			print(`${player.Name} exited the zone!`);
		});
	}
}

export { StartZoneDetection };
