import Logger from "shared/Utility/Logger";
import { EEpicUIAttributes } from "./EpicInterfaces";

function GetEpicAttribute(attribute: EEpicUIAttributes, instance: Instance) {
	if (instance === undefined) {
		Logger.Log(script, "Instance is undefined");
		return undefined;
	}
	const attributeValue = instance.GetAttribute(attribute);
	return attribute;
}

function SetEpicAttribute(attribute: EEpicUIAttributes, value: unknown, instance: Instance) {
	if (instance === undefined) {
		Logger.Log(script, "Instance is undefined");
		return;
	}

	if (value === undefined) {
		Logger.Log(script, "Value is undefined");
		return;
	}

	if (attribute === "BarPercent") {
		instance.SetAttribute(attribute, value as number);
	} else {
		instance.SetAttribute(attribute, value as string);
	}
}

export { GetEpicAttribute, SetEpicAttribute };
