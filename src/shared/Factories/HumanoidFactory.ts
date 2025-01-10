import { CollectionService } from "@rbxts/services";
import { EHumanoidDescription } from "shared/_References/Indexes/AssetIndex";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { Logger } from "shared/Utility/Logger";

export class HumanoidDescriptionFactory {
	private static _instance: HumanoidDescriptionFactory;

	private static _humanoidDescriptions: Map<EHumanoidDescription, HumanoidDescription> = new Map<
		EHumanoidDescription,
		HumanoidDescription
	>();

	private constructor() {
		// Private constructor to prevent instantiation
		CollectionService.GetInstanceAddedSignal("HDROBOT").Connect((instance) => {
			Logger.Log(script, "HumanoidDescriptionFactory", `Instance added: ${instance.Name}`);
			const humanoid = instance.FindFirstChildOfClass("Humanoid");
			assert(humanoid !== undefined, "Humanoid not found in instance.");
			const humanoidDescription = humanoid.GetAppliedDescription();
			assert(humanoidDescription !== undefined, "Humanoid cache not found in storage.");
			HumanoidDescriptionFactory.ApplyHumanoidDescription(humanoid, EHumanoidDescription.RobotBase);
		});

		CollectionService.GetInstanceAddedSignal("WolfForm").Connect((instance) => {
			Logger.Log(script, "XXXHumanoidDescriptionFactory", `Instance added: ${instance.Name}`);
			const humanoid = instance.FindFirstChildOfClass("Humanoid");
			assert(humanoid !== undefined, "Humanoid not found in instance.");
			const humanoidDescription = humanoid.GetAppliedDescription();
			assert(humanoidDescription !== undefined, "Humanoid cache not found in storage.");
			HumanoidDescriptionFactory.ApplyHumanoidDescription(humanoid, EHumanoidDescription.WolfForm);
		});
		this.LoadBaseHumanoidDescriptions();
		return this;
	}

	public static getInstance(): HumanoidDescriptionFactory {
		if (HumanoidDescriptionFactory._instance === undefined) {
			HumanoidDescriptionFactory._instance = new HumanoidDescriptionFactory();
		}

		return HumanoidDescriptionFactory._instance;
	}

	private LoadBaseHumanoidDescriptions(): void {
		HumanoidDescriptionFactory.setHumanoidDescription(EHumanoidDescription.RobotBase);
		HumanoidDescriptionFactory.setHumanoidDescription(EHumanoidDescription.DemonBase);
		HumanoidDescriptionFactory.setHumanoidDescription(EHumanoidDescription.VampireBase);
		HumanoidDescriptionFactory.setHumanoidDescription(EHumanoidDescription.HumanBase);
		HumanoidDescriptionFactory.setHumanoidDescription(EHumanoidDescription.AngelBase);
		HumanoidDescriptionFactory.setHumanoidDescription(EHumanoidDescription.OccultistBase);
		HumanoidDescriptionFactory.setHumanoidDescription(EHumanoidDescription.WolfForm);
	}

	public static getHumanoidDescription(humanoidDescription: EHumanoidDescription): HumanoidDescription {
		return HumanoidDescriptionFactory._humanoidDescriptions.get(humanoidDescription) as HumanoidDescription;
	}

	public static setHumanoidDescription(hdName: EHumanoidDescription): void {
		const humanoidDescription = StorageManager.CloneFromStorage(hdName) as HumanoidDescription;
		if (humanoidDescription === undefined) {
			Logger.Log(script, "HumanoidDescriptionFactory", `Humanoid ${hdName} not found in storage.`);
			return;
		}

		HumanoidDescriptionFactory._humanoidDescriptions.set(hdName, humanoidDescription);
	}

	public static ApplyHumanoidDescription(humanoid: Humanoid, hdName: EHumanoidDescription): void {
		const humanoidDescription = HumanoidDescriptionFactory.getHumanoidDescription(hdName);
		const currenctDescription = humanoid.GetAppliedDescription();
		if (currenctDescription === undefined) {
			Logger.Log(script, "HumanoidDescriptionFactory", `Humanoid cache not found in storage.`);
		}
		if (humanoidDescription === undefined) {
			Logger.Log(script, "HumanoidDescriptionFactory", `Humanoid ${hdName} not found in storage.`);
			return;
		}

		humanoid.ApplyDescription(humanoidDescription);
	}
}
