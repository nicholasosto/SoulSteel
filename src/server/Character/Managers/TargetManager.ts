import Logger from "shared/Utility/Logger";
import IGameCharacter from "shared/_Interfaces/IGameCharacter";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import ITargetManager from "shared/_Interfaces/Character Managers/ITargetManager";

export default class TargetManager implements ITargetManager {
	private _playerCharacter: IPlayerCharacter;
	private _target: IGameCharacter | undefined;
	constructor(playerCharacter: IPlayerCharacter) {
		this._playerCharacter = playerCharacter;
		Logger.Log(script, `[TargetManager]: Initialized for ${this._playerCharacter.displayName}`);
	}

	/* Get Target */
	public GetTarget(): IGameCharacter | undefined {
		Logger.Log(script, `[TargetManager]: GetTarget: ${this._target?.displayName}`);
		return this._target;
	}

	/* Target Selected Event Handler */
	public OnTargetSelected(target: IGameCharacter): void {
		Logger.Log(script, `[TargetManager]: Target Selected: ${target.displayName}`);
		this._target = target as IGameCharacter;
	}

	/* Target Deselected Event Handler */
	public OnTargetDeselected(): void {
		Logger.Log(script, `[TargetManager]: Target Deselected`);
		this._target = undefined;
	}
}
