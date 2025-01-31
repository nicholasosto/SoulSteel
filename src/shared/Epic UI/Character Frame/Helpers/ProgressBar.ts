import { IProgressBar } from "shared/Epic UI/Character Frame/iCharacterFrame";

export default class ProgressBar implements IProgressBar {
	frame: Frame;

	constructor(frame: Frame) {
		this.frame = frame;
	}

	setPercent(percent: number) {
		this.frame.SetAttribute("BarPercent", math.clamp(percent, 0, 100));
	}

	setText(value: string) {
		this.frame.SetAttribute("TextValue", value);
	}

	getPercent(): number {
		return this.frame.GetAttribute("BarPercent") as number;
	}

	getText(): string {
		return this.frame.GetAttribute("TextValue") as string;
	}
}
