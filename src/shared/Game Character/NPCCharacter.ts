import GameCharacter from "./GameCharacter";
import { Character, DamageContainer } from "@rbxts/wcs";
import { INPCCharacter } from "./Interfaces";
//import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import Logger from "shared/Utility/Logger";
//import { EquipmentId, EquipmentSlotId } from "shared/_References/Inventory";
import { IPlayerData } from "shared/_References/PlayerData";
//import { CharacterStatId } from "shared/Character Resources/iCharacterResource";

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
