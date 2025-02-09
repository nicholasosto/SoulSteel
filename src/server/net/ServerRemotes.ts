import { BiDirectionalEvents } from "shared/Remotes/Remotes";

const SkillBarCreated = BiDirectionalEvents.Server.Get("SkillBarCreated");
const SkillSlotAssignment = BiDirectionalEvents.Server.Get("SkillSlotAssignment");
const UnassignSkillSlot = BiDirectionalEvents.Server.Get("UnAssignSkillSlot");

export { SkillBarCreated, SkillSlotAssignment };
