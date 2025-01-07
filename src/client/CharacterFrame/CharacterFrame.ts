import { Logger } from "shared/Utility/Logger";

export class CharacterFrame {
	constructor() {
		Logger.Log(script, "CharacterFrame created");
	}

	public Show() {
		Logger.Log(script, "CharacterFrame shown");
	}

	public Hide() {
		Logger.Log(script, "CharacterFrame hidden");
	}
}
