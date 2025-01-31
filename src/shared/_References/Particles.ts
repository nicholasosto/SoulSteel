import Logger from "shared/Utility/Logger";
import { EAttachmentName } from "./Attachments";
import { StorageManager } from "./Managers/StorageManager";
import { Debris } from "@rbxts/services";

// Particle Names
export enum EParticleName {
	Fire_Effect = "Fire_Effect",
	Spark_Effect = "Spark_Effect",
	Explosion_Effect = "Explosion_Effect",
	Smoke_Effect = "Smoke_Effect",
	Lightning_Effect = "Lightning_Effect",
	Trail_Effect = "Trail_Effect",
	Beam_Effect = "Beam_Effect",
	Cloud_Effect = "Cloud_Effect",
	Flame_Effect = "Flame_Effect",
	Blood_Wound = "Blood_Wound",
}

// Attach Effect
export function AttachEffect(
	character: Model,
	effectName: EParticleName,
	attachment: EAttachmentName,
	duration: number,
): void {
	const attachmentInstance = character.FindFirstChild(attachment, true) as Attachment;
	const particleTemplate = StorageManager.CloneFromStorage(effectName) as Part;
	const particleAttachment = particleTemplate?.FindFirstChildWhichIsA("Attachment") as Attachment;
	Debris.AddItem(particleAttachment, duration);
	assert(particleAttachment, "Particle Attachment is nil");

	particleAttachment.Parent = attachmentInstance;
	Logger.Log(script, "Attached Effect: ", effectName);
}
