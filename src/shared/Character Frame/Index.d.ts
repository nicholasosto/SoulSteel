type TCharacterFrame = Frame & {
	Bars: Frame & {
		Progress: Frame & {
			["Stamina Bar"]: Frame;
			["Health Bar"]: Frame;
			["Mana Bar"]: Frame;
			["Experience Bar"]: Frame;
		};
	};
	Info: Frame & {
		CharacterName: Frame;
		ProfilePic: ImageLabel;
		LevelCounter: ImageLabel;
	};
};

interface IProgressBar {
	frame: Frame;
	setPercent(percent: number): void;
	setText(value: string): void;
	getPercent(): number;
	getText(): string;
}

interface ICharacterInfo {
	characterName: Frame;
	profilePic: ImageLabel;
	levelCounter: ImageLabel;
	setName(name: string): void;
	setProfilePic(imageId: string): void;
	setLevel(level: number): void;
}

interface ICharacterFrame {
	bars: {
		stamina: IProgressBar;
		health: IProgressBar;
		mana: IProgressBar;
		experience: IProgressBar;
	};
	info: ICharacterInfo;
}

export { TCharacterFrame, IProgressBar, ICharacterInfo, ICharacterFrame };
