import Logger from "shared/Utility/Logger";
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { SkillDefinitions } from "shared/Skills/Data/SkillDefinitions";
import { IPlayerCharacter } from "shared/Game Character/Interfaces";

const skillDefinition = SkillDefinitions.BasicRanged;
const baseDamage = skillDefinition.baseDamage ?? 14;
const animaionObject = (new Instance("Animation").AnimationId = SkillDefinitions.BasicRanged.animation);

let textTest = "TextTest: ";

@SkillDecorator
export class BasicRanged extends Skill {
	private _skillDefinition = SkillDefinitions.BasicRanged;
	private _damageContainer = this.CreateDamageContainer(baseDamage);
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstruct(): void {
		Logger.Log(script, "[RANGED]: Construct", textTest);
		super.OnConstruct();
	}

	protected OnConstructServer(): void {

		textTest += " [On Construct Server], ";
	}

	protected OnStartClient(): void {
		Logger.Log(script, "RANGED [Clinet-Start]:", textTest);
	}

	protected OnStartServer(): void {
		Logger.Log(script, "RANGED [Server-Start]:", textTest);
	}

	protected OnEndServer(): void {
		Logger.Log(script, "RANGED [Server-End]:", textTest);
	}
}
