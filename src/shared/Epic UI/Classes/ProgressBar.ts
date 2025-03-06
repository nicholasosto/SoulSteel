import Logger from "shared/Utility/Logger";
import { TEpicAttributes } from "shared/Epic UI/EpicIndex";
import { Payloads } from "shared/net/Remotes";

export default class ProgressBar {
	frame: Frame;

	constructor(frame: Frame) {
		this.frame = frame;
	}

	Update(payload: Payloads["PlayerResourceData"]) {
		/* Get Payload Values */
		const currentValue = payload[1];
		const maxValue = payload[2];
		const textValue = `${payload[0]}: ${currentValue}/${maxValue}`;
		const percent = (currentValue / maxValue) * 100;

		/* Update the Progress Bar */
		this.SetEpicAttribute("BarPercent", tostring(percent));
		this.SetEpicAttribute("TextValue", textValue);
	}
	SetEpicAttribute(attribute: TEpicAttributes, value: string) {
		this.frame.SetAttribute(attribute, value);
	}

	GetEpicAttribute(attribute: TEpicAttributes): string {
		Logger.Log(script, "Getting Epic Attribute", attribute as unknown as string);
		return this.frame.GetAttribute(attribute) as string;
	}
}
