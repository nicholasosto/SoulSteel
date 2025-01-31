import { ICharacterInfo, TCharacterFrame } from "shared/Character Frame/iCharacterFrame";
import Logger from "shared/Utility/Logger";

export default class CharacterInfo implements ICharacterInfo {
	characterName: Frame;
	profilePic: ImageLabel;
	levelCounter: ImageLabel;

	constructor(infoFrame: TCharacterFrame["Info"]) {
		this.characterName = infoFrame.CharacterName;
		this.profilePic = infoFrame.ProfilePic;
		this.levelCounter = infoFrame.LevelCounter;
	}

	setName(name: string) {
		this.characterName.SetAttribute("TextValue", name);
	}

	setProfilePic(imageId: string) {
		Logger.Log(script, "Setting Profile Pic:", imageId);
		this.profilePic.Image = imageId;
	}

	setLevel(level: number) {
		this.levelCounter.SetAttribute("TextValue", tostring(level));
	}
}
