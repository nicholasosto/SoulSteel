import { CollectionService } from "@rbxts/services";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import { TResourceModifierPart } from "shared/_Types/Collection Types/TResourceModifierPart";
import PCController from "server/Controllers/PlayerCharacterController";
import Logger from "shared/Utility/Logger";

/* Collection Tag */
const CollectionTag = "ResourceDrain";

/* ResourceDrain Added */
function OnResourceDrainAdded(basePart: TResourceModifierPart) {
	/* Touched Event */
	basePart.Touched.Connect((hit) => {
		const character = hit.Parent as TGameCharacter;
		if (character === undefined) return;
		const playerCharacter = PCController.GetPlayerCharacterFromCharacter(character);
		//if (playerCharacter === undefined) return;
		const resourceId = basePart.ResourceId.Value;
		const drainRate = basePart.DrainRate.Value;
		playerCharacter?.wcsCharacter.TakeDamage({ Damage: drainRate, Source: undefined });
		Logger.Log(script, "Resource Drainer: ", resourceId, drainRate);
	});
}

/* Main Function: Run on Server Start */
export function StartCollectingResourceDrains() {
	/* Get Existing */
	CollectionService.GetTagged(CollectionTag).forEach((basePart) => {
		OnResourceDrainAdded(basePart as TResourceModifierPart);
	});

	/*Added Signal */
	CollectionService.GetInstanceAddedSignal(CollectionTag).Connect((basePart) => {
		OnResourceDrainAdded(basePart as TResourceModifierPart);
	});

	/* Removed Signal */
	CollectionService.GetInstanceRemovedSignal(CollectionTag).Connect((basePart) => {
		print("Resource Drain Removed", basePart.Name);
	});
}
