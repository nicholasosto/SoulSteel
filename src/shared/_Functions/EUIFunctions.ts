import { TEpicAttributes } from "shared/Epic UI/EpicIndex";

/* Get Attribute Value */
function GetEpicAttribute(attribute: TEpicAttributes, instance: Instance) {
	if (instance === undefined) {
		warn(script, "Instance is undefined");
		return undefined;
	}
	const attributeValue = instance.GetAttribute(attribute);
	return attributeValue;
}

/* Set Attribute Value */
function SetEpicAttribute(attribute: TEpicAttributes, value: unknown, instance: Instance) {
	if (instance === undefined) {
		warn(script, "Instance is undefined");
		return;
	}

	if (value === undefined) {
		warn(script, "Value is undefined");
		return;
	}

	if (attribute === "BarPercent") {
		instance.SetAttribute(attribute, value as number);
	} else {
		instance.SetAttribute(attribute, value as string);
	}
}

export { GetEpicAttribute, SetEpicAttribute };
