import IDataManager from "shared/_Interfaces/Character Managers/IDataManager";

export default class QuestManager {
	private _dataManager: IDataManager;

	constructor(dataManager: IDataManager) {
		this._dataManager = dataManager;
	}
}
