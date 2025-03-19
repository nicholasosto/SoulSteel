import { ReplicatedStorage, CollectionService } from "@rbxts/services";

const EquipmentTags: string[] = ["WeaponConfig", "HelmetConfig", "ArmorConfig", "FamiliarConfig", "AccessoryConfig"];

export default class EquipmentManager {
	private static _instance: EquipmentManager | undefined;

	private static _weaponData: Map<string, Configuration> = new Map();
	private static _helmetData: Map<string, Configuration> = new Map();
	private static _armorData: Map<string, Configuration> = new Map();
	private static _familiarData: Map<string, Configuration> = new Map();
	private static _accessoryData: Map<string, Configuration> = new Map();

	/* Connections */
	private static _ArmorAddedConnection: RBXScriptConnection | undefined;

	private constructor() {
		// Private constructor to prevent instantiation
	}

	public static Start(): EquipmentManager {
		if (this._instance === undefined) {
			this._instance = new EquipmentManager();
			this._StartCollectionService();
			print("EquipmentManager: Initialized");
			this.PrintEquipmentData();
		}
		return this._instance;
	}
	private static _StartCollectionService() {
		/* Connection to ArmorAdded */
		this._ArmorAddedConnection?.Disconnect();
		this._ArmorAddedConnection = CollectionService.GetInstanceAddedSignal("ArmorConfig").Connect((item) => {
			print("ArmorConfig Added: ", item.Name);
		});

		/* Get all items with the tags */
		for (const tag of EquipmentTags) {
			/* Get For all items with the tag */
			const items = CollectionService.GetTagged(tag);
			for (const item of items) {
				print("Found item with tag: ", tag, " - ", item.Name);
				const config = item.FindFirstChildOfClass("Configuration") as Configuration;
				if (config) {
					switch (tag) {
						case "WeaponConfig":
							this._weaponData.set(item.Name, config);
							break;
						case "HelmetConfig":
							this._helmetData.set(item.Name, config);
							break;
						case "ArmorConfig":
							this._armorData.set(item.Name, config);
							break;
						case "FamiliarConfig":
							this._familiarData.set(item.Name, config);
							break;
						case "AccessoryConfig":
							this._accessoryData.set(item.Name, config);
							break;
					}
				}
			}
		}
	}
	public static GetAllEquipment() {}

	public static PrintEquipmentData() {
		print("Weapon Data: ", this._weaponData);
		print("Helmet Data: ", this._helmetData);
		print("Armor Data: ", this._armorData);
		print("Familiar Data: ", this._familiarData);
		print("Accessory Data: ", this._accessoryData);
	}

	/* Get Equipment by Type */
	public static GetEquipmentByType(equipmentType: string) {
		switch (equipmentType) {
			case "WeaponConfig":
				return this._weaponData;
			case "HelmetConfig":
				return this._helmetData;
			case "ArmorConfig":
				return this._armorData;
			case "FamiliarConfig":
				return this._familiarData;
			case "AccessoryConfig":
				return this._accessoryData;
			default:
				return undefined;
		}
	}
	public static GetEquipmentById(id: string) {}
}
