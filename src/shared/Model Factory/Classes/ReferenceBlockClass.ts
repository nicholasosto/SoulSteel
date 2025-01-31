import Logger from "shared/Utility/Logger";
import { TReferenceBlock } from "../References/ReferenceBlock";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { Debris, RunService } from "@rbxts/services";
import { generateCharacterName } from "shared/Factories/NameFactory";

export class ReferenceBlockClass {
	public BlockModel: TReferenceBlock;
	private _parent: Instance | undefined;

	// Run Cycle?
	private _connectionHeartbeat: RBXScriptConnection | undefined;
	private _spawnTime: number = -1;
	private _timeAlive: number = 0;
	private _timeSinceLastCycle: number = 0;

	constructor() {
		this._parent = game.Workspace;
		this.BlockModel = StorageManager.CloneFromStorage("ReferenceBlock") as TReferenceBlock;
		this.BlockModel.Parent = this._parent;

		// Check if the instance is nil
		assert(this.BlockModel, "Instance is nil");

		// Generate a name for the block
		this.BlockModel.Name = generateCharacterName();

		// Log the creation of the block
		Logger.Log(script, "Created", this.BlockModel.Name);

		// Connect the heartbeat
		// this._connectionHeartbeat = RunService.Heartbeat.Connect((deltaTime: number) => {
		// 	this._runCycle(deltaTime);
		// });
	}

	// Spawn the organism
	public MoveToLocation(position: Vector3) {
		this.BlockModel.PivotTo(new CFrame(position));
	}
	// Connect the heartbeat
	public ConnectRunService(runFunction: (deltaTime: number) => void) {
		this._connectionHeartbeat = RunService.Heartbeat.Connect(runFunction);
	}

	private _runCycle(delta_time: number, rate_per_second = 1) {
		this._timeSinceLastCycle += delta_time;
		this._timeAlive += delta_time;
		if (this._timeSinceLastCycle < 1 / rate_per_second) {
			return;
		}
		this._timeSinceLastCycle = 0;
		Logger.Log(script, "Running Cycle: ", this.BlockModel.Name, "time alive: " + this._timeAlive);
	}

	// Change the color of the organism
	public ChangeColor(color: Color3) {
		this.BlockModel.Color = color;
	}

	// Replicate the organism
	public Replicate() {
		assert(this._parent, "Parent is nil");
		const classCopy = new ReferenceBlockClass();
	}

	public Destroy() {
		this._connectionHeartbeat?.Disconnect();
		this.BlockModel.Destroy();
	}
	public AttachNewBlock(blockDirection: BlockDirection) {
		const newBlock = new ReferenceBlockClass();
		const offset = this.BlockModel.Size.X / 2;
		let position = this.BlockModel.Position;
		let attachment0 = this.BlockModel.RightConstraint.Attachment0;
		let attachment1 = this.BlockModel.RightConstraint.Attachment1;
		newBlock.BlockModel.Anchored = true;
		switch (blockDirection) {
			case BlockDirection.Right:
				position = position.add(new Vector3(offset, 0, 0));
				attachment0 = this.BlockModel.RightConstraint.Attachment0;
				attachment1 = this.BlockModel.RightConstraint.Attachment1;
				break;
			case BlockDirection.Left:
				position = position.add(new Vector3(-offset, 0, 0));
				attachment0 = this.BlockModel.LeftConstraint.Attachment0;
				attachment1 = this.BlockModel.LeftConstraint.Attachment1;
				break;
			case BlockDirection.Up:
				position = position.add(new Vector3(0, offset, 0));
				attachment0 = this.BlockModel.TopConstraint.Attachment0;
				attachment1 = this.BlockModel.TopConstraint.Attachment1;
				break;
			case BlockDirection.Down:
				position = position.add(new Vector3(0, -offset, 0));
				attachment0 = this.BlockModel.BottomConstraint.Attachment0;
				attachment1 = this.BlockModel.BottomConstraint.Attachment1;
				break;
			case BlockDirection.Forward:
				position = position.add(new Vector3(0, 0, offset));
				attachment0 = this.BlockModel.FrontConstraint.Attachment0;
				attachment1 = this.BlockModel.FrontConstraint.Attachment1;
				break;
			case BlockDirection.Backward:
				position = position.add(new Vector3(0, 0, -offset * 100));
				attachment0 = this.BlockModel.BackConstraint.Attachment0;
				attachment1 = this.BlockModel.BackConstraint.Attachment1;
				break;
		}
		newBlock.MoveToLocation(position);
		const newBlockModel = newBlock.BlockModel;
		newBlockModel.LeftConstraint.Attachment1 = attachment0;
		attachment1 = newBlockModel.LeftConstraint.Attachment0;
	}
}

export enum BlockDirection {
	Right,
	Left,
	Up,
	Down,
	Forward,
	Backward,
}
