// Resource Types
export enum EResourceTypes {
	Health = "Health",
	Mana = "Mana",
	Stamina = "Stamina",
	Experience = "Experience",
	DomainEnergy = "DomainEnergy",
}

// Resource Bar Names
export enum EResourceBarNames {
	Health = "Health Bar",
	Mana = "Mana Bar",
	Stamina = "Stamina Bar",
	Experience = "Experience Bar",
	DomainEnergy = "Domain Bar",
}

// Resource Bar Utility Functions
export function GetResourceBarFrameByName(player: Player, name: EResourceBarNames): Frame | undefined {
	const playerGui = player.WaitForChild("PlayerGui");
	const screenGui = playerGui.WaitForChild("HUD");
	const charFrame = screenGui.WaitForChild("CharacterFrame");
	const resourceFrame = charFrame.WaitForChild("Bars");
	const bars = resourceFrame.WaitForChild("Progress");
	const bar = bars.WaitForChild(name);
	return bar as Frame;
}

// Character Resource Class
export class CharacterResource {
	// Resource Name
	public ResourceName: string = "DefaultResource";

	// Resource Values
	public _maxValue: number = 100;
	public _currentValue: number = 100;

	// Regen Values
	private _regenAmount: number = 10;
	private _regenActive: boolean = true;

	// Constructor
	constructor(resourceName: string) {
		// Attribute Names and Values
		this.ResourceName = resourceName;
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
