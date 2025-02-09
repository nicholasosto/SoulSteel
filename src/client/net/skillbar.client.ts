/*================== IMPORTS ================================= */
import Logger from "shared/Utility/Logger";

/* Remotes */
import { Requests, Responses } from "shared/Remotes/ClientRemotes";
import * as ClientEvents from "client/net/ClientEvents";

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
	Requests.SkillMapRequest.SendToServer();
	ClientEvents.SkillBarCreated.SendToServer(SkillBarInstance);
});

/* Character Destroyed */
Character.CharacterDestroyed.Connect(() => {
	Logger.Log(script, "[NEW STYLE]: Character Destroyed");
});

/* Skill Map  */
Responses.SkillMapResponse.Connect((skillSlotMap: Map<number, SkillId>) => {
	SkillBarInstance.LoadSkills(skillSlotMap);
});

/* Skill Slot Assignment */
Responses.SkillSlotAssignmentResponse.Connect((slot: number, skillId: SkillId) => {
	SkillBarInstance.AssignSkillToSlot(slot, skillId);
	Requests.SkillMapRequest.SendToServer();
});

ClientEvents.SkillBarCreated.Connect((skillBar) => {
	Logger.Log("[Bi Directional]", "Skill Bar Created", skillBar as unknown as string);
});
