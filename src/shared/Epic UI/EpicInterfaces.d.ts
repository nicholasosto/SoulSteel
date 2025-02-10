type EEpicUIAttributes = "BarPercent" | "TextValue";

/* Types */
type TInfoFrame = Frame & {
	ProfilePic: ImageLabel;
	Name_Frame: Frame;
	LevelCounter: ImageLabel;
};

interface IProgressBar {
	frame: Frame;
	update(resourceId: string, current: number, max: number): void;
	setPercent(percent: number): void;
	setText(value: string): void;
	getPercent(): number;
	getText(): string;
}

interface IInfoFrame {
	SetProfilePic(imageId: string): void;
	SetName(name: string): void;
	SetLevel(level: number): void;
}

export { EEpicUIAttributes, TInfoFrame, IProgressBar, IInfoFrame };
