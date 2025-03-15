export type TInfoFrame = Frame & {
	Bars: Frame & {
		Progress: Frame & {
			Health: Frame;
			Stamina: Frame;
			SoulPower: Frame;
			Experience: Frame;
		};
	};
	InfoFrame: Frame & {
		Name_Frame: Frame;
		LevelCounter: ImageLabel;
		ProfilePic: ImageLabel;
	};
};
