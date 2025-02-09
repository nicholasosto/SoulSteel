/*================== IMPORTS ================================= */
import Logger from "shared/Utility/Logger";

/* Remotes */
import { SkillEvent } from "./ClientEvents";

/* GUI Components */
import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";

/* Interfaces */
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

/* WCS Module*/
import { Character } from "@rbxts/wcs";

/*==================   Objects       ================================= */

/* WCS Character */
let _wcsCharacter: Character | undefined;

/* Skill Bar Instance */
const SkillBarInstance = new SkillBar();

/*================== Event Handlers  ================================= */

/* Character Created */
Character.CharacterCreated.Connect((wcsCharacter) => {
	_wcsCharacter = wcsCharacter;
	SkillBarInstance.SetWCSCharacter(_wcsCharacter);
});

/* Character Destroyed */
Character.CharacterDestroyed.Connect(() => {
	Logger.Log(script, "[NEW STYLE]: Character Destroyed");
});

SkillEvent.SkillBarCreated.Connect((skillBar) => {
	Logger.Log("[Bi Directional]", "Skill Bar Created", skillBar as unknown as string);
});
