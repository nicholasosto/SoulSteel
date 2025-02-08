import GameCharacter from "./GameCharacter";
import { Character, DamageContainer } from "@rbxts/wcs";
import { INPCCharacter } from "shared/Game Character/Interfaces";
import Logger from "shared/Utility/Logger";

export default class NPCCharacter extends GameCharacter implements INPCCharacter {
	public level: number = 1;

	constructor(wcsCharacter: Character, level: number = 1) {
		Logger.Log(script, "NPC Character Constructor");
		super(wcsCharacter);
		this.level = level;
	}

	public OnSpawn(): void {
		Logger.Log(script, "NPC Character Spawned");
	}

	public OnUpdate(): void {
		Logger.Log(script, "Updating NPC Character");
	}
	public OnDeath(): void {
		Logger.Log(script, "Player Character Died");
	}

	public OnTakeDamage(DamageContainer: DamageContainer): void {
		Logger.Log(script, "Player Character Took Damage");
	}

	public Destroy(): void {
		Logger.Log(script, "Destroying Player Character");
		super.Destroy();
	}
}
