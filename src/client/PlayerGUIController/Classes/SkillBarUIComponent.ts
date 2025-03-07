import { SkillId } from "shared/_IDs/IDs_Skill";
type TSkillSlotMap = Map<number, SkillId>;

export default class SkillBarUIComponent {
	private _skillBar: Frame;
	private _skillSlotMap: TSkillSlotMap | undefined;

	constructor(skillBar: Frame) {
		this._skillBar = skillBar;
		warn("SkillBarUIComponent Constructor Not Implemented");
	}

	public Initialize(data: TSkillSlotMap): void {
		warn("SKillBar Cleaner", data as TSkillSlotMap as unknown as string);
	}

	public Update(data: TSkillSlotMap): void {
		warn("Update - SkillBarUIComponent: Update Method Not Implemented" , [data]);
	}
}
