import Logger from "shared/Utility/Logger";
import { IReferenceBlock, TReferenceBlock } from "../References/ReferenceBlock";

import { Debris } from "@rbxts/services";
import { generateCharacterName } from "shared/Factories/NameFactory";

export default class ReferenceBlock implements IReferenceBlock {
	public Instance: TReferenceBlock;
	/* All required properties for the Reference Block */
	public RightConstraint: RigidConstraint;
	public BottomAttachment: Attachment;
	public BackBlock: ObjectValue;
	public BackAttachment: Attachment;
	public RightAttachment: Attachment;
	public FrontConstraint: RigidConstraint;
	public TopBlock: ObjectValue;
	public LeftAttachment: Attachment;
	public FrontAttachment: Attachment;
	public BottomBlock: ObjectValue;
	public FrontBlock: ObjectValue;
	public BackConstraint: RigidConstraint;
	public TopAttachment: Attachment;
	public BottomConstraint: RigidConstraint;
	public RightBlock: ObjectValue;
	public LeftBlock: ObjectValue;
	public TopConstraint: RigidConstraint;
	public LeftConstraint: RigidConstraint;

	// Add-on properties
	public Name: string = generateCharacterName();
	private _lifespan: number = 3600;

	constructor(referenceBlock: TReferenceBlock) {
		this.Instance = referenceBlock;
		this.RightConstraint = referenceBlock.RightConstraint;
		this.BottomAttachment = referenceBlock.BottomAttachment;
		this.BackBlock = referenceBlock.BackBlock;
		this.BackAttachment = referenceBlock.BackAttachment;
		this.RightAttachment = referenceBlock.RightAttachment;
		this.FrontConstraint = referenceBlock.FrontConstraint;
		this.TopBlock = referenceBlock.TopBlock;
		this.LeftAttachment = referenceBlock.LeftAttachment;
		this.FrontAttachment = referenceBlock.FrontAttachment;
		this.BottomBlock = referenceBlock.BottomBlock;
		this.FrontBlock = referenceBlock.FrontBlock;
		this.BackConstraint = referenceBlock.BackConstraint;
		this.TopAttachment = referenceBlock.TopAttachment;
		this.BottomConstraint = referenceBlock.BottomConstraint;
		this.RightBlock = referenceBlock.RightBlock;
		this.LeftBlock = referenceBlock.LeftBlock;
		this.TopConstraint = referenceBlock.TopConstraint;
		this.LeftConstraint = referenceBlock.LeftConstraint;
	}

	public Spawn(cframe: CFrame, parent: Instance) {
		this.Instance.Parent = parent;
		this.Instance.PivotTo(cframe);
		Debris.AddItem(this.Instance, this._lifespan);
	}

	public RunCycle() {
		Logger.Log("ReferenceBlock", "Running Cycle");
	}
}
