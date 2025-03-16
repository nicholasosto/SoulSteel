import IPlayerData from "../Player Data/IPlayerData";
//import { AttributePanelData } from "shared/net/Remotes";

export default interface IDataManager {
	GetData(): IPlayerData;
	UpdateProgressionStats(newStats: IPlayerData["ProgressionStats"]): void;
	//UpdateAttributesData(panelData: AttributePanelData): void;
	UpdateCharacterName(newIdentity: IPlayerData["CharacterIdentity"]["CharacterName"]): void;
}
