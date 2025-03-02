import { SharedPackage } from "./Packages";
import Logger from "shared/Utility/Logger";

export default class EffectManager {
	/* Get all Particle Emitters for a part in Effects Package*/
	public static AddParticleAttachment(itemId: string, parent: Instance): Attachment | undefined {
		/* Clone Attachment from Effects Package */
		const item = SharedPackage.Effects.FindFirstChild(itemId, true)?.Clone() as Attachment;

		if (item === undefined) {
			Logger.Log(script, "Item not found in Effects Package");
		}
		item.Parent = parent;
		item.Name = itemId;

		return item;
	}

	public static EnableParticleEffects(parent: Instance, enabled: boolean): void {
		const particleEmitters = parent.GetDescendants().filter((descendant) => descendant.IsA("ParticleEmitter"));
		particleEmitters.forEach((emitter) => {
			emitter.Enabled = enabled;
		});
	}
}
