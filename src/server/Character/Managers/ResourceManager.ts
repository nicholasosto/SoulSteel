import Logger from "shared/Utility/Logger";
import { CharacterResource } from "../Classes/CharacterResource";
import { UnknownSkill } from "@rbxts/wcs";

import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import ICharacterStats from "shared/_Interfaces/Player Data/ICharacterStats";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import ServerNetManager from "server/Net/ServerNetManager";

/* Resource Manager */
export default class StatsManager {
	/* Player Character */
	private _playerCharacter: IPlayerCharacter;

	private _coreStats: ICharacterStats;
	private _derivedStats = {
		MaxHealth: 0,
		MaxStamina: 0,
		MaxSoulPower: 0,
		MaxDomainResource: 0,
	};

	/* Constructor */
	constructor(PlayerCharacter: IPlayerCharacter, playerData: IPlayerData) {
		/* Set Player Character */
		this._playerCharacter = PlayerCharacter;
		this._coreStats = playerData["CharacterStats"];
		/* Initialize Derived Stats */
		this._updateDerivedStats();
	}

	private _updateDerivedStats() {
		this._derivedStats.MaxHealth = this._coreStats.Constitution * 10;
		this._derivedStats.MaxStamina = this._coreStats.Constitution * 5 + this._coreStats.Dexterity * 5;
		this._derivedStats.MaxSoulPower = this._coreStats.Intelligence * 10;
		this._derivedStats.MaxDomainResource =
			this._coreStats.Strength * 3 + this._coreStats.Intelligence * 3 + this._coreStats.Speed * 3;
	}
}
