import { AttributeLabel_Template } from "./AttributeLabel_Template";
import { EEpicUIAttributes } from "shared/Epic UI/EpicUIAttributes";
import { StorageManager } from "shared/Storage Manager/StorageManager";

export class AttributeLabelClass {
	public LabelObject: AttributeLabel_Template;

	constructor(attributeName: string, attributeValue: number, parent: Instance) {
		this.LabelObject = StorageManager.CloneFromStorage("AttributeLabel_Template") as AttributeLabel_Template;
		assert(this.LabelObject, "AttributeLabel_Template not found in Storage");
		this.SetName(attributeName);
		this.SetValue(attributeValue);
		this.SetParent(parent);
	}

	// Set the name of the attribute
	public SetName(name: string) {
		this.LabelObject.AttributeName.SetAttribute(EEpicUIAttributes.TextValue, name);
	}

	// Set the value of the attribute
	public SetValue(value: number) {
		this.LabelObject.AttributeValue.SetAttribute(EEpicUIAttributes.TextValue, tostring(value));
	}

	// Set the parent of the attribute label
	public SetParent(parent: Instance) {
		this.LabelObject.Parent = parent;
	}

	// Update the values of the attribute label
	public UpdateValues(name: string, value: number) {
		this.SetName(name);
		this.SetValue(value);
	}

	// Destroy the attribute label
	public Destroy() {
		this.LabelObject.Destroy();
	}
}
