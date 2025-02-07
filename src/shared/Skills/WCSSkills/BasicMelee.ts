import { Skill, SkillDecorator } from "@rbxts/wcs";
import { TweenService } from "@rbxts/services";
import Logger from "shared/Utility/Logger";
import { SkillDefinitions } from "shared/Skills/Data/SkillDefinitions";
import { AttachEffect, EParticleName } from "shared/_References/Particles";
import { CreateAnimationTrack, EAnimationID } from "shared/Animation/AnimationIndex";
import { EAttachmentName } from "shared/_References/Attachments";
import { Character } from "@rbxts/wcs";
import { explosion_01 } from "shared/Skills/SkillParts/Projectiles";
import { StorageManager } from "shared/Storage Manager/StorageManager";
import ExplosiveProjectile from "shared/Projectile Factory/Projectiles/ExplosiveProjectile";
import { TGameCharacter } from "shared/Game Character/TGameCharacter";

@SkillDecorator
export class BasicMelee extends Skill {
	private _skillDefinition = SkillDefinitions.BasicMelee;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _connectionHitbox: RBXScriptConnection | undefined;
	private _animationTrack: AnimationTrack | undefined;

	private projectile: Model | undefined;

	// Server-Side Construct
	protected OnConstructServer(): void {
		// Create Animation Track
		const animationId = this._skillDefinition.animation as EAnimationID;
		this._animationTrack = CreateAnimationTrack(this.Character, animationId);

		this.projectile = StorageManager.CloneFromStorage("Projectile_Explosion_01") as Model;

		assert(this._animationTrack, "Animation Track is nil");
	}

	// Client-Side Start
	protected OnStartClient(): void {
		Logger.Log(script, "Client Started: ", this._skillDefinition.displayName);
		const characterModel = this.Character.Instance as Model;

		AttachEffect(characterModel, EParticleName.Blood_Wound, EAttachmentName.FaceFront, 3);
	}

	// Server-Side Start
	protected OnStartServer(): void {
		Logger.Log(script, "Server Started: ", this._skillDefinition.displayName);
		//dummy test
		const gamecharacterModel = this.Character.Instance as TGameCharacter;
		gamecharacterModel.Humanoid.WalkSpeed = 0;

		// Get the Character Model and CFrame
		const characterModel: Model = this.Character.Instance as Model;
		assert(characterModel !== undefined, "Character Model is nil");
		const characterCFrame: CFrame = characterModel.GetPivot();

		// Create the Projectile
		const projectile = explosion_01.Clone();
		const hitbox = this.createHitbox();
		const projectileInstance = new ExplosiveProjectile(hitbox, new Vector3(0, 0, -1), 50, 40, 10);

		// Set the Projectile Properties
		projectile.Parent = game.Workspace;
		projectile.PivotTo(characterCFrame.mul(new CFrame(0, 0, -6)));

		// Connect the Hitbox
		this._connectionHitbox?.Disconnect();
		this._connectionHitbox = hitbox.Touched.Connect((hit) => {
			Logger.Log(script, "Hit: ", hit);
			const characterModel = hit?.Parent as Model;
			const wcsCharacter = Character.GetCharacterFromInstance(characterModel);
			if (wcsCharacter !== this.Character) {
				Logger.Log(script, "Hit: ", "Self");
				projectileInstance.onCollision(hit);
				wcsCharacter?.TakeDamage({ Damage: 40, Source: this });
				return;
			}
			wcsCharacter?.TakeDamage(this._damageContainer);
		});

		// play the animation
		this._animationTrack?.Play();
	}

	// Server-Side Update
	protected OnEndServer(): void {
		Logger.Log(script, "Server Ended: ", this._skillDefinition.displayName);
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
