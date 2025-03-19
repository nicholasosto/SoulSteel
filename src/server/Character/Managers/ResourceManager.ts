import Logger from "shared/Utility/Logger";
import { ResourceBars, PlayerStats } from "shared/_ROACT/Components/DataValueObjects";

import { CharacterResource } from "../Classes/CharacterResource";
import { UnknownSkill } from "@rbxts/wcs";

import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import ICharacterStats from "shared/_Interfaces/Player Data/ICharacterStats";
import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import ServerNetManager from "server/Net/ServerNetManager";

/* Resource Manager */
export default class ResourceManager {
	/* Player Character */
	private _playerCharacter: IPlayerCharacter;

	/* Resources */
	public ResourceBars = ResourceBars;

	/* Constructor */
	constructor(PlayerCharacter: IPlayerCharacter, playerData: IPlayerData) {
		/* Set Player Character */
		this._playerCharacter = PlayerCharacter;
		PlayerStats.playerAttributePoints.set(playerData.AvaliableAttributePoints);
		PlayerStats.playerSpentAttributePoints.set(playerData.SpentAttributePoints);
		PlayerStats.playerConstitution.set(playerData.CharacterStats.Constitution);
		PlayerStats.playerIntelligence.set(playerData.CharacterStats.Intelligence);
		PlayerStats.playerStrength.set(playerData.CharacterStats.Strength);
		PlayerStats.playerDexteriy.set(playerData.CharacterStats.Dexterity);
		/* Initialize Resources */

		/* Set Humanoid Stats */
		this._playerCharacter.humanoid.MaxHealth = this.ResourceBars.PlayerHealth.playerMaxHealth.get();
		this._playerCharacter.humanoid.Health = this.ResourceBars.PlayerHealth.playerCurrentHealth.get();
	}

	public OnHeartBeat() {
		//Logger.Log(script, `[ResourceManager]: Heartbeat`);
		const playerCurrentHealth = ResourceBars.PlayerHealth.playerCurrentHealth.get();
		const playerMaxHealth = ResourceBars.PlayerHealth.playerCurrentHealth.get();

		if (playerCurrentHealth < playerMaxHealth) {
			ResourceBars.PlayerHealth.playerCurrentHealth.set(playerCurrentHealth + 1);
		}

		const missingStamina =
			ResourceBars.PlayerStamina.playerMaxStamina.get() - ResourceBars.PlayerStamina.playerCurrentStamina.get();
		if (missingStamina > 0) {
			ResourceBars.PlayerStamina.playerCurrentStamina.set(
				ResourceBars.PlayerStamina.playerCurrentStamina.get() + 1,
			);
		}
	}

	private updateClientResourceBars() {
		const HealthCurrent = this.ResourceBars.PlayerHealth.playerCurrentHealth.get();
		const SoulPowerCurrent = this.ResourceBars.PlayerSoulPower.playerCurrentSoulPower.get();
		const StaminaCurrent = this.ResourceBars.PlayerStamina.playerCurrentStamina.get();

		ServerNetManager.SendResourceData(this._playerCharacter.player, {
			Health: HealthCurrent,
			SoulPower: SoulPowerCurrent,
			Stamina: StaminaCurrent,
			DomainEssence: ResourceBars.PlayerDomainResource.playerDomainResourceCurrent.get(),
			Experience: this._playerCharacter.dataManager.GetData().ProgressionStats.Experience,
		});
	}

	public OnDamageTaken(damage: number): void {
		this.ResourceBars.PlayerHealth.playerCurrentHealth.set(
			this.ResourceBars.PlayerHealth.playerCurrentHealth.get() - damage,
		);
		print(`Damage Taken: ${damage}`);
	}

	public OnSkillStarted(skill: UnknownSkill): void {
		this.ResourceBars.PlayerSoulPower.playerCurrentSoulPower.set(
			this.ResourceBars.PlayerSoulPower.playerCurrentSoulPower.get() - 11,
		);

		this.ResourceBars.PlayerStamina.playerCurrentStamina.set(9);
		Logger.Log(script, `[ResourceManager]: Skill Started: ${skill}`);
	}

	public OnSkillEnded(skill: UnknownSkill): void {
		Logger.Log(script, `[ResourceManager]: Skill Ended: ${skill}`);
	}

	public Destroy() {
		Logger.Log("[Destroying]", `ResourceManager: ${this._playerCharacter.player.Name}`);
	}
}
