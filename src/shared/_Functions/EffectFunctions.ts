import { TGameCharacter } from "shared/_Types/TGameCharacter";
import StorageManager from "shared/Storage/StorageManager";

const PurpleVortex = StorageManager.CloneFromStorage("Vortex_Purple");

function AddTemporaryEffect(gameCharacter: TGameCharacter, duration: number) {
	const effect = PurpleVortex?.Clone();
	if (effect === undefined) {
		return;
	}
	effect.Parent = gameCharacter.LeftFoot;
	task.delay(duration, () => {
		effect.Destroy();
	});
}

function EnableParticleEffects(parent: Instance, enable: boolean): void {
	const particleEffects = parent.GetDescendants().filter((descendant) => descendant.IsA("ParticleEmitter"));

	particleEffects.forEach((particleEffect) => {
		particleEffect.Enabled = enable;
	});
}

export { AddTemporaryEffect, EnableParticleEffects };
