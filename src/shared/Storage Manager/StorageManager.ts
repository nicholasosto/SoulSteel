import { ReplicatedStorage } from "@rbxts/services";
// import { PackageIds } from "../_References/Packages";
// import Logger from "shared/Utility/Logger";

export default class StorageManager {
	private static _instance: StorageManager;

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
		//Logger.Log(script, `Item: ${item}`);
		return item?.Clone();
	}

	// public static LoadFromPackage(packageId: PackageIds, itemName: string): Instance | undefined {
	// 	const runMode = RunService.IsServer() ? "Server" : "Client";

	// 	if (runMode === "Client") {
	// 		return StorageManager.CloneFromStorage(itemName);
	// 	}

	// 	const packageModel = InsertService.LoadAsset(packageId) as Model;
	// 	if (packageModel === undefined) {
	// 		Logger.Log(script, `Failed to load package with ID: ${packageId}`);
	// 		return undefined;
	// 	}
	// 	const item = packageModel.FindFirstChild(itemName, true);
	// 	if (item === undefined) {
	// 		Logger.Log(script, `Failed to load item with name: ${itemName}`);
	// 		return undefined;
	// 	}
	// 	return item.Clone();
	// }
}
