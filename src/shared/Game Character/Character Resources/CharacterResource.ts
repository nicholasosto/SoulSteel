import { IPlayerData } from "shared/_References/PlayerData";
import { ResourceId } from "shared/_References/Resources";


// Character Resource Class
class CharacterResource {
	// Resource Name
	public ResourceName: string = "DefaultResource";

	// Resource Values
	public MaxValue: number = 100;
	public Current: number = 100;

	// Regen Values
	private _regenAmount: number = 10;
	private _regenActive: boolean = false;

	// Constructor
	constructor(resourceName: string) {
		// Attribute Names and Values
		this.ResourceName = resourceName;
	}

	// Get Percentage
	public GetPercentage() {
		return (this.Current / this.MaxValue) * 100;
	}

	// Get Values
	public GetValues(): [current: number, max: number] {
		return [this.Current, this.MaxValue];
	}

	// Set Max Value
	public SetMax(value: number) {
		this.MaxValue = value;
	}

	// Set Current Value
	public SetCurrent(value: number) {
		this.Current = value;
	}

	// Regen Toggle: Activates or deactivates the regen step
	public RegenToggle(activate: boolean) {
		this._regenActive = activate;
	}

	// Regen Step:
	public regenStep() {
		// Check if regen is active and if the max value is not reached
		if (!this._regenActive || this.Current >= this.MaxValue) {
			return;
		}
		if (this.Current + this._regenAmount > this.MaxValue) {
			this.SetCurrent(this.MaxValue);
			return;
		}
		this.SetCurrent(this.Current + this._regenAmount);
	}
}

function CreateCharacterResource(resourceName: ResourceId, playerData: IPlayerData): CharacterResource {
	const characterResource = new CharacterResource(resourceName);

	const levelMultiplier = playerData.ProgressionStats.Level * 10;
	let primaryStatValue = 0;
	let secondaryStatValue = 0;

	switch (resourceName) {
		case "Health":
			primaryStatValue = playerData.CharacterStats.Constitution;
			secondaryStatValue = playerData.CharacterStats.Strength;
			break;
		case "Mana":
			primaryStatValue = playerData.CharacterStats.Intelligence
			secondaryStatValue = playerData.CharacterStats.Constitution;
			break;
		case "Stamina":
			primaryStatValue = playerData.CharacterStats.Dexterity;
			secondaryStatValue = playerData.CharacterStats.Constitution;
			break;
	}

	const primaryStatMultiplier = primaryStatValue * 10;
	const secondaryStatMultiplier = secondaryStatValue * 3;

	characterResource.SetMax(levelMultiplier + primaryStatMultiplier + secondaryStatMultiplier);
	characterResource.SetCurrent(characterResource.GetValues()[1]);
	characterResource.RegenToggle(true);
	return characterResource;
}

export { CharacterResource, CreateCharacterResource };
