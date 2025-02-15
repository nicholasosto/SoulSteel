import { ResourceId } from "server/Character/Index/CharacterIndex";
import ICharacterResource from "shared/_Interfaces/ICharacterResource";
import Logger from "shared/Utility/Logger";

// Character Resource Class
class CharacterResource implements ICharacterResource {
	// Resource Name
	public ResourceId: ResourceId = "Health";

	// Resource Values
	public MaxValue: number;
	public Current: number;

	// Regen Values
	private _regenAmount: number = 10;
	private _regenRate: number = 1;
	private _lastRegen: number = tick();
	private _regenActive: boolean = false;

	// Regen Rate

	// Constructor
	constructor(resourceId: ResourceId, maxValue: number) {
		// Attribute Names and Values
		this.ResourceId = resourceId;
		this.MaxValue = maxValue;
		this.Current = this.MaxValue;
		this._regenAmount = this.MaxValue * 0.01;
		this._regenActive = true;
	}

	public GetPayload() {
		return {
			resourceId: this.ResourceId,
			current: this.Current,
			max: this.MaxValue,
		};
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
		const deltaTime = tick() - this._lastRegen;
		if (this._regenActive === false) {
			return;
		}
		/* Calculate Regen Amount */
		const regenAmount = this._regenAmount * deltaTime * this._regenRate;

		/* Set Last Regen */
		this._lastRegen = tick();

		/* Set Current */
		this.SetCurrent(math.floor(this.Current + regenAmount));
	}

	public Destroy() {
		Logger.Log("Destroying Resource: ", this.ResourceId);
	}
}

export { CharacterResource };
