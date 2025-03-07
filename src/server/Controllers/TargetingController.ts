import Logger from "shared/Utility/Logger";
import { GetPlayerCharacter, GetGameCharacter } from "shared/_Registry/EntityRegistration";
import { Remotes } from "shared/net/Remotes";

/* Targeting Controller */
export default class TargetingController {
	private static _instance: TargetingController;

	/* Remotes */
	private static _TargetSelected = Remotes.Server.Get("TargetSelected");

	/* Connections */
	private static _connectionTargetSelected: RBXScriptConnection;

	/* Constructor */
	private constructor() {
		Logger.Log(script, "CONSTRUCTOR()");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new TargetingController();
			this._initializeListeners();
		}
	}

	/* Initialize Listeners */
	private static _initializeListeners() {
		/* #C2SRemote -  Target Selected */
		this._connectionTargetSelected?.Disconnect();
		this._connectionTargetSelected = this._TargetSelected.Connect((player: Player, targetId: string) => {
			/* Get the player character */
			const playerChar = GetPlayerCharacter(player);

			/* Get the Target Manager */
			const playerTargetManager = playerChar?.targetManager;
			if (playerTargetManager === undefined) {
				Logger.Log(script, `[TargetingController]: TargetManager not found`);
				return;
			}

			/* Get the target game character */
			const targetGameCharacter = GetGameCharacter(targetId);
			if (targetGameCharacter === undefined) {
				Logger.Log(script, `[TargetingController]: Target not found`);
				return;
			}

			/* Set the target */
			playerTargetManager.OnTargetSelected(targetGameCharacter);
		});
	}
}
