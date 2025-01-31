// Roblox Services
import { Players, ReplicatedStorage } from "@rbxts/services";

// Manager Imports
import { StorageManager } from "shared/Storage Manager/StorageManager";
import { DataManager } from "server/Controllers/DataManager";
import SkillController from "server/Controllers/SkillContoller";
import * as SkillHandler from "server/RemoteHandlers/SkillRemoteHandler";

// WCS Imports
import { CreateServer, Character } from "@rbxts/wcs";

//Controller Imports
//import CharacterController from "./Character/CharacterController";
import PlayerCharacter, { CreatePlayerCharacter } from "./Character/PlayerCharacter";

//import PlayerCharacter from "./Character/PlayerCharacter";

// Utility Imports
import Logger from "shared/Utility/Logger";

// Create the WCS Server
const WCSServer = CreateServer();
const ParentWCSDirectory = ReplicatedStorage.WaitForChild("TS").WaitForChild("Skills");
const SkillsDirectorory = ParentWCSDirectory.WaitForChild("WCSSkills");
const StatusDirectory = ParentWCSDirectory.WaitForChild("WCSStatus");
WCSServer.RegisterDirectory(SkillsDirectorory);
WCSServer.RegisterDirectory(StatusDirectory);
WCSServer.Start();

// Start the Managers
//SkillController.Start();
DataManager.Start();
StorageManager.Start();
//CharacterController.Start();
Players.PlayerAdded.Connect((player) => {
	Logger.Log(script, "Player Added");

	player.CharacterAdded.Connect((character) => {
		Logger.Log(script, "Character Added");

		const wcsCharacter = new Character(character);
		const playerCharacter = CreatePlayerCharacter(player, wcsCharacter);
		//const npcCharacter = new NPCCharacter(wcsCharacter);

		//assert(npcCharacter, "NPC Character is nil");
		//npcCharacter.UseSkill("BasicMelee");

		wcsCharacter.Humanoid.Died.Once(() => {
			Logger.Log(script, "Character Died");
			playerCharacter.Destroy();
			wcsCharacter.Destroy();
		});
	});
});
