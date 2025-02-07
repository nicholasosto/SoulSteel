import { DamageContainer, Skill, SkillDecorator } from "@rbxts/wcs";
import Logger from "shared/Utility/Logger";
import { SkillDefinitions } from "shared/Skills/Data/SkillDefinitions";
import { CreateAnimationTrack, EAnimationID } from "shared/Animation/AnimationIndex";
import { SkillDefinition } from "../Interfaces/SkillInterfaces";

@SkillDecorator
export class None extends Skill {
	private _skillDefinition: SkillDefinition | undefined;
	private _damageContainer: DamageContainer | undefined;
	private _animationId: EAnimationID = EAnimationID.EMOTE_SHRUG;
	private _animationTrack: AnimationTrack | undefined;

	protected OnConstructServer(): void {
		Logger.Log(script, "Constructing Skill ");
	}

	protected OnStartClient(): void {
		Logger.Log(script, "Client Started: ", this._skillDefinition?.displayName);
	}

	protected OnStartServer(): void {
		Logger.Log(script, "Server Started: ", this._skillDefinition as unknown as string);

		//this._animationTrack?.Play();
	}

	protected OnEndServer(): void {}
}
