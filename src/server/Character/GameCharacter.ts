import Logger from "shared/Utility/Logger";
import { Character, DamageContainer } from "@rbxts/wcs";
import { GameCharacterModel, IGameCharacter } from "server/Character/Index/CharacterIndex";
import { generateCharacterName } from "shared/Factories/NameFactory";

export default class GameCharacter implements IGameCharacter {
	characterId: string;
	level: number = 1;
	displayName: string;
	characterModel?: GameCharacterModel;
	wcsCharacter: Character;
	target?: IGameCharacter;

	protected _connectionTakeDamage: RBXScriptConnection | undefined;
	protected _connectionDealtDamage: RBXScriptConnection | undefined;

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

	protected _initializeConnections() {
		/* Take Damage */
		this._connectionTakeDamage?.Disconnect();
		this._connectionTakeDamage = this.wcsCharacter.DamageTaken.Connect((damageContainer) => {
			Logger.Log(script, "[Super]: Taking Damage", damageContainer.Damage);
			this.TakeDamage(damageContainer);
		});

		/* Dealt Damage */
		this._connectionDealtDamage?.Disconnect();
		this._connectionDealtDamage = this.wcsCharacter.DamageDealt.Connect((enemy, damageContainer) => {
			Logger.Log(script, "[Super]: Dealt Damage to: ", enemy as unknown as string);
			this.DealtDamage(damageContainer);
		});
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
		const humanoid = this.characterModel?.Humanoid;
		humanoid?.Destroy();
		this.wcsCharacter.Destroy();
		this.characterModel?.Destroy();
	}
}
