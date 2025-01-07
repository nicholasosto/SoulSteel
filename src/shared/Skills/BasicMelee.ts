import { Skill, SkillDecorator } from "@rbxts/wcs";
import { Logger } from "shared/Utility/Logger";
import { SkillDefinitions } from "shared/_References/Character/Skills";

@SkillDecorator
export class BasicMelee extends Skill {
	private _skillInfo = SkillDefinitions.BasicMelee;

	protected OnStartClient(): void {
		Logger.Log(script, "Client Started: ", this._skillInfo as unknown as string);
	}

	protected OnStartServer(): void {
		Logger.Log(script, "Server Started: ", this._skillInfo as unknown as string);
	}

	protected OnEndServer(): void {}
}
