/*================== IMPORTS ================================= */
import Logger from "shared/Utility/Logger";

/* Remotes */
import { Requests, Responses } from "shared/Remotes/ClientRemotes";

/* GUI Components */
import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";

/* Interfaces */
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

/* WCS Module*/
import { Character } from "@rbxts/wcs";
import { ResourceId } from "shared/_References/Resources";

/*==================   Objects       ================================= */

/* WCS Character */
let _wcsCharacter: Character | undefined;

/* Skill Bar Instance */
const SkillBarInstance = new SkillBar();

/*================== Event Handlers  ================================= */

/* Character Created */
Character.CharacterCreated.Connect((wcsCharacter) => {
	Logger.Log(script, "[NEW STYLE]: Character Created");
	_wcsCharacter = wcsCharacter;
	SkillBarInstance.SetWCSCharacter(_wcsCharacter);
	Requests.SkillMapRequest.SendToServer();
});

/* Character Destroyed */
Character.CharacterDestroyed.Connect(() => {
	Logger.Log(script, "[NEW STYLE]: Character Destroyed");
});

/* Skill Map  */
Responses.SkillMapResponse.Connect((skillSlotMap: Map<number, SkillId>) => {
	Logger.Log(script, "[NEW STYLE]: Skill Assignment Response", skillSlotMap as unknown as string);
	SkillBarInstance.LoadSkills(skillSlotMap);
});

/* Skill Slot Assignment */
Responses.SkillSlotAssignmentResponse.Connect((slot: number, skillId: SkillId) => {
	Logger.Log(script, "[NEW STYLE]: Skill Slot Assignment Response", slot, skillId);
	SkillBarInstance.AssignSkillToSlot(slot, skillId);
	Requests.SkillMapRequest.SendToServer();
});
