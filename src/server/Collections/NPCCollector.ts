import { CollectionService } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import NPCCharacter from "server/Character/NPCCharacter";
import Logger from "shared/Utility/Logger";

const NPCTag = "NPCCharacter";

function OnNPCAdded(npc: TGameCharacter) {
	Logger.Log("NPCCollector", "NPC Added", npc.Name);
	const npcWcsCharacter = new Character(npc);
	const npcCharacter = new NPCCharacter(npcWcsCharacter);
	npcCharacter.OnSpawn();
}

function StartCollectingNPCs() {
	CollectionService.GetTagged(NPCTag).forEach((npc) => {
		OnNPCAdded(npc as TGameCharacter);
	});
	CollectionService.GetInstanceAddedSignal(NPCTag).Connect((npc) => {
		OnNPCAdded(npc as TGameCharacter);
	});

	CollectionService.GetInstanceRemovedSignal(NPCTag).Connect((npc) => {
		Logger.Log("NPCCollector", "NPC Removed", npc.Name);
		Character.GetCharacterFromInstance(npc)?.Destroy();
	});
}

export { StartCollectingNPCs };
