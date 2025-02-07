import CharacterFrame from "shared/Epic UI/Character Frame/CharacterFrame";
import SkillBar from "shared/Epic UI/Skill Bar/SkillBar";

class UIController {
	private static _instance: UIController | undefined;
	private static _characterFrame: CharacterFrame | undefined;
	private static _skillBar: SkillBar | undefined;

	private constructor() {}

	public static Start() {
		if (this._instance === undefined) {
			this._instance = new UIController();
		}
	}

	private static OnCharacterCreated(){

		this._skillBar = new SkillBar();

	}
}
