import BaseNPC from "../BaseNPC";
import { INPCBehavior } from "./NPCInterface";

export class PatrolBehavior implements INPCBehavior {
	private waypoints: Vector3[];
	private currentWaypointIndex = 0;
	private speed: number;

	constructor(waypoints: Vector3[], speed = 10) {
		this.waypoints = waypoints;
		this.speed = speed;
	}

	update(npc: BaseNPC, dt: number) {
		const targetPos = this.waypoints[this.currentWaypointIndex];
		const npcPos = npc.model.PrimaryPart?.Position;
		if (!npcPos) return;

		const direction = targetPos.sub(npcPos);
		if (direction.Magnitude < 2) {
			this.currentWaypointIndex = (this.currentWaypointIndex + 1) % this.waypoints.size();
		} else {
			npc.model.PrimaryPart!.CFrame = npc.model.PrimaryPart!.CFrame.add(direction.Unit.mul(this.speed * dt));
		}
	}
}
