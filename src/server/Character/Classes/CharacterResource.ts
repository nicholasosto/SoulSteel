import { ResourceId } from "server/Character/Index/CharacterIndex";
import { RunService } from "@rbxts/services";
import ICharacterResource from "shared/_Interfaces/ICharacterResource";
import Logger from "shared/Utility/Logger";

// Character Resource Class
class CharacterResource implements ICharacterResource {
	// Resource Name
	public ResourceId: ResourceId = "Health";

	// Resource Values
	private MaxValue: number = 100;
	private Current: number = 100;

	// Regen Values
	private _regenAmount: number = 10;
	private _regenActive: boolean = false;

	// Connection
	private _connection: RBXScriptConnection | undefined;
	private _lastUpdate: number = tick();
	private _regenRate: number = 1;

	// Regen Rate

	// Constructor
	constructor(resourceId: ResourceId, maxValue: number) {
		// Attribute Names and Values
		this.ResourceId = resourceId;
		this.MaxValue = maxValue;
		this.Current = this.MaxValue;
		this._regenAmount = this.MaxValue * 0.01;
		this._regenActive = true;

		this._connection?.Disconnect();
		this._connection = RunService.Heartbeat.Connect(() => {
			const deltaTime = tick() - this._lastUpdate;
			if (deltaTime < this._regenRate) {
				return;
			} else {
				this.regenStep();
				Logger.Log("Regen Step", this.ResourceId, this.Current);
				this._lastUpdate = tick();
			}
		});
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

	// Get Values
	public GetValues(): [current: number, max: number] {
		return [this.Current, this.MaxValue];
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
