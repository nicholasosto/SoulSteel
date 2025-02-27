import { ReplicatedStorage } from "@rbxts/services";
import Logger from "shared/Utility/Logger";

const Package = {
	Animations: ReplicatedStorage.FindFirstChild("Asset Package - Animations") as Folder,
	Accessories: ReplicatedStorage.FindFirstChild("Asset Package - Accessories") as Folder,
	Audio: ReplicatedStorage.FindFirstChild("Asset Package - Audio") as Folder,
};

export default class StorageManager {
	private static _instance: StorageManager;

	private constructor() {
		// Private constructor to prevent instantiation
		StorageManager._instance = this;

		Logger.Log(script, "Storage Manager Initialized - Animations: ", Package.Animations);
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

	public static CloneAnimationFromStorage(itemId: string): Animation | undefined {
		const animation = ReplicatedStorage.FindFirstChild(itemId, true) as Animation;
		if (animation === undefined) {
			Logger.Log(script, `Animation ${itemId} is nil`);
			return;
		}
		return animation;
	}

	//public static CloneAccessoriesFromStorage(itemId: string): Array<Instance> {
}
