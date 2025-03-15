import { SkillId } from "shared/_IDs/SkillIndex";
import ISkillDefinition from "shared/_Interfaces/ISkillDefinition";
import IItemDefinition from "shared/_Interfaces/IItemDefinition";
import ItemDefinitionsMap from "shared/_Definitions/ItemDefinitions";
import { SkillDefinitions } from "shared/_Definitions/SkillDefinitions";
import Logger from "shared/Utility/Logger";

export default class DefinitionsManager {
	// Singleton Instance
	private static _instance: DefinitionsManager;

	// Definitions
	public static SkillDefinitions = SkillDefinitions;
	private _itemDefinitions = ItemDefinitionsMap;

	// Constructor
	private constructor() {
		Logger.Log("DefinitionsManager", "Initializing Definitions Manager");
	}

	// Start
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new DefinitionsManager();
		}
	}

	// Get Skill Definition
	public static GetSkillDefinition(skillId: SkillId): ISkillDefinition | undefined {
		return DefinitionsManager.SkillDefinitions[skillId];
	}
	// Get Item Definition
	public static GetItemDefinition(itemId: string): IItemDefinition | undefined {
		return this._instance._itemDefinitions.get(itemId);
	}
}
