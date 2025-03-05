import Logger from "shared/Utility/Logger";
import { IReferenceBlock, TReferenceBlock } from "../References/ReferenceBlock";
import { TweenService } from "@rbxts/services";

import { Debris, RunService } from "@rbxts/services";
import { generateCharacterName } from "shared/_Factories/NameFactory";

// Tween Info
const tweenInfo = new TweenInfo(1, Enum.EasingStyle.Linear, Enum.EasingDirection.Out, 0, false, 0);

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
	private _cycle: number = 0;
	private _cycleInterval: number = 1;
	private _lastCycle: number = tick();
	private _heartbeat: RBXScriptConnection | undefined;

	// Tweens
	private _spinTween: Tween | undefined;

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

		this._spinTween = TweenService.Create(this.Instance, tweenInfo, {
			CFrame: this.Instance.CFrame.mul(CFrame.Angles(0, math.rad(90), 0)),
		});
	}

	public Spawn(cframe: CFrame, parent: Instance) {
		this._cycle = 0;

		this.Instance.Parent = parent;
		this.Instance.PivotTo(cframe);
		Debris.AddItem(this.Instance, this._lifespan);
		this._heartbeat?.Disconnect();
		this._heartbeat = RunService.Heartbeat.Connect(() => {
			if (tick() - this._lastCycle >= this._cycleInterval) {
				this._lastCycle = tick();
				this.RunCycle();
			}
		});
	}

	public RunCycle() {
		this._cycle++;
		Logger.Log(this.Instance, `Cycle: ${this._cycle}`);
		const choice = math.random();
		if (choice < 0.5) {
			this._replicate();
		} else {
			this._spin();
		}
	}

	private _replicate() {
		Logger.Log("ReferenceBlock", "Replicating");
	}

	private _spin() {
		Logger.Log(this.Instance, "Spinning");
		this._spinTween?.Play();
	}
}
