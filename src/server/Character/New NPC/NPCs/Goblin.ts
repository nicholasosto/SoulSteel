import BaseNPC from "../BaseNPC";
import { PatrolBehavior } from "../Behaviors/PatrolBehavior";
import { generateCharacterName } from "shared/_Factories/NameFactory";

export default class GoblinNPC extends BaseNPC {
	private behavior: PatrolBehavior;

	constructor(model: Model) {
		super("goblin_" + model.Name + generateCharacterName(), "Goblin", model, 100, 50);
		const waypoints = [new Vector3(0, 0, 0), new Vector3(10, 0, 10)];
		this.behavior = new PatrolBehavior(waypoints);
	}

	public update(dt: number) {
		this.behavior.update(this, dt);
	}

	protected die() {
		super.die();
		// Drop loot, trigger events, etc.
	}
}
