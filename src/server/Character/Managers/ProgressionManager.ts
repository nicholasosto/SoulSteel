import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";

export default class ProgressionManager {
	private _playerCharacter: IPlayerCharacter;
	constructor(playerCharacter: IPlayerCharacter) {
		this._playerCharacter = playerCharacter;
	}
}
