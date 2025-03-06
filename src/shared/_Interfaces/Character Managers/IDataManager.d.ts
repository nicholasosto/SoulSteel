import IPlayerData from "../Player Data/IPlayerData";

export default interface IDataManager {
	GetData(): IPlayerData;
	UpdateProgressionStats(newStats: IPlayerData["ProgressionStats"]): void;
	UpdateCharacterName(newIdentity: IPlayerData["CharacterIdentity"]["CharacterName"]): void;
}
