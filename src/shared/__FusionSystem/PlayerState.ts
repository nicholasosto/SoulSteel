import Fusion from "@rbxts/fusion";
import { PlayerData } from "serverStorage/ProfileServiceStorage";
const { Value } = Fusion;

/* ICharacterStats */
export default interface ICharacterStats {
	Strength: number;
	Speed: number;
	Dexterity: number;
	Intelligence: number;
	Constitution: number;
}

export class PlayerState {
	public Level = Value(1);
	public Experience = Value(0);
	public ExperienceToNextLevel = Value(100);

	public Strength = Value(15);
	public Dexterity = Value(15);
	public Intelligence = Value(15);
	public Vitality = Value(15);
	public Agility = Value(15);
	public Luck = Value(15);

	constructor(initialData: PlayerData) {
		const characterData = initialData.CharacterData;
		if (characterData) {
			this.loadFromData(characterData);
			return;
		}
		// If no character data is provided, initialize with default values
		warn("[XXX] No character data provided. Initializing with default values.");
	}

	public loadFromData(data: PlayerData["CharacterData"]) {
		if (!data[0]) {
			warn("[XXX] No character data to load.");
			return;
		}
		const level = data[0].ProgressionData.level;
		const experience = data[0].ProgressionData.experience;
		const experienceToNextLevel = data[0].ProgressionData.experienceToNextLevel;
		const stats = data[0].Attributes;
		this.Level.set(level);
		this.Experience.set(experience);
		this.ExperienceToNextLevel.set(experienceToNextLevel);
		this.Strength.set(stats.strength);
		this.Dexterity.set(stats.dexterity);
		this.Intelligence.set(stats.intelligence);
		this.Vitality.set(stats.vitality);
		this.Agility.set(stats.agility);
		this.Luck.set(stats.luck);
	}
}
