import Logger from "shared/Utility/Logger";
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { TGameCharacter } from "shared/_Types/TGameCharacter";
import StorageManager from "shared/Storage/StorageManager";

@SkillDecorator
export class BasicRanged extends Skill {
	private _damageContainer = this.CreateDamageContainer(14);
	protected OnConstruct(): void {
		Logger.Log(script, "Shared Construct", this.Character?.Instance.Name);
	}

	protected OnConstructServer(): void {
		Logger.Log(script, "Server Constructor", this.Character?.Instance.Name);
		//super.OnConstructServer();
	}

	protected OnStartClient(): void {
		Logger.Log(script, "Client Start", this.Character?.Instance.Name);
	}

	protected OnStartServer(): void {
		const newNPC = StorageManager.CloneNPC("Dragon Boy", game.Workspace) as TGameCharacter;
		const character = this.Character?.Instance as TGameCharacter;
		const characterPosition = character.GetPivot();

		if (characterPosition === undefined) return;

		newNPC.PivotTo(characterPosition);

		Logger.Log(script, "Server Started: ", this.Character?.Instance.Name);
	}

	protected OnEndServer(): void {
		Logger.Log(script, "Server Ended: ", this.Character?.Instance.Name);
	}
}
