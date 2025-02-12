import Logger from "shared/Utility/Logger";
import { Skill, SkillDecorator } from "@rbxts/wcs";
import { SkillDefinitions } from "shared/_Definitions/SkillDefinitions";
import { SkillDefinition } from "shared/_Interfaces/SkillInterfaces";
import { getSkillDefinitionMap } from "shared/_Functions/SkillFunctions";
import { CreateAnimationTrack } from "shared/_Functions/AnimationFunctions";
import StorageManager from "shared/Storage Manager/StorageManager";
import { EAnimationID } from "shared/Animation/Enums";
import { Character } from "@rbxts/wcs";
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
		this._animationTrack = CreateAnimationTrack(
			this.Character.Instance as GameCharacterModel,
			EAnimationID.SKILL_BasicMelee,
		);

		this.projectile = StorageManager.CloneFromStorage("Projectile_Explosion_01") as Model;

		//assert(this._animationTrack, "Animation Track is nil");
	}

	// Client-Side Start
	protected OnStartClient(): void {
		Logger.Log(script, "Client Start");
	}

	// Server-Side Start
	protected OnStartServer(): void {
		Logger.Log(script, "Server Start");
		//Logger.Log(script, "Server Started: ", this._skillDefinition.displayName);
		//dummy test
		const gamecharacterModel = this.Character.Instance as GameCharacterModel;
		//gamecharacterModel.Humanoid.WalkSpeed = 0;

		// Get the Character Model and CFrame
		const characterModel: Model = this.Character.Instance as Model;
		assert(characterModel !== undefined, "Character Model is nil");
		const characterCFrame: CFrame = characterModel.GetPivot();

		// Create the Projectile
		//const projectile = explosion_01.Clone();
		const hitbox = this.createHitbox();
		//const projectileInstance = new ExplosiveProjectile(hitbox, new Vector3(0, 0, -1), 50, 40, 10);

		// Set the Projectile Properties
		//projectile.Parent = game.Workspace;
		//projectile.PivotTo(characterCFrame.mul(new CFrame(0, 0, -6)));

		// Connect the Hitbox
		this._connectionHitbox?.Disconnect();
		this._connectionHitbox = hitbox.Touched.Connect((hit) => {
			Logger.Log(script, "Hit: ", hit);
			const characterModel = hit?.Parent as Model;
			const wcsCharacter = Character.GetCharacterFromInstance(characterModel);
			Logger.Log(script, "Hit: ", wcsCharacter as unknown as string);
			if (wcsCharacter !== this.Character) {
				Logger.Log(script, "Hit: ", "Self");
				//projectileInstance.onCollision(hit);
				wcsCharacter?.TakeDamage(this._damageContainer);
				return;
			}
			wcsCharacter?.TakeDamage(this._damageContainer);
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
		const offset = characterCFrame.mul(new CFrame(0, 0, -6));
		hitbox.PivotTo(offset);

		return hitbox;
	}
}
