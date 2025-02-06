import * as ClientRemotes from "shared/Remotes/ClientRemotes";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import Logger from "shared/Utility/Logger";

// Create functions to send events to the server, if needed
export function sendTargetSelected(targetId: string) {
	Logger.Log(script, "Sending target selected to server", targetId);
	ClientRemotes.PlayerCharacterRemotes.TargetSelected.SendToServer(targetId);
}

// Assign Skill To Slot
export function AssignSkillSlot(slot: number, skillId: SkillId) {
	Logger.Log(script, "Assigning skill to slot", slot, skillId);
	ClientRemotes.SkillRemotes.AssignSkillSlot.SendToServer(slot, skillId);
}

// Unassign Skill From Slot
export function UnassignSkillSlot(slot: number) {
	Logger.Log(script, "Unassigning skill from slot", slot);
	ClientRemotes.SkillRemotes.UnassignSkillSlot.SendToServer(slot);
}
