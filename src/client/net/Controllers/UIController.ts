import Logger from "shared/Utility/Logger";
import { Players } from "@rbxts/services";
import CharacterFrame from "shared/Epic UI/Character Frame/CharacterFrame";
import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";
import { GetSkillSlotMap } from "shared/Data Interfaces/PlayerData";
import { GameCycleEvents, CharacterEvent } from "../ClientEvents";
import { Character } from "@rbxts/wcs";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

export default class UIController {
	// Singleton
	private static _instance: UIController;
	private static SkillBar = new SkillBar();
	private static CharacterFrame = new CharacterFrame();

	// Connections
	private static _playerDataLoaded: RBXScriptConnection | undefined;
	private static _resourceUpdated: RBXScriptConnection | undefined;
	private static _CharacterCreated: RBXScriptConnection | undefined;
	private static _wcsCharacterCreated: RBXScriptConnection | undefined;
	private static _wcsCharacterDestroyed: RBXScriptConnection | undefined;

	// Constructor
	private constructor() {
		Logger.Log(script, "CONSTRUCTOR()");
	}

	public static Start() {
		if (this._instance === undefined) {
			this._instance = new UIController();
			this._initializeListeners();
			GameCycleEvents.PlayerUIReady.SendToServer();
		}
	}

	private static _initializeListeners() {
		/* Character Frame Created */
		this._playerDataLoaded?.Disconnect();
		this._playerDataLoaded = GameCycleEvents.PlayerDataLoaded.Connect((playerData) => {
			const skillSlotMap = GetSkillSlotMap(playerData);
			this.SkillBar.LoadSkills(skillSlotMap as Map<number, SkillId>);
			this.CharacterFrame.Update(playerData);
		});

		/* Resource Updated */
		this._resourceUpdated?.Disconnect();
		this._resourceUpdated = CharacterEvent.ResourceUpdated.Connect((resource) => {
			this.CharacterFrame.UpdateResource(resource);
		});

		/* WCS Character Created */
		this._wcsCharacterCreated?.Disconnect();
		this._wcsCharacterCreated = Character.CharacterCreated.Connect((character) => {
			Logger.Log(script, "[UIController] Character Created");
			this.SkillBar.SetWCSCharacter(character);
		});

		/* WCS Character Destroyed */
		this._wcsCharacterDestroyed?.Disconnect();
		this._wcsCharacterDestroyed = Character.CharacterDestroyed.Connect(() => {
			Logger.Log(script, "[UIController] Character Destroyed");
		});

		/* Character Created */
		this._CharacterCreated?.Disconnect();
		this._CharacterCreated = Players.LocalPlayer.CharacterAdded.Connect(() => {
			Logger.Log(script, "[UIController] Character Created");
			GameCycleEvents.PlayerUIReady.SendToServer();
		});
	}
}
