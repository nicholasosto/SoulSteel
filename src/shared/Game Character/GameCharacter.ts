import { Character, DamageContainer } from "@rbxts/wcs";
import { TGameCharacter } from "./TGameCharacter";
import { IGameCharacter } from "./Interfaces";
import { GetRegisteredSkillConstructor } from "@rbxts/wcs";
import Logger from "shared/Utility/Logger";

export default class GameCharacter implements IGameCharacter {
	characterId: string;
	displayName: string;
	characterModel?: TGameCharacter;
	wcsCharacter: Character;
	target?: GameCharacter;
	rewardMap: Map<string, number> = new Map<string, number>();

	constructor(wcsCharacter: Character) {
		this.characterId = wcsCharacter.Instance?.GetFullName() || "nil";
		this.displayName = "GameCharacter";
		this.wcsCharacter = wcsCharacter;
		this.characterModel = this.wcsCharacter.Instance as TGameCharacter;
		this.characterModel.AddTag("GameCharacter");
	}

	RegisterSkill(skillId: string): void {
		// Register Skill to the Character
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

	SetTarget(target: GameCharacter): void {
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
