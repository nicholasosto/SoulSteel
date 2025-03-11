import IPlayerData from "shared/_Interfaces/Player Data/IPlayerData";
import IPlayerCharacter from "shared/_Interfaces/IPlayerCharacter";
import { Remotes } from "shared/net/Remotes";

const PlayerAttributesUpdated = Remotes.Server.Get("PlayerAttributesUpdated");

export class AttributesManager {
	private player: Player;
	private characterStats: IPlayerData["CharacterStats"];
	private availablePoints: IPlayerData["AvaliableAttributePoints"];
	private spentPoints: IPlayerData["SpentAttributePoints"];

	public constructor(playerCharacter: IPlayerCharacter) {
		this.player = playerCharacter.player;
		this.characterStats = playerCharacter.dataManager.GetData()["CharacterStats"];
		this.availablePoints = playerCharacter.dataManager.GetData()["AvaliableAttributePoints"];
		this.spentPoints = playerCharacter.dataManager.GetData()["SpentAttributePoints"];
		warn("Attributes Manager: Instantiated");
	}

	public updateAttribute(attribute: keyof IPlayerData["CharacterStats"], value: number) {
		warn("Updating Attribute");
		const delta = value - this.characterStats[attribute];
		if (delta <= this.availablePoints && this.characterStats[attribute] + delta >= 0) {
			this.characterStats[attribute] += delta;
			this.availablePoints -= delta;
			this.spentPoints += delta;
			this.notify();
		}
	}

	public setAvailablePoints(points: number) {
		this.availablePoints = points;
		this.notify();
	}

	private notify() {
		PlayerAttributesUpdated.SendToPlayer(this.player, this.characterStats, this.availablePoints, this.spentPoints);
	}

}
