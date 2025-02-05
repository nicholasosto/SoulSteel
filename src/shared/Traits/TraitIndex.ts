type TraitId = "MultiJump" | "Flight";

interface IMovementTrait {
	/** Called when the trait is attached to the character */
	attach(): void;
	/** Called when the trait is removed from the character */
	detach(): void;
}

export { IMovementTrait };
