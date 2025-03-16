import Logger from "shared/Utility/Logger";
import { TEpicAttributes } from "shared/User Interface Classes/Types/EpicIndex";
import * as Payloads from "shared/net/RemoteIndex";

export default class ProgressBar {
	frame: Frame;

	constructor(frame: Frame) {
		this.frame = frame;
	}

	/* Updates the GUI Element with Payload Data */
	Update(payload: Payloads.PResourceBar) {
		/* Get Payload Values */
		const currentValue = payload.current;
		const maxValue = payload.max;
		const textValue = `${payload.resourceId}: ${currentValue}/${maxValue}`;
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
