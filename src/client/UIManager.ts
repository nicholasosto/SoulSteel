// File: Modules/UIManager.ts

import { Players } from "@rbxts/services";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import { Remotes } from "shared/net/Remotes";

export default class UIManager {
	private static _instance: UIManager;
	private static guiInstances: Instance[] = [];
	private static connections: RBXScriptConnection[] = [];

	/* Remotes */
	private static _gameCharacterCreated = Remotes.Client.Get("GameCharacterCreated");
	private static _gameCharacterDestroyed = Remotes.Client.Get("GameCharacterDestroyed");

	private constructor() {}

	public static Start() {
		if (this._instance === undefined) {
			this._instance = new UIManager();
		}
	}

	private static _initializeConnections() {
		const GameCharacterCreatedConnection = this._gameCharacterCreated.Connect(() => {
			print("UIManager - GameCharacterCreated");
		});
		this.connections.push(GameCharacterCreatedConnection);

		const GameCharacterDestroyedConnection = this._gameCharacterDestroyed.Connect(() => {
			print("UIManager - GameCharacterDestroyed");
		});
		this.connections.push(GameCharacterDestroyedConnection);
	}

	public static cleanup() {
		// Disconnect old events
		this.connections.forEach((conn) => conn.Disconnect());
		this.connections = [];

		// Destroy old GUI instances
		this.guiInstances.forEach((instance) => instance.Destroy());
		this.guiInstances = [];
	}
}

Players.LocalPlayer.CharacterAdded.Connect(() => {
	warn("Starting UIManager - Character Added");
	UIManager.Start();
});

Players.LocalPlayer.CharacterRemoving.Connect(() => {
	warn("Cleaning up UIManager - Character Removed");
	UIManager.cleanup();
});
