// import { Remotes } from "shared/net/Remotes";
// import { GetPlayerCharacter } from "shared/_Registry/EntityRegistration";

// import Logger from "shared/Utility/Logger";

// /* Player Data Controller */
// export default class PlayerDataController {
// 	private static _instance: PlayerDataController;

// 	/* Remotes - Outbound */
// 	private static _SendPlayerData = Remotes.Server.Get("SendPlayerData");

// 	/* Remotes - Inbound */
// 	private static _PlayerDataRequest = Remotes.Server.Get("PlayerDataRequest");

// 	/* Connections */
// 	private static _connectionPlayerDataRequest: RBXScriptConnection;

// 	/* Constructor */
// 	private constructor() {
// 		Logger.Log(script, "CONSTRUCTOR()");
// 	}

// 	/* Start */
// 	public static Start() {
// 		if (this._instance === undefined) {
// 			this._instance = new PlayerDataController();
// 			this._initializeListeners();
// 		}
// 	}

// 	/* Initialize Listeners */
// 	private static _initializeListeners() {
// 		/* Player Data Request */
// 		this._connectionPlayerDataRequest?.Disconnect();
// 		this._connectionPlayerDataRequest = this._PlayerDataRequest.Connect((player) => {
// 			Logger.Log("PlayerDataRequest", player);
// 			/* Get the player character */
// 			const playerCharacter = GetPlayerCharacter(player);
// 			/* Get the player data */
// 			const playerData = playerCharacter?.dataManager.GetData();
// 			if (playerData === undefined) {
// 				warn("Player Data Not Found", player);
// 				return;
// 			}

// 			/* #S2CRemote: Send Player Data */
// 			this._SendPlayerData.SendToPlayer(player, playerData);
// 		});
// 	}
// }
