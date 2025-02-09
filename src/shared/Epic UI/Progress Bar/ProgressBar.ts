import { IProgressBar } from "shared/Epic UI/Character Frame/iCharacterFrame";
import { CharacterResource } from "shared/Game Character/Character Resources/CharacterResource";
import Logger from "shared/Utility/Logger";

export default class ProgressBar implements IProgressBar {
	frame: Frame;

	constructor(frame: Frame) {
		this.frame = frame;
	}

	update(characterResource: CharacterResource) {
		Logger.Log(script, "Updating Progress Bar", characterResource as unknown as string);
		const currentValue = characterResource.Current;
		const maxValue = characterResource.MaxValue;

		const textValue = `${characterResource.ResourceName}: ${currentValue}/${maxValue}`;

		const percent = (currentValue / maxValue) * 100;
		this.setPercent(percent);
		this.setText(textValue);
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
