import { CollectionService } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import NPCCharacter from "server/Character/NPCCharacter";
import { RegisterNPCCharacter } from "shared/_Registry/EntityRegistration";
import Logger from "shared/Utility/Logger";

const NPCTag = "NPCCharacter";

function OnNPCAdded(npc: TGameCharacter) {
	Logger.Log("NPCCollector", "NPC Added", npc.Name);
	const npcWcsCharacter = new Character(npc);
	const npcCharacter = new NPCCharacter(npcWcsCharacter);
	RegisterNPCCharacter(npcCharacter);
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

/*
{"Information":{"Created":1741422844,"ExportPriority":"Action","Modified":1741423160,"Length":300,"Looped":false},"Items":[{"Path":{"InstanceTypes":["DataModel","Workspace","Model","Folder","Model"],"ItemType":"Rig","InstanceNames":["game","Workspace","Zone - Mecha Mania","NPCs","WorkerBot"]}},{"Path":{"InstanceTypes":["DataModel","Workspace","Camera"],"ItemType":"Camera","InstanceNames":["game","Workspace","CurrentCamera"]}}]}

*/