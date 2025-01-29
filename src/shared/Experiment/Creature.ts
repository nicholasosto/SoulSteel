
function GenerateCodon(): Array<string> {
	const codons = ["A", "T", "C", "G"];

	let index = 0;
	const returnCodons = [];
	while (index < 3) {
		const codon = codons[math.floor(math.random() * 4)];
		returnCodons.push(codon);
		index++;
	}

	return returnCodons;
}



interface ICreature {
	Name: string;
	// Model: Model;
	// BiasMap: Map<string, number>;
	// GeneMap: GeneMap;
	// Replicate(): void;
	// Die(): void;
	// Move(location: CFrame): void;
	// Eat(creature: ICreature): void;
	// Scan(distance: number): void;
}

class Creature implements ICreature {
	Name: string;
	Model: Model;
	BiasMap: Map<string, number>;

	constructor(name: string, model: Model) {
		this.Name = name;
		this.Model = model;
		this.BiasMap = new Map<string, number>();
	}

	Replicate() {
		// Replicate the creature
	}

	Die() {
		// Die
	}

	Move(location: CFrame) {
		// Move to location
	}

	Eat(creature: ICreature) {
		// Eat the creature
	}

	Scan(distance: number) {
		// Scan for creatures
	}
}

export { ICreature, Creature, GenerateCodon };
