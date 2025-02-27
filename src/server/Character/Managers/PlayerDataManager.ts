import Logger from "shared/Utility/Logger";
import { DataStoreService } from "@rbxts/services";
import IDataManager from "shared/_Interfaces/Character Managers/IDataManager";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import IPlayerData from "shared/_Interfaces/IPlayerData";

const PlayerDataStore = DataStoreService.GetDataStore("PlayerData-X01");

export default class PlayerDataManager implements IDataManager {
	private _playerCharacter: IPlayerCharacter;
	private _userId: string;
	private _playerData: IPlayerData | undefined;

	constructor(playerCharacter: IPlayerCharacter) {
		this._playerCharacter = playerCharacter;
		//this._playerData = PlayerDataStore.
		this._userId = tostring(playerCharacter.player.UserId);
		Logger.Log(script, "PlayerDataManager created", PlayerDataStore.SetAsync(this._userId, { dummy: "data" }));
	}
	public OnPlayerJoined(): void {
		Logger.Log(script, `[PlayerDataManager]: Player joined with ID ${this._userId}`);
		this.LoadPlayerData();
	}
	public OnCharacterDied(): void {
		Logger.Log(script, `[PlayerDataManager]: Player died with ID ${this._userId}`);
		this.SavePlayerData();
	}
	public SavePlayerData(): void {
		const randomData = { dummy: "random-data" + tostring(math.random(1, 100)) };
		Logger.Log("SAVE DATA: " + math.round(tick()), `[PlayerDataManager]: Saving player data for ${this._userId}`);
		PlayerDataStore.SetAsync(this._userId, this._playerData);
	}
	public LoadPlayerData(): void {
		Logger.Log("LOAD DATA: " + math.round(tick()), `[PlayerDataManager]: Loading player data for ${this._userId}`);
	}
}
