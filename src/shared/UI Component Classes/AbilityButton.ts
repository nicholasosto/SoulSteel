import { AbilityButton_TemplateType } from "./Types/AbilityButton_Template";
import { Character } from "@rbxts/wcs";

export class AbilityButton {
	// Main Template
	private _abilityButton: AbilityButton_TemplateType;

	// Connections
	private _connectionButton: RBXScriptConnection | undefined;

	constructor(abilityButtonTemplate: AbilityButton_TemplateType, parent: Instance) {
		// Clone and Parent the Ability Button Template
		this._abilityButton = abilityButtonTemplate.Clone();
		this._abilityButton.Parent = parent;

		// Button Reference
		this._abilityButton.ImageButton.Activated.Connect(() => {
			this._handleButtonActivated();
		});
	}

	protected _destroyConnections() {
		// Placeholder
	}

	// Handle Button Activation
	protected _handleButtonActivated() {
		// Placeholder
	}

	// Destroy the Ability Button
	public Destroy() {
		this._destroyConnections();
		this._abilityButton.Destroy();
	}
}
