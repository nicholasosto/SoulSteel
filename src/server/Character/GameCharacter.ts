import Logger from "shared/Utility/Logger";
import { Character, DamageContainer } from "@rbxts/wcs";
import { TGameCharacter, IGameCharacter } from "shared/Game Character/CharacterIndex";

export default class GameCharacter implements IGameCharacter {
	characterId: string;
	level: number = 1;
	displayName: string;
	characterModel?: TGameCharacter;
	wcsCharacter: Character;
	target?: IGameCharacter;
	rewardMap: Map<IGameCharacter, number> = new Map<IGameCharacter, number>();

	/* Constructor */
	constructor(wcsCharacter: Character) {
		const fullName = wcsCharacter.Instance?.GetFullName();
		assert(fullName, "Instance is nil");
		this.characterId = fullName;
		this.displayName = "GameCharacter";
		this.wcsCharacter = wcsCharacter;
		this.characterModel = this.wcsCharacter.Instance as TGameCharacter;
		this.characterModel.AddTag("GameCharacter");
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
