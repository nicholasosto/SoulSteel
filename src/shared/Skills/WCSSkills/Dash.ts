import { Skill, SkillDecorator } from "@rbxts/wcs";
import { Logger } from "shared/Utility/Logger";
import { SkillDefinitions } from "shared/Skills/Data/SkillDefinitions";;
import { AttachEffect, EParticleName } from "shared/_References/Particles";
import { CreateAnimationTrack, EAnimationID } from "shared/Animation/AnimationIndex";
import { EAttachmentName } from "shared/_References/Attachments";

@SkillDecorator
export class Dash extends Skill {
	private _skillDefinition = SkillDefinitions.Dash;
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
		//this._animationTrack?.Play();
	}

	// Server-Side Update
	protected OnEndServer(): void {}
}
