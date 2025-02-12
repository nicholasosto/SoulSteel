import Logger from "shared/Utility/Logger";
import { Skill, SkillDecorator, Character } from "@rbxts/wcs";

import { SkillDefinition } from "shared/_Interfaces/SkillInterfaces";
import { getSkillDefinitionMap } from "shared/_Functions/SkillFunctions";

import StorageManager from "shared/Storage Manager/StorageManager";

import { GameCharacterModel } from "shared/_Types/GameCharacterModel";

@SkillDecorator
export class BasicMelee extends Skill {
	private _skillDefinition = getSkillDefinitionMap().get("BasicMelee") as SkillDefinition;
	private _damageContainer = this.CreateDamageContainer(100);
	private _connectionHitbox: RBXScriptConnection | undefined;
	private _animationTrack: AnimationTrack | undefined;

	private projectile: Model | undefined;

	protected OnConstruct(): void {
		//Logger.Log(script, "Shared Construct: ", this._skillDefinition.displayName);
	}

	// Server-Side Construct
	protected OnConstructServer(): void {
		Logger.Log(script, "Constructing Skill ");
		// // Create Animation Track
		//const animationId = this._skillDefinition.animation as EAnimationID;

		this.projectile = StorageManager.CloneFromStorage("Projectile_Explosion_01") as Model;

		//assert(this._animationTrack, "Animation Track is nil");
	}

	// Client-Side Start
	protected OnStartClient(): void {
		Logger.Log(script, "OnClientStart()");
	}

	// Server-Side Start
	protected OnStartServer(): void {
		Logger.Log(script, "OnServerStart()");

		/* Game Character Model */
		const gamecharacterModel = this.Character.Instance as GameCharacterModel;

		assert(gamecharacterModel !== undefined, "Character Model is nil");

		/* Hit Box */
		const hitbox = this.createHitbox();

		// Connect the Hitbox
		this._connectionHitbox?.Disconnect();
		this._connectionHitbox = hitbox.Touched.Connect((hit) => {
			Logger.Log(script, "Hit: ", hit);
			const characterModel = hit?.Parent as Model;
			const wcsCharacter = Character.GetCharacterFromInstance(characterModel);
			Logger.Log(script, "Hit: ", wcsCharacter as unknown as string);
			if (wcsCharacter !== this.Character) {
				wcsCharacter?.TakeDamage(this._damageContainer);
				this._connectionHitbox?.Disconnect();

				this.projectile?.Destroy();
				hitbox.Destroy();
				return;
			}
		});

		// play the animation
		this._animationTrack?.Play();
	}

	// Server-Side Update
	protected OnEndServer(): void {
		Logger.Log(script, "Server Ended");
	}

	protected createHitbox(): Part {
		const hitbox = new Instance("Part");
		hitbox.Size = new Vector3(3, 3, 3);
		hitbox.Anchored = true;
		hitbox.CanCollide = false;
		hitbox.Material = Enum.Material.Neon;
		hitbox.BrickColor = new BrickColor("Bright red");
		hitbox.Parent = game.Workspace;

		const characterCFrame = (this.Character.Instance as Model).GetPivot();
		const offset = characterCFrame.mul(new CFrame(0, 0, -16));
		hitbox.PivotTo(offset);

		return hitbox;
	}
}
