import { TProgressBar } from "./TProgressBar";
import { ResourceId } from "shared/_References/Resources";

class ResourceBar {
	private _resourceBar: TProgressBar;
	private _resourceId: ResourceId;

	constructor(resourceId: ResourceId, resourceBar: TProgressBar) {
		this._resourceId = resourceId;
		this._resourceBar = resourceBar;
	}

	public SetPercentage(value: number) {
		this._resourceBar.SetAttribute("BarPercent", value);
	}

	public SetText(value: string) {
		this._resourceBar.SetAttribute("TextValue", value);
	}
}
