/*
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { PackageIndex } from "shared/_References/Indexes/MasterIndex";
import { Logger } from "shared/Utility/Logger";

export const FireAuraPack = StorageManager.LoadFromPackage(PackageIndex.PackageIds.Effects, "Fire_Aura");

export type AuraId =
	| "FIRE_AURA"
	| "ICE_AURA"
	| "ELECTRIC_AURA"
	| "WIND_AURA"
	| "EARTH_AURA"
	| "WATER_AURA"
	| "LIGHT_AURA"
	| "DARK_AURA";

export type CharacterAura = {
	id: AuraId;
	model: Model;
};

export const AuraDeffinitions: Map<AuraId, CharacterAura> = new Map<AuraId, CharacterAura>([
	["FIRE_AURA", { id: "FIRE_AURA", model: FireAuraPack as Model }],
]);

export function mapAuraTemplate(templateModel: Model): Map<string, ParticleEmitter[]> {
	const auraMap = new Map<string, ParticleEmitter[]>();
	auraMap.set("Head", templateModel.FindFirstChild("Head")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("UpperTorso", templateModel.FindFirstChild("UpperTorso")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("LeftUpperArm", templateModel.FindFirstChild("LeftUpperArm")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("RightUpperArm", templateModel.FindFirstChild("RightUpperArm")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("LeftLowerArm", templateModel.FindFirstChild("LeftLowerArm")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("RightLowerArm", templateModel.FindFirstChild("RightLowerArm")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("LeftHand", templateModel.FindFirstChild("LeftHand")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("RightHand", templateModel.FindFirstChild("RightHand")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("LeftLowerLeg", templateModel.FindFirstChild("LeftLowerLeg")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("RightLowerLeg", templateModel.FindFirstChild("RightLowerLeg")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("LeftUpperLeg", templateModel.FindFirstChild("LeftUpperLeg")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("RightUpperLeg", templateModel.FindFirstChild("RightUpperLeg")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("LeftFoot", templateModel.FindFirstChild("LeftFoot")?.GetChildren() as ParticleEmitter[]);
	auraMap.set("RightFoot", templateModel.FindFirstChild("RightFoot")?.GetChildren() as ParticleEmitter[]);

	return auraMap;
}
export function applyAuraToCharacter(character: Model, auraModel: Model): void {
	const masterClone = auraModel.Clone() as Model;
	const cloneAuraParts = masterClone.GetChildren();

	const auraMap = mapAuraTemplate(auraModel);

	character.GetChildren().forEach((part) => {
		const partName = part.Name;
		const auraParts = auraMap.get(partName);
		if (auraParts) {
			auraParts.forEach((auraPart) => {
				auraPart.Parent = part;
				Logger.Log(script, `AuraPart: ${auraPart}`);
			});
		}
	});
	Logger.Log(script, `AuraMap: ${auraMap}`);
}
*/