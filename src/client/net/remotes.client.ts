/*================== IMPORTS ================================= */

import Logger from "shared/Utility/Logger";

/* Services */
import { Players } from "@rbxts/services";

/* Remotes */
import { Requests, Responses } from "shared/Remotes/ClientRemotes";

/* GUI Components */
import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";
import CharacterFrame from "shared/Epic UI/Character Frame/CharacterFrame";

/* Interfaces */
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

/* WCS Module*/
import { Character } from "@rbxts/wcs";
import { ResourceId } from "shared/_References/Resources";

/*================== Objects  ================================= */

/* Remotes */

/* Local Player and WCS Character */
const localPlayer = Players.LocalPlayer;
let _wcsCharacter: Character | undefined;

/* GUI Component Instances */
const SkillBarInstance = new SkillBar();
const CharacterFrameInstance = new CharacterFrame();

/*================== Event Handlers  ================================= */

/* ==== Character Events ==== */
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

/* ==== Skill Events ==== */
/* Skill Assignment Response */
Responses.SkillMapResponse.Connect((skillSlotMap: Map<number, SkillId>) => {
	Logger.Log(script, "[NEW STYLE]: Skill Assignment Response", skillSlotMap as unknown as string);
	if (!_wcsCharacter) return;
	SkillBarInstance.LoadSkills(skillSlotMap);
});

Responses.SkillSlotAssignmentResponse.Connect((slot: number, skillId: SkillId) => {
	Logger.Log(script, "[NEW STYLE]: Skill Slot Assignment Response", slot, skillId);
	SkillBarInstance.AssignSkillToSlot(slot, skillId);
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
