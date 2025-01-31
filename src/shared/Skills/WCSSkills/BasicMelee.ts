import { Skill, SkillDecorator } from "@rbxts/wcs";
import Logger from "shared/Utility/Logger";
import { SkillDefinitions } from "shared/Skills/Data/SkillDefinitions";
import { AttachEffect, EParticleName } from "shared/_References/Particles";
import { CreateAnimationTrack, EAnimationID } from "shared/Animation/AnimationIndex";
import { EAttachmentName } from "shared/_References/Attachments";
import { Character } from "@rbxts/wcs";

@SkillDecorator
export class BasicMelee extends Skill {
	private _skillDefinition = SkillDefinitions.BasicMelee;
	private _damageContainer = this.CreateDamageContainer(this._skillDefinition.baseDamage ?? 10);
	private _animationTrack: AnimationTrack | undefined;

	// Server-Side Construct
	protected OnConstructServer(): void {
		// Create Animation Track
		this._animationTrack = CreateAnimationTrack(
			this.Character.Instance as Model,
			EAnimationID.SKILL_Fart,
		) as AnimationTrack;

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
		const hitbox = this.createHitbox();
		let hitCharacter = false;
		hitbox.Touched.Connect((hit) => {
			const characterModel = hit.FindFirstAncestorWhichIsA("Model") as Model;
			if (characterModel === undefined) return;

			const character = Character.GetCharacterFromInstance(characterModel);

			if (!hitCharacter) {
				character?.TakeDamage(this._damageContainer);
				hitCharacter = true;
			}

			Logger.Log(script, "Hit: " + characterModel.Name);

			hitbox.Destroy();
		});

		//this._animationTrack?.Play();
	}

	// Server-Side Update
	protected OnEndServer(): void {}

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

export function GameOfLife(character: Model) {
	Logger.Log(script, "Game of Life");
	let startCFrame = character.GetPivot();
	startCFrame = startCFrame.mul(new CFrame(0, 0, -10));
	const partTemplate = new Instance("Part");
	partTemplate.Size = new Vector3(3, 3, 3);
	partTemplate.Anchored = true;
	partTemplate.CanCollide = false;
	partTemplate.Material = Enum.Material.Neon;
	partTemplate.BrickColor = new BrickColor("Bright red");
	partTemplate.Transparency = 0.5;
	partTemplate.Shape = Enum.PartType.Block;
	partTemplate.Parent = game.Workspace;
	partTemplate.PivotTo(startCFrame);
}
