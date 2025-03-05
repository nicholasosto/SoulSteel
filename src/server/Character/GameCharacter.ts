import Logger from "shared/Utility/Logger";
import { Character, DamageContainer } from "@rbxts/wcs";
import { GameCharacterModel, IGameCharacter } from "server/Character/Index/CharacterIndex";
import { generateCharacterName } from "shared/_Factories/NameFactory";

export default class GameCharacter implements IGameCharacter {
	characterId: string;
	level: number = 1;
	displayName: string;
	characterModel: GameCharacterModel;
	wcsCharacter: Character;
	target?: IGameCharacter;

	/* Constructor */
	constructor(wcsCharacter: Character) {
		const fullName = wcsCharacter.Instance?.GetFullName();
		assert(fullName, "Instance is nil");
		this.characterId = fullName;
		this.displayName = generateCharacterName();
		this.wcsCharacter = wcsCharacter;
		this.characterModel = this.wcsCharacter.Instance as GameCharacterModel;
		this.characterModel.AddTag("GameCharacter");
	}

	/* Take Damage */
	TakeDamage(damageContainer: DamageContainer): void {
		Logger.Log(script, "[Super]: Taking Damage", damageContainer.Damage);
	}

	DealtDamage(damageContainer: DamageContainer): void {
		Logger.Log(script, "[Super]: Dealt Damage", damageContainer.Damage);
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
		Logger.LogFlow("[Player Character Flow][Destruction]", 99, script);
	}
}
