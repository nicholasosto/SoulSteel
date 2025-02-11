import { IPlayerData } from "shared/_Functions/DataFunctions";
import { ResourceId } from "server/Character/Index/CharacterIndex";

// Character Resource Class
class CharacterResource {
	// Resource Name
	public ResourceName: string = "DefaultResource";

	// Resource Values
	private MaxValue: number = 100;
	private Current: number = 100;

	// Regen Values
	private _regenAmount: number = 10;
	private _regenActive: boolean = false;

	// Constructor
	constructor(resourceName: string, primaryStatValue: number, secondaryStatValue: number, level: number) {
		// Attribute Names and Values
		this.ResourceName = resourceName;
		this.MaxValue = (primaryStatValue + secondaryStatValue / 2) * level;
		this.Current = this.MaxValue;
		this._regenAmount = primaryStatValue / 10;
		this._regenActive = true;
	}

	// Get Current Value
	public GetCurrent() {
		return this.Current;
	}

	public GetMax() {
		return this.MaxValue;
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
		if (value >= this.MaxValue) {
			this.Current = this.MaxValue;
			return;
		}

		if (value <= 0) {
			this.Current = 0;
			return;
		}
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

export { CharacterResource };
