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
}
