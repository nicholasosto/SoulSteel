import IDataManager from "shared/_Interfaces/Character Managers/IDataManager";
import IProgressionManager from "shared/_Interfaces/Character Managers/IProgressionManager";
import Logger from "shared/Utility/Logger";


export default class ProgressionManager implements IProgressionManager {
	private _player: Player;
	private _dataManager: IDataManager;
	constructor(player: Player, dataManager: IDataManager) {
		this._player = player;
		this._dataManager = dataManager;
		this._updatePlayerUI();
	}

	private _updatePlayerUI(): void {
		const progressionStats = this._dataManager.GetData().ProgressionStats;
	}

	public OnExperienceGained(experience: number): void {
		Logger.Log(script, `[ProgressionManager]: Experience Gained: ${experience}`);
		this._checkLevelUp();

	}

	public OnLevelUp(): void {
		Logger.Log(script, `[ProgressionManager]: Level Up!`);

	}
	private _getNextLevelExperience(level: number): number {
		// Example formula for calculating experience needed for the next level
		// This can be adjusted based on your game's progression system
		return level * 100; // Example: 100 XP per level
	}

	private _checkLevelUp(): void {
		const progressionStats = this._dataManager.GetData().ProgressionStats;
		const level = progressionStats.Level;
		const experience = progressionStats.Experience;
		const nextLevelExperience = this._getNextLevelExperience(level);

		if (experience >= nextLevelExperience) {
			this._levelUp();
		}
	}

	private _levelUp(): void {
		const progressionStats = this._dataManager.GetData().ProgressionStats;
		const level = progressionStats.Level;
		const nextLevelExperience = this._getNextLevelExperience(level);

		progressionStats.Level += 1;
		progressionStats.Experience -= nextLevelExperience;

		Logger.Log(script, `[ProgressionManager]: Level Up! New Level: ${progressionStats.Level}`);
		this.OnLevelUp();
	}
}
