// import { ResourceBars } from "shared/_ROACT/Components/DataValueObjects";
// import { RemoteEvents } from "shared/net/Remotes";
import { PCurrentResourceAmounts } from "shared/net/RemoteIndex";

export default class BaseNPC {
	public npcId: string;
	protected name: string;
	protected health: number;
	protected maxHealth: number;
	protected stamina: number;
	protected maxStamina: number;
	public model: Model;

	constructor(npcId: string, name: string, model: Model, maxHealth: number, maxStamina: number) {
		this.npcId = npcId;
		this.name = name;
		this.model = model;
		this.maxHealth = maxHealth;
		this.health = maxHealth;
		this.maxStamina = maxStamina;
		this.stamina = maxStamina;
	}

	/** Damage NPC */
	public takeDamage(amount: number) {
		this.health = math.max(this.health - amount, 0);
		this.syncHealth();
		if (this.health <= 0) this.die();
	}

	/** Recover NPC Stamina */
	public recoverStamina(amount: number) {
		this.stamina = math.min(this.stamina + amount, this.maxStamina);
	}

	/** NPC Death Handler */
	protected die() {
		// Override for NPC-specific death logic
		print(`${this.name} (${this.npcId}) has died.`);
		this.model.Destroy();
	}

	/** Sync health with clients using existing networking pattern */
	protected syncHealth() {
		const resourceData: PCurrentResourceAmounts = {
			Health: this.health,
			Stamina: this.stamina,
			SoulPower: 0,
			DomainEssence: 0,
			Experience: 0,
		};
		//RemoteEvents.SendResourceData.SendToAllPlayers(resourceData);
	}

	/** Abstract update method for behavior */
	public update(dt: number) {
		// Override in subclasses
	}
}
