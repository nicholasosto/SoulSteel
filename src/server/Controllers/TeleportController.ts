import Logger from "shared/Utility/Logger";
import { GetPlayerCharacter, GetGameCharacter } from "shared/_Registry/EntityRegistration";
import { Remotes } from "shared/net/Remotes";

/* Targeting Controller */
export default class TeleportController {
	private static _instance: TeleportController;

	/* Remotes */
	private static _TeleportRequest = Remotes.Server.Get("TeleportTo");

	/* Connections */
	private static _teleportConnection: RBXScriptConnection;

	/* Constructor */
	private constructor() {
		Logger.Log(script, "CONSTRUCTOR()");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new TeleportController();
			this._initializeListeners();
		}
	}

	/* Initialize Listeners */
	private static _initializeListeners() {
		/* #C2SRemote -  Target Selected */
		this._teleportConnection?.Disconnect();
		this._teleportConnection = this._TeleportRequest.Connect((player: Player, destination: Vector3) => {
			/* Get the player character */
			const playerChar = GetPlayerCharacter(player);

			/* Teleport the player */
			playerChar?.gameCharacterModel.PivotTo(new CFrame(destination));
		});
	}
}
