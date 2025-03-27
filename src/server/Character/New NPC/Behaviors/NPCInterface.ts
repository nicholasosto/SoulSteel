import BaseNPC from "../BaseNPC";
export interface INPCBehavior {
	update(npc: BaseNPC, dt: number): void;
}
