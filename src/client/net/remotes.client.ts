/*================== IMPORTS ================================= */

import Logger from "shared/Utility/Logger";

/* Services */
import { Players } from "@rbxts/services";

/* Remotes */
import * as ClientRemotes from "shared/Remotes/ClientRemotes";

/* GUI Components */
import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";
import CharacterFrame from "shared/Epic UI/Character Frame/CharacterFrame";

/* Interfaces */
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

/* WCS Module*/
import { Character } from "@rbxts/wcs";

/*================== Objects  ================================= */

/* Remotes */
const SkillRemotes = ClientRemotes.SkillRemotes;

/* Local Player and WCS Character */
const localPlayer = Players.LocalPlayer;
let _wcsCharacter: Character | undefined;

/* GUI Component Instances */
let SkillBarInstance: SkillBar | undefined;
let CharacterFrameInstance: CharacterFrame | undefined;

/*================== Event Handlers  ================================= */

/* Character Created */
Character.CharacterCreated.Connect((wcsCharacter) => {
	Logger.Log(script, "[NEW STYLE]: Character Created");
	_wcsCharacter = wcsCharacter;
	SkillBarInstance = new SkillBar(wcsCharacter);
	CharacterFrameInstance = new CharacterFrame(localPlayer);
	SkillRemotes.SkillBarCreated.SendToServer();
});

/* Character Destroyed */
Character.CharacterDestroyed.Connect(() => {
	Logger.Log(script, "[NEW STYLE]: Character Destroyed");
	SkillBarInstance?.Destroy();
});

/* Skill Assignment Response */
SkillRemotes.SendSkillAssignment.Connect((skillSlotMap: Map<number, SkillId>) => {
	Logger.Log(script, "[NEW STYLE]: Skill Assignment Response", skillSlotMap as unknown as string);
	SkillBarInstance?.LoadSkills(skillSlotMap);
});
