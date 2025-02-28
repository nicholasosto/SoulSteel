import { Players, UserInputService } from "@rbxts/services";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import Logger from "shared/Utility/Logger";

enum MovementState {
	Normal,
	Dashing,
	Flying,
	MultiJump,
}

export default class MovementController {
	private player = Players.LocalPlayer;
	private character: TGameCharacter;
	private humanoid: Humanoid;
	private currentState: MovementState = MovementState.Normal;
	private numJumps = 3;

	private _connectionCharacterJoined: RBXScriptConnection | undefined;

	/* Constructor */
	constructor() {
		this.character = (this.player.Character || this.player.CharacterAppearanceLoaded.Wait()[0]) as TGameCharacter;
		this.humanoid = this.character.Humanoid;
	}

	private _initializeConnections() {
		this._connectionCharacterJoined?.Disconnect();
		this._connectionCharacterJoined = this.player.CharacterAppearanceLoaded.Connect(() => {
			Logger.Log(script, "where is my AI!!! lol");
		});
	}
}
