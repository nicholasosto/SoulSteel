/*================== IMPORTS ================================= */

import Logger from "shared/Utility/Logger";

/* Services */
import { Players } from "@rbxts/services";

/* Remotes */
import { Responses } from "shared/Remotes/ClientRemotes";

/* GUI Components */
import CharacterFrame from "shared/Epic UI/Character Frame/CharacterFrame";

/* WCS Module*/
import { Character } from "@rbxts/wcs";
import { ResourceId } from "shared/Game Character/Character Resources/Resources";

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
Responses.PlayerInfoResponse.Connect((name, level, profilePicId) => {
	Logger.Log(script, "[NEW STYLE]: Player Info Update", name, level, profilePicId);
	CharacterFrameInstance.Update(level, name);
});

/* Level Up */
Responses.PlayerLevelUpResponse.Connect((level: number) => {
	Logger.Log(script, "[NEW STYLE]: Level Up", level);
	CharacterFrameInstance.info.setLevel(level);
});

/* Resource Update */
Responses.PlayerResourceResponse.Connect((resourceId: ResourceId, current, max) => {
	Logger.Log(script, "[NEW STYLE]: Resource Update", resourceId, current, max);
	CharacterFrameInstance.UpdateResource(resourceId, current, max);
});
