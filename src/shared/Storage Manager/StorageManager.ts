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

	//public static CloneAccessoriesFromStorage(itemId: string): Array<Instance> {
}
