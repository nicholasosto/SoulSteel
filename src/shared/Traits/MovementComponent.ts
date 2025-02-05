import { IMovementTrait } from "shared/Traits/TraitIndex";

// MovementComponent
export class MovementComponent {
	private traits: IMovementTrait[] = [];

	constructor(private humanoid: Humanoid) {}

	/**
	 * Add and attach a new trait to this movement component.
	 */
	public addTrait(trait: IMovementTrait): void {
		trait.attach();
		this.traits.push(trait);
	}

	/**
	 * Remove a trait from this movement component.
	 */
	public removeTrait(trait: IMovementTrait): void {
		const index = this.traits.indexOf(trait);
		if (index !== -1) {
			trait.detach();
			// Remove the trait from the array.
			// Find an alternative to splice. #TODO
		}
	}
}
