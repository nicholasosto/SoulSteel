import BaseNPC from "./BaseNPC";

export default class NPCManager {
	private static npcs: Map<string, BaseNPC> = new Map();

	public static addNPC(npc: BaseNPC) {
		this.npcs.set(npc.npcId, npc);
	}

	public static removeNPC(npcId: string) {
		const npc = this.npcs.get(npcId);
		if (npc) {
			npc.model.Destroy();
			this.npcs.delete(npcId);
		}
	}

	public static updateAll(dt: number) {
		this.npcs.forEach((npc) => npc.update(dt));
	}
}
