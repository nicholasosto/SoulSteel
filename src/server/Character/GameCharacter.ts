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
		this.characterId = wcsCharacter.Instance?.GetFullName() || "nil";
		this.displayName = "GameCharacter";
		this.wcsCharacter = wcsCharacter;
		this.characterModel = this.wcsCharacter.Instance as TGameCharacter;
		this.characterModel.AddTag("GameCharacter");
	}

	RegisterSkill(skillId: string): void {
		// Register Skill to the Character
		Logger.Log(script, `[NEW STYLE]: Registering Skill ${skillId}`);
		const skillConstructor = GetRegisteredSkillConstructor(skillId);
		assert(skillConstructor, "Skill Constructor is nil");
		const newSkill = new skillConstructor(this.wcsCharacter);
		assert(newSkill, "New Skill is nil");
	}

	RemoveSkills(): void {
		this.wcsCharacter.ClearMoveset();
	}

	TakeDamage(damageContainer: DamageContainer): void {
		Logger.Log(script, "[Super]: Taking Damage", damageContainer.Damage);
	}

	SetTarget(target: IGameCharacter): void {
		Logger.Log(script, "[Super]: Setting Target", target as unknown as string);
		this.target = target;
	}

	ClearTarget(): void {
		this.target = undefined;
	}

	Destroy(): void {
		this.wcsCharacter.Destroy();
	}
}
