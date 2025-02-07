import { Character, DamageContainer } from "@rbxts/wcs";
import { TGameCharacter } from "../../shared/Game Character/TGameCharacter";
import { IGameCharacter } from "../../shared/Game Character/Interfaces";
import { GetRegisteredSkillConstructor } from "@rbxts/wcs";
import Logger from "shared/Utility/Logger";

export default class GameCharacter implements IGameCharacter {
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
	RegisterSkill(skillId: string): void {
		// Register Skill to the Character
		Logger.Log(script, `[NEW STYLE]: Registering Skill ${skillId}`);
		const skillConstructor = GetRegisteredSkillConstructor(skillId);
		assert(skillConstructor, "Skill Constructor is nil");
		const newSkill = new skillConstructor(this.wcsCharacter);
		assert(newSkill, "New Skill is nil");
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
