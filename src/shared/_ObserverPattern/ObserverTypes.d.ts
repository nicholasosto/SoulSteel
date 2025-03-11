import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";

type Attributes = {
	dexterity: number;
	constitution: number;
	strength: number;
	intelligence: number;
	speed: number;
};

type AttributeObserver = (attributes: IPlayerData["CharacterStats"], available: number, spent: number) => void;

export { Attributes, AttributeObserver };