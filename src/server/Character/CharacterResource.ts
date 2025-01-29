import { CharacterStatId } from "shared/Character Resources/CharacterResourceTypes";
import { ResourceId } from "shared/_References/Resources";

// Resource Bar Names
enum EResourceBarNames {
	Health = "Health Bar",
	Mana = "Mana Bar",
	Stamina = "Stamina Bar",
	Experience = "Experience Bar",
	DomainEnergy = "Domain Bar",
}

type TCharacterResource = {
	ResourceName: string;
	PrimaryStat: CharacterStatId;
	SecondaryStat: CharacterStatId;
	GetPercentage: () => number;
	GetLabel: () => string;
	ActivateRegen: (activate: boolean) => void;
};

// Character Resource Class
class CharacterResource {
	// Resource Name
	public ResourceName: string = "DefaultResource";

	// Resource Values
	private _maxValue: number = 100;
	private _currentValue: number = 100;

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
		return (this._currentValue / this._maxValue) * 100;
	}

	// Set Max Value
	public SetMax(value: number) {
		this._maxValue = value;
	}

	// Set Current Value
	public SetCurrent(value: number) {
		this._currentValue = value;
	}

	// Regen Toggle: Activates or deactivates the regen step
	public RegenToggle(activate: boolean) {
		this._regenActive = activate;
	}

	// Regen Step:
	public regenStep() {
		// Check if regen is active and if the max value is not reached
		if (!this._regenActive || this._currentValue >= this._maxValue) {
			return;
		}
		if (this._currentValue + this._regenAmount > this._maxValue) {
			this.SetCurrent(this._maxValue);
			return;
		}
		this.SetCurrent(this._currentValue + this._regenAmount);
	}
}

function CreateCharacterResource(resourceName: ResourceId, characterLevel: number) {
	const characterResource = new CharacterResource(resourceName);
	characterResource.SetMax(characterLevel * 100);
	characterResource.SetCurrent(characterLevel * 100);
	return characterResource;
}

export { CharacterResource, CreateCharacterResource };
