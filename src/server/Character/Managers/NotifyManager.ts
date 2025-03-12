import PlayerCharacter from "../PlayerCharacter";

export default class NotifyManager {
	private _playerCharacter: PlayerCharacter;

	public constructor(playerCharacter: PlayerCharacter) {
		this._playerCharacter = playerCharacter;
	}

	public Notify() {
		warn("Notify Manager: Notifying");
	}
}
