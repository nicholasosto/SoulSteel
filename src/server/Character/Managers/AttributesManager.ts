import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import { Remotes, RemoteFunctions, AttributePanelData } from "shared/net/Remotes";

/* Remotes and RemoteFunctions*/
const PlayerAttributesUpdated = Remotes.Server.Get("PlayerAttributesUpdated");
const AttributeUpdateRequest = Remotes.Server.Get("AttributeUpdateRequest");
const InitalizeAttributePanel = RemoteFunctions.Server.Get("InitializeAttributePanel");

export class AttributesManager {
	private player: Player;
	private panelData: AttributePanelData;

	/*connections*/

	private _attributeUpdateRequestConnection: RBXScriptConnection | undefined;

	public constructor(playerCharacter: IPlayerCharacter) {
		this.player = playerCharacter.player;
		this.panelData = {
			availablePoints: playerCharacter.dataManager.GetData()["AvaliableAttributePoints"],
			spentPoints: playerCharacter.dataManager.GetData()["SpentAttributePoints"],
			characterStats: playerCharacter.dataManager.GetData()["CharacterStats"],
		};
		/* #REMOTE_FUNCTION #TO_CLIENT*/
		InitalizeAttributePanel.SetCallback((player) => {
			return this.panelData;
		});

		/* #REMOTE_EVENT #TO_SERVER*/
		this._attributeUpdateRequestConnection?.Disconnect();
		this._attributeUpdateRequestConnection = AttributeUpdateRequest.Connect((player, attributePanelData) => {
			warn("Attribute Update Request", attributePanelData);
			playerCharacter.dataManager.UpdateAttributesData(attributePanelData);
			this.notify();
		});
		this.notify();
	}

	public updateAttribute(attribute: keyof IPlayerData["CharacterStats"], value: number) {
		warn("Updating Attribute");
		const delta = value - this.panelData.characterStats[attribute];
		if (delta <= this.panelData.availablePoints && this.panelData.characterStats[attribute] + delta >= 0) {
			this.panelData.characterStats[attribute] += delta;
			this.panelData.availablePoints -= delta;
			this.panelData.spentPoints += delta;
			this.notify();
		}
	}

	public setAvailablePoints(points: number) {
		this.panelData.availablePoints = points;
		this.notify();
	}

	private notify() {
		warn("Attributes Manager: Notifying");
		PlayerAttributesUpdated.SendToPlayer(this.player, this.panelData);
	}
}
