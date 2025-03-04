import Logger from "shared/Utility/Logger";
import IGameCharacter from "shared/_Interfaces/IGameCharacter";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import ITargetManager from "shared/_Interfaces/Character Managers/ITargetManager";
import { GetNPCCharacter, GetPlayerCharacter } from "shared/_Registry/EntityRegistration";
import { C2S } from "shared/net/Remotes";

export default class TargetManager implements ITargetManager {
	private _playerCharacter: IPlayerCharacter;
	private _target: IGameCharacter | undefined;

	/*Connections*/
	private _targetSelected: RBXScriptConnection | undefined;

	/* Constructor */
	constructor(playerCharacter: IPlayerCharacter) {
		this._playerCharacter = playerCharacter;
		Logger.Log(script, `[TargetManager]: Initialized for ${this._playerCharacter.displayName}`);
		this._InitializeConnections();
	}

	/* Initialize Connections */
	private _InitializeConnections(): void {
		this._targetSelected?.Disconnect();
		this._targetSelected = C2S.Server.Get("TargetSelected").Connect((player: Player, targetId: string) => {
			const targetChar = GetNPCCharacter(targetId)
				? this.OnTargetSelected(GetNPCCharacter(targetId)!)
				: this.OnTargetSelected(GetPlayerCharacter(targetId)!);
			Logger.Log(script, `[TargetManager]: Target Selected X: ${this._target?.displayName}`);
		});
	}

	/* Get Target */
	public GetTarget(): IGameCharacter | undefined {
		if (!this._target?.characterModel) {
			Logger.Log(script, `[TargetManager]: Target is nil`);
			return undefined;
		}
		return this._target;
	}

	/* Target Selected Event Handler */
	public OnTargetSelected(target: IGameCharacter): void {
		/* Set the target property*/
		this._target = target;
		this._target = target as IGameCharacter;

		/* Target Died Event Handler */
		target.characterModel?.Humanoid.Died.Once(() => {
			this.OnTargetDeselected();
		});
	}

	/* Target Deselected Event Handler */
	public OnTargetDeselected(): void {
		Logger.Log(script, `[TargetManager]: Target Deselected`);
		this._target = undefined;
	}
}
