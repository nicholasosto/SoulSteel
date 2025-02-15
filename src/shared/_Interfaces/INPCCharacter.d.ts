import IGameCharacter from "./IGameCharacter";
import { DamageContainer } from "@rbxts/wcs";
/* INPCCharacter */
export default interface INPCCharacter extends IGameCharacter {
	// NPC
	OnUpdate(): void;
	OnDeath(): void;
	OnSpawn(): void;
	OnTakeDamage(DamageContainer: DamageContainer): void;
	Destroy(): void;
}
