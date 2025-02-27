import Logger from "shared/Utility/Logger";
import { Players } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import DataManager from "./DataManager";
import PlayerCharacter from "server/Character/PlayerCharacter";
import { IPlayerData } from "shared/_Functions/DataFunctions";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import { Outbound, QuestCompleted } from "server/net/_Server_Events";

type TConnectionName = "TakeDamage" | "Die";

export default class PCController {
	// Static Instance
	private static _instance: PCController;

	// Registry
	public static _PlayerCharacters: Map<string, PlayerCharacter> = new Map();
	public static _CharacterConnections: Map<PlayerCharacter, Map<TConnectionName, RBXScriptConnection>> = new Map();
	public static _QuestCompletedConnection: RBXScriptConnection;

	/* Constructor */
	private constructor() {
		Logger.Log(script, "Starting PC Controller");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new PCController();
			this._InitConnections();
		}
	}

	private static _InitConnections() {
		this._QuestCompletedConnection?.Disconnect();
		this._QuestCompletedConnection = QuestCompleted.Connect((player, questId) => {
			const playerCharacter = this.GetPlayerCharacter(player);
			const completed = playerCharacter?.OnQuestCompleted(questId);
			if (completed) {
				const playerDataCache = DataManager.GetDataCache(player);
				assert(playerDataCache !== undefined, "Player Data is nil");
				assert(playerCharacter !== undefined, "Player Character is nil");
				playerCharacter.UpdateExperience(playerCharacter.ProgressionStats.Experience + 100);
				const newCache = playerDataCache._playerData;
				newCache.ProgressionStats = playerCharacter.ProgressionStats;
				playerDataCache.SetDataCache(newCache);

				Outbound.SendQuestRewarded(player, questId);
				Outbound.SendProgressionStats(player, playerDataCache._playerData.ProgressionStats);
			}
		});
	}

	/* On Character Added */
	public static CreatePlayerCharacter(player: Player, character: Model): IPlayerCharacter {
		Logger.LogFlow("[Player Character Flow][Creation]", 2, script);
		/* Get Player Data */
		const playerData = DataManager.GetDataCache(player)._playerData as IPlayerData;

		/* Create the WCS Character */
		const wcsCharacter = new Character(character);

		wcsCharacter.Destroyed.Connect(() => {
			Logger.LogFlow("[Player Character Flow][Creation]", 4, script);
			this.RemovePlayerCharacter(player);
		});

		/* Create Player Character */
		const playerCharacter = new PlayerCharacter(player, playerData, wcsCharacter);

		/* Add to Registry */
		this._PlayerCharacters.set(tostring(player.UserId), playerCharacter);
		Logger.LogFlow("[Player Character Flow][Creation]", 3, script);
		return playerCharacter;
	}

	/* On Character Removed */
	public static RemovePlayerCharacter(player: Player) {
		Logger.Log("Flow - Remove Player Character", player.Name);
		// Get the Game Character
		const playerCharacter = this._PlayerCharacters.get(tostring(player.UserId)) as PlayerCharacter;

		playerCharacter?.OnDeath();

		// Remove from the Registry
		this._PlayerCharacters.delete(tostring(player.UserId));
	}

	/* Get Game Character */
	public static GetPlayerCharacter(player: Player): PlayerCharacter | undefined {
		return PCController._PlayerCharacters.get(tostring(player.UserId)) as PlayerCharacter;
	}

	public static GetPlayerCharacterFromCharacter(character: Model): PlayerCharacter | undefined {
		const player = Players.GetPlayerFromCharacter(character);
		Logger.Log(script, "Getting PlayerCharacter: ", player);
		const UserId = tostring(player?.UserId);

		const playerCharacter = this._PlayerCharacters.get(UserId);
		if (playerCharacter === undefined) {
			Logger.Log(script, "Player Character is nil", "PlayerList: ");
			this._PlayerCharacters.forEach((value, key) => {
				Logger.Log(script, key, value.player.Name);
			});
		}

		return playerCharacter;
	}
}
