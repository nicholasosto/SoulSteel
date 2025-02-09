/*================== IMPORTS ================================= */

import Logger from "shared/Utility/Logger";

/* Services */
import { Players } from "@rbxts/services";

/* Remotes */
import { GameCycleEvents } from "client/net/ClientEvents";

/* GUI Components */
import CharacterFrame from "shared/Epic UI/Character Frame/CharacterFrame";

/* WCS Module*/
import { Character } from "@rbxts/wcs";
import { ResourceId } from "shared/Game Character/Character Resources/Resources";
import { IPlayerData } from "shared/Data Interfaces/PlayerData";

/*================== Objects  ================================= */

/* Remotes */

/* WCS Character */
let _wcsCharacter: Character | undefined;

/* Character Frame Instance */
const CharacterFrameInstance = new CharacterFrame();

/*================== Event Handlers  ================================= */

/* ==== Character Events ==== */
/* Character Created */
Character.CharacterCreated.Connect((wcsCharacter) => {
	_wcsCharacter = wcsCharacter;
});

/* Character Destroyed */
Character.CharacterDestroyed.Connect(() => {
	Logger.Log(script, "[NEW STYLE]: Character Destroyed");
});

/* ==== Player Events ==== */
/* Player Info Update */
GameCycleEvents.PlayerDataLoaded.Connect((playerData: IPlayerData) => {
	const level = playerData.ProgressionStats.Level;
	const name = playerData.Name;
	const profilePicId = playerData.ProfilePicId;
	CharacterFrameInstance.Update(level, name as string);
});
