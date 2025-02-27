import Logger from "shared/Utility/Logger";
import { DataStoreService } from "@rbxts/services";
import IDataManager from "shared/_Interfaces/Character Managers/IDataManager";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import IPlayerData from "shared/_Interfaces/IPlayerData";

const PlayerDataStore = DataStoreService.GetDataStore("PlayerData-X01");

const DefualtData: IPlayerData = {
	key: "Datatemplate",
	version: 1,

	CharacterInfo: {
		CharacterName: "Player",
	},
	ProgressionStats: {
		Level: 1,
		Experience: 0,
		ExperienceToNextLevel: 100,
	},
	CharacterClass: {
		ClassId: "Vampire",
		ClassLevel: 1,
		ClassPoints: 0,
		ClassExperience: 0,
		ClassExperienceToNextLevel: 100,
	},
	CharacterStats: {
		Strength: 14,
		Speed: 9,
		Dexterity: 3,
		Intelligence: 5,
		Constitution: 7,
	},
	Skills: {
		unlockedSkills: ["BasicHold", "BasicMelee", "BasicRanged", "HallowHold"],
		assignedSlots: ["HallowHold", "BasicMelee", "BasicRanged"],
	},
	Equipment: {
		EquipmentSlots: [],
	},
	Inventory: {
		InventorySlots: [],
	},
	Quests: {
		ActiveQuests: [],
		CompletedQuests: [],
	},
};

export default class PlayerDataManager implements IDataManager {
	private _playerCharacter: IPlayerCharacter;
	private _userId: string;
	private _playerData: IPlayerData | undefined;

	constructor(playerCharacter: IPlayerCharacter) {
		this._playerCharacter = playerCharacter;
		//this._playerData = PlayerDataStore.
		this._userId = tostring(playerCharacter.player.UserId);
		this._playerData = this._LoadPlayerData();
	}
	public OnPlayerJoined(): void {
		Logger.Log(script, `[PlayerDataManager]: Player joined with ID ${this._userId}`);
		this._playerData = this._LoadPlayerData();
	}
	public OnCharacterDied(): void {
		Logger.Log(script, `[PlayerDataManager]: Player died with ID ${this._userId}`);
		this.SavePlayerData();
	}

	public GetData(): IPlayerData {
		return this._playerData as IPlayerData;
	}
	public SavePlayerData(): void {
		const randomData = { dummy: "random-data" + tostring(math.random(1, 100)) };
		Logger.Log("SAVE DATA: " + math.round(tick()), `[PlayerDataManager]: Saving player data for ${this._userId}`);
		PlayerDataStore.SetAsync(this._userId, this._playerData);
	}
	private _LoadPlayerData(): IPlayerData {
		Logger.Log("LOAD DATA: " + math.round(tick()), `[PlayerDataManager]: Loading player data for ${this._userId}`);
		const playerData = PlayerDataStore.GetAsync(this._userId)[0] as IPlayerData;
		if (playerData === undefined) {
			Logger.Log(script, `[PlayerDataManager]: No player data found for ${this._userId}, creating new data`);
			return DefualtData;
		}
		return playerData;
	}
}
