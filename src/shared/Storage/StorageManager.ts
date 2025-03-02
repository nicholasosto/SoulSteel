import { ReplicatedStorage } from "@rbxts/services";
import { SharedPackage } from "./Packages";
import Logger from "shared/Utility/Logger";
import { TGameCharacter } from "shared/_Types/TGameCharacter";

export default class StorageManager {
	private static _instance: StorageManager;

	private constructor() {
		// Private constructor to prevent instantiation
		StorageManager._instance = this;

		Logger.Log(script, "Storage Manager Initialized - Animations: ", SharedPackage.Animations);
	}

	public static Start(): void {
		if (StorageManager._instance === undefined) {
			new StorageManager();
		}
	}

	/* All Purpose Clone Function */
	public static CloneFromStorage(itemId: string): Instance | undefined {
		const item = ReplicatedStorage.FindFirstChild(itemId, true);
		return item?.Clone();
	}

	/* Humanoid Clone */
	public static CloneHumanoidDescription(itemId: string): HumanoidDescription | undefined {
		const humanoidDescription = SharedPackage.Humanoids.WaitForChild(itemId).Clone() as HumanoidDescription;
		return humanoidDescription;
	}

	/* NPC Clone */
	public static CloneNPC(itemId: string, parent?: Instance): TGameCharacter | undefined {
		const npc = SharedPackage.NPCs.WaitForChild(itemId).Clone() as TGameCharacter;

		if (parent !== undefined) {
			npc.Parent = parent;
			npc.AddTag("NPCCharacter");
		}

		return npc;
	}

	/* Effect Clone */
	public static CloneEffectAttachment(itemId: string): Attachment | undefined {
		/* Get all Particle Emitters for a part in Effects Package*/
		const item = SharedPackage.Effects.FindFirstChild(itemId, true);
		const particleEffects = item?.GetDescendants().filter((descendant) => descendant.IsA("ParticleEmitter"));

		/* Create Attachment for Particle Emitters */
		const attachment = new Instance("Attachment");
		attachment.Position = new Vector3(0, 0, 0);
		attachment.Name = itemId;
		return item?.Clone() as Attachment;
	}
	//public static CloneAccessoriesFromStorage(itemId: string): Array<Instance> {
}
