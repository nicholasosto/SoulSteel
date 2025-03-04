// import Logger from "shared/Utility/Logger";
// import { IPlayerData } from "shared/_Functions/DataFunctions";
// import { DataTemplate } from "./DataTemplate";

// // Data Cache Class for use in the DataManager
// export class DataCache {
// 	public _userId: string;
// 	public _playerData: IPlayerData;
// 	private _lastSaveTimestamp: number = 0;
// 	private _minSaveInterval: number = 2;
// 	private _dataStore: DataStore;

// 	constructor(userId: string, dataStore: DataStore) {
// 		// Set the properties
// 		this._userId = userId;
// 		this._dataStore = dataStore;

// 		// Attempt to load the player data from the DataStore
// 		this._playerData = dataStore.GetAsync(userId)[0] as IPlayerData;

// 		// If the player data is not found, create a new player data based on the DataTemplate
// 		if (this._playerData === undefined) {
// 			this._playerData = DataTemplate;
// 			this.Save();
// 		} else {
// 			Logger.Log(script, "Data Loaded");
// 		}
// 	}

// 	// Save
// 	public Save(): boolean {
// 		Logger.Log(script, "Attempting Save: ", this._playerData as unknown as string);
// 		// Save the player data to the DataStore

// 		const timeSinceLastSave = os.time() - this._lastSaveTimestamp;
// 		if (timeSinceLastSave <= this._minSaveInterval) {
// 			// Do not save if the last save was less than 2 seconds ago
// 			Logger.Log(script, "Skipped Save", timeSinceLastSave);
// 			return false;
// 		}
// 		const success = this._dataStore.SetAsync(this._userId, this._playerData);

// 		Logger.Log(script, "Save Success: ", success);

// 		// Update the last save timestamp
// 		this._lastSaveTimestamp = os.time();

// 		return true;
// 	}

// 	// Updates the DataCache with the provided player data
// 	public SetDataCache(dataCache: IPlayerData) {
// 		this._playerData = dataCache;
// 		this.Save();
// 	}

// 	public GetDataCache(): IPlayerData {
// 		return this._playerData;
// 	}

// 	// Saves the DataCache to the Roblox DataStore
// }
