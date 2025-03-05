import StorageManager from "shared/Storage/StorageManager";
import Logger from "shared/Utility/Logger";

export default class BuildingFactory {
	public static MakeFloor(partId: string, width: number, length: number): Model {
		const parent = new Instance("Model");
		parent.Name = "Generated Floor";
		parent.Parent = game.Workspace;

		for (let i = 0; i < width; i++) {
			Logger.Log(script, "BuildingFactory", `Creating floor at ${i * 4}, 0, 0`);
			for (let j = 0; j < length; j++) {
				Logger.Log(script, "BuildingFactory", `Creating floor at ${i * 4}, 0, ${j * 4}`);
				const newFloor = StorageManager.CloneFromStorage(partId) as Part;
				newFloor.Position = new Vector3(i * 4, 0, j * 4);
				newFloor.Parent = parent;
			}
		}

		return parent;
	}
}
