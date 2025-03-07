import IDataManager from "shared/_Interfaces/Character Managers/IDataManager";
import IProgressionManager from "shared/_Interfaces/Character Managers/IProgressionManager";
import Logger from "shared/Utility/Logger";

export default class ProgressionManager implements IProgressionManager {
	private _player: Player;
	private _dataManager: IDataManager;
	constructor(player: Player, dataManager: IDataManager) {
		this._player = player;
		this._dataManager = dataManager;
	}

	/* On Experience Gained */
	public OnExperienceGained(experience: number): void {
		Logger.Log(script, `[ProgressionManager]: Experience Gained: ${experience}`);
		const progressionStats = this._dataManager.GetData().ProgressionStats;

		if (progressionStats.Experience + experience >= progressionStats.ExperienceToNextLevel) {
			progressionStats.Level += 1;
			progressionStats.Experience = 0;
			progressionStats.ExperienceToNextLevel = this._getNextLevelExperience(progressionStats.Level);
		} else {
			progressionStats.Experience += experience;
		}

		this._dataManager.UpdateProgressionStats(progressionStats);
	}

	private _getNextLevelExperience(level: number): number {
		// Example formula for calculating experience needed for the next level
		// This can be adjusted based on your game's progression system
		return level * 100; // Example: 100 XP per level
	}
}
