import { TSkillResource } from "shared/_Types/TSkillResource";

const DEFAULT_RESOURCE_MANA: TSkillResource = {
	resourceId: "Mana",
	amount: 30,
};

const DEFAULT_RESOURCE_HEALTH: TSkillResource = {
	resourceId: "Health",
	amount: 20,
};

const DEFAULT_RESOURCE_STAMINA: TSkillResource = {
	resourceId: "Stamina",
	amount: 40,
};

export { DEFAULT_RESOURCE_MANA, DEFAULT_RESOURCE_HEALTH, DEFAULT_RESOURCE_STAMINA };
