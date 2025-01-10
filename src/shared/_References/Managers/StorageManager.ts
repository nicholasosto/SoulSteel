import { ReplicatedStorage, InsertService, RunService, ContextActionService } from "@rbxts/services";
import { PackageIndex } from "../Indexes/MasterIndex";
import { Logger } from "shared/Utility/Logger";

export class StorageManager {
	private static _instance: StorageManager;
	private _fullyLoaded: boolean = false;

	private constructor() {
		// Private constructor to prevent instantiation
		StorageManager._instance = this;
	}

	public static Start(): void {
		if (StorageManager._instance === undefined) {
			new StorageManager();
		}
	}

	public static CloneFromStorage(itemId: string): Instance | undefined {
		const item = ReplicatedStorage.FindFirstChild(itemId, true);
		Logger.Log(script, `Item: ${item}`);
		return item?.Clone();
	}

	public static LoadFromPackage(packageId: PackageIndex.PackageIds, itemName: string): Instance | undefined {
		const runMode = RunService.IsServer() ? "Server" : "Client";

		if (runMode === "Client") {
			return StorageManager.CloneFromStorage(itemName);
		}

		const packageModel = InsertService.LoadAsset(packageId) as Model;
		if (packageModel === undefined) {
			Logger.Log(script, `Failed to load package with ID: ${packageId}`);
			return undefined;
		}
		const item = packageModel.FindFirstChild(itemName, true);
		if (item === undefined) {
			Logger.Log(script, `Failed to load item with name: ${itemName}`);
			return undefined;
		}
		return item.Clone();
	}
}
