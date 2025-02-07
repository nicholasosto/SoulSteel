import { Character, DamageContainer } from "@rbxts/wcs";
import { TGameCharacter } from "../../shared/Game Character/TGameCharacter";
import { IGameCharacter } from "../../shared/Game Character/ICharacter";
import { CreateSkillFromId } from "shared/Skills/WCSHelper";
import Logger from "shared/Utility/Logger";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";

export default class GameCharacter implements IGameCharacter {
	level: number = 1;
	characterId: string;
	displayName: string;
	characterModel?: TGameCharacter;
	wcsCharacter: Character;
	target?: IGameCharacter;
	rewardMap: Map<IGameCharacter, number> = new Map<IGameCharacter, number>();

	constructor(wcsCharacter: Character) {
		const fullName = wcsCharacter.Instance?.GetFullName();
		assert(fullName, "Instance is nil");
		this.characterId = fullName;
		this.displayName = "GameCharacter";
		this.wcsCharacter = wcsCharacter;
		this.characterModel = this.wcsCharacter.Instance as TGameCharacter;
		this.characterModel.AddTag("GameCharacter");
	}

	/* Register Skill */
	RegisterSkill(skillId: SkillId): void {
		// Register Skill to the Character
		if (this.wcsCharacter.GetSkillFromString(skillId)) {
			Logger.Log(script, `[NEW STYLE]: Skill ${skillId} already registered`);
			return;
		}
		CreateSkillFromId(skillId, this.wcsCharacter);
	}

	/* Remove all skills from the character */
	RemoveSkills(): void {
		this.wcsCharacter.ClearMoveset();
	}

	/* Take Damage */
	TakeDamage(damageContainer: DamageContainer): void {
		Logger.Log(script, "[Super]: Taking Damage", damageContainer.Damage);
	}

	/* Set Target */
	SetTarget(target: IGameCharacter): void {
		Logger.Log(script, "[Super]: Setting Target", target as unknown as string);
		this.target = target;
	}

	/* Clear Target */
	ClearTarget(): void {
		this.target = undefined;
	}

	/* Destroy */
	Destroy(): void {
		this.wcsCharacter.Destroy();
	}
}
