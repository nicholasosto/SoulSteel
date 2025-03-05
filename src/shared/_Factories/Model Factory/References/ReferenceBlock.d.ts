export type TReferenceBlock = Part & {
	RightConstraint: RigidConstraint;
	BottomAttachment: Attachment;
	BackBlock: ObjectValue;
	BackAttachment: Attachment;
	RightAttachment: Attachment;
	FrontConstraint: RigidConstraint;
	TopBlock: ObjectValue;
	LeftAttachment: Attachment;
	FrontAttachment: Attachment;
	BottomBlock: ObjectValue;
	FrontBlock: ObjectValue;
	BackConstraint: RigidConstraint;
	TopAttachment: Attachment;
	BottomConstraint: RigidConstraint;
	RightBlock: ObjectValue;
	LeftBlock: ObjectValue;
	TopConstraint: RigidConstraint;
	LeftConstraint: RigidConstraint;
};

export interface IReferenceBlock {
	RightConstraint: RigidConstraint;
	BottomAttachment: Attachment;
	BackBlock: ObjectValue;
	BackAttachment: Attachment;
	RightAttachment: Attachment;
	FrontConstraint: RigidConstraint;
	TopBlock: ObjectValue;
	LeftAttachment: Attachment;
	FrontAttachment: Attachment;
	BottomBlock: ObjectValue;
	FrontBlock: ObjectValue;
	BackConstraint: RigidConstraint;
	TopAttachment: Attachment;
	BottomConstraint: RigidConstraint;
	RightBlock: ObjectValue;
	LeftBlock: ObjectValue;
	TopConstraint: RigidConstraint;
	LeftConstraint: RigidConstraint;
}

export abstract class ReferenceBlock implements IReferenceBlock {
	abstract RightConstraint: RigidConstraint;
	abstract BottomAttachment: Attachment;
	abstract BackBlock: ObjectValue;
	abstract BackAttachment: Attachment;
	abstract RightAttachment: Attachment;
	abstract FrontConstraint: RigidConstraint;
	abstract TopBlock: ObjectValue;
	abstract LeftAttachment: Attachment;
	abstract FrontAttachment: Attachment;
	abstract BottomBlock: ObjectValue;
	abstract FrontBlock: ObjectValue;
	abstract BackConstraint: RigidConstraint;
	abstract TopAttachment: Attachment;
	abstract BottomConstraint: RigidConstraint;
	abstract RightBlock: ObjectValue;
	abstract LeftBlock: ObjectValue;
	abstract TopConstraint: RigidConstraint;
	abstract LeftConstraint: RigidConstraint;

	// Spawn and attach a reference block to the indicated Attachment
	abstract SpawnCloneOnAttachment(attachment: Attachment): void;

	// Spawn at Position
	abstract Spawn(cframe: CFrame): void;

	// Run Cycle: Run the reference block's cycle of detection and action
	abstract RunCycle(): void;
}
