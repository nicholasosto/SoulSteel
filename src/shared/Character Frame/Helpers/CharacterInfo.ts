import { ICharacterInfo, TCharacterFrame } from "shared/Character Frame/Index";

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
		this.profilePic.Image = imageId;
	}

	setLevel(level: number) {
		this.levelCounter.SetAttribute("TextValue", tostring(level));
	}
}
