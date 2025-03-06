import { SkillBarInstance } from "client/ScreenGUIs/GUI_Index";
import SkillBar from "shared/Epic UI/Classes/SkillBar";
import Logger from "shared/Utility/Logger";
import { SkillId } from "shared/_IDs/IDs_Skill";
import { Remotes } from "shared/net/Remotes";

/*Controller Events*/

export default class SkillBarController {
	/* Skill Bar */
	private static _skillBar: SkillBar = new SkillBar(SkillBarInstance);

	/* Skill Bar Update */
	private static _SkillBarUpdateConnection: RBXScriptConnection | undefined;

	/* Start Skill Bar Listeners */
	public static StartSkillBarListeners() {
		/* Skill Bar Update - From Server */
		this._SkillBarUpdateConnection?.Disconnect();
		this._SkillBarUpdateConnection = Remotes.Client.Get("SkillBarUpdate").Connect(([skillMap]) => {
			Logger.Log(script, "Skill Bar Update");
			this._skillBar.LoadSkills(skillMap);
		});
	}
	public static SendAssignSkill(slot: number, skillId: SkillId) {
		const payload: [number, SkillId] = [slot, skillId];
		Remotes.Client.Get("AssignSkill").SendToServer(payload);
	}

	public static UnassignSkill(slot: number) {
		SkillBarController._skillBar.UnassignSkill(slot);
	}
}
