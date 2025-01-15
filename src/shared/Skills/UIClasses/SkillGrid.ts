import { SkillData, TSkillGrid } from "shared/Skills/SkillIndex";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import Remotes, { RemoteNames } from "shared/Remotes";

export class SkillGrid {
	private skillGrid: TSkillGrid = StorageManager.CloneFromStorage("SkillGrid") as TSkillGrid;
	private skills: SkillData[];

	constructor(skillGrid: TSkillGrid, skills: SkillData[]) {
		this.skillGrid = skillGrid;
		this.skills = skills;

		this.renderSkills();
	}

	private renderSkills() {
		// Clear existing skills in grid
		this.skills.forEach((skill) => this.createSkillGridButton(skill));
	}

	private createSkillGridButton(skill: SkillData) {
		const template = this.skillGrid.SkillButtonTemplate.Clone();
		//template.Name = skill.id;
		template.Icon.Image = skill.icon;
		template.Name.Text = skill.name;
		template.Description.Text = skill.description;

		// Unlock Button
		template.UnlockButton.Visible = !skill.isUnlocked;
		template.UnlockButton.Activated.Connect(() => {
			this.unlockSkill(skill.id);
		});

		// Assign Button
		template.AssignButton.Visible = skill.isUnlocked && !skill.assigned;
		template.AssignButton.Activated.Connect(() => {
			this.assignSkill(skill.id);
		});

		template.Parent = this.skillGrid;
	}

	private unlockSkill(skillId: string) {
		// This is a remote event that is sent to the server to unlock the skill
		Remotes.Client.GetNamespace("Skills").Get(RemoteNames.UnlockSkill).SendToServer(skillId);
	}

	private assignSkill(skillId: string) {
		Remotes.Client.GetNamespace("Skills").Get(RemoteNames.AssignSkillSlot).SendToServer(1, skillId);
	}
}
