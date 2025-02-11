import { SkillResource } from "shared/_Types/SkillTypes";

const DEFAULT_RESOURCE_MANA: SkillResource = {
	resourceId: "Mana",
	amount: 30,
};

const DEFAULT_RESOURCE_HEALTH: SkillResource = {
	resourceId: "Health",
	amount: 20,
};

const DEFAULT_RESOURCE_STAMINA: SkillResource = {
	resourceId: "Stamina",
	amount: 40,
};

export { DEFAULT_RESOURCE_MANA, DEFAULT_RESOURCE_HEALTH, DEFAULT_RESOURCE_STAMINA };
