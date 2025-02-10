import Logger from "shared/Utility/Logger";
import { EEpicUIAttributes } from "shared/Epic UI/EpicInterfaces";
export default class ProgressBar {
	frame: Frame;

	constructor(frame: Frame) {
		this.frame = frame;
	}

	Update(payload: { resourceId: string; current: number; max: number }) {
		/* Get Payload Values */
		const currentValue = payload.current;
		const maxValue = payload.max;
		const textValue = `${payload.resourceId}: ${currentValue}/${maxValue}`;
		const percent = (currentValue / maxValue) * 100;

		/* Update the Progress Bar */
		this.SetEpicAttribute("BarPercent", tostring(percent));
		this.SetEpicAttribute("TextValue", textValue);
	}
	SetEpicAttribute(attribute: EEpicUIAttributes, value: string) {
		this.frame.SetAttribute(attribute, value);
	}

	GetEpicAttribute(attribute: EEpicUIAttributes): string {
		Logger.Log(script, "Getting Epic Attribute", attribute as unknown as string);
		return this.frame.GetAttribute(attribute) as string;
	}
}
