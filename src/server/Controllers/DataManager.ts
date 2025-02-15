// Roblox Services
import { Players, DataStoreService } from "@rbxts/services";

// My Imports
import Logger from "shared/Utility/Logger";
import { DataCache } from "server/PlayerData/DataCache";

const PlayerDataRegistry = new Map<string, DataCache>();

interface PersistantDataController {
	// Singleton
	_instance: PersistantDataController;
	DatastoreId: string;
	GameDataStore: GlobalDataStore;
	playerAddedConnection: RBXScriptConnection;

	Start(): void;
	RegisterPlayer(player: Player): void;
	GetDataCache(player: Player): DataCache;
	OnPlayerLeaving(player: Player): void;
}

/* Original Code */
export default class DataManager {
	// Singleton
	private static _instance: DataManager;
	private static DatastoreId = "SOULSTEEL_2025";
	private static GameDataStore = DataStoreService.GetDataStore(DataManager.DatastoreId);
	private static playerAddedConnection: RBXScriptConnection;

	private constructor() {
		DataManager.playerAddedConnection?.Disconnect();
		DataManager.playerAddedConnection = Players.PlayerAdded.Connect((player) => {
			DataManager.RegisterPlayer(player);
		});
	}

	public static Start(): void {
		if (this._instance === undefined) {
			this._instance = new DataManager();
		}
	}

	// Called from the Server OnPlayerAdded event
	public static RegisterPlayer(player: Player): void {
		// 01 - Get the player data from the DataStore or Cache
		const userId = tostring(player.UserId);

		// 02 - Check if the player is already registered
		if (PlayerDataRegistry.has(userId)) {
			Logger.Log(script, "Player already registered: ", PlayerDataRegistry.get(userId) as unknown as string);
			return;
		}

		// 03 - Create a new DataCache for the player
		const dataCache = new DataCache(userId, DataManager.GameDataStore);

		// 04 - Register the player in the PlayerCache
		PlayerDataRegistry.set(userId, dataCache);
	}

	public static GetDataCache(player: Player): DataCache {
		const dataCache = PlayerDataRegistry.get(tostring(player.UserId)) as DataCache;
		return dataCache;
	}

	// Called from the Server OnPlayerLeaving event
	public static OnPlayerLeaving(player: Player): void {
		// 01 - Get the data cache for the player
		const userId = tostring(player.UserId);
		const dataCache = PlayerDataRegistry.get(userId) as DataCache;
		dataCache.Save();
	}
}
