import { Players, Workspace, UserInputService } from "@rbxts/services";
import Logger from "shared/Utility/Logger";
import { RemoteEvents } from "shared/net/Remotes";

/* Client Target Controller */
export default class ClientTargetController {
	private static _instance: ClientTargetController;
	private static _player: Player = Players.LocalPlayer;
	private static _camera = Workspace.CurrentCamera!;

	/* Remotes */
	private static _targetSelected = RemoteEvents.Client.Get("ClientUpdateTarget");

	/* Connections */
	private static _targetSelectedConnection: RBXScriptConnection | undefined;

	/* Constructor */
	private constructor() {
		Logger.Log("ClientTargetController", "CONSTRUCTOR()");
	}

	/* Start */
	public static Start() {
		if (this._instance === undefined) {
			this._instance = new ClientTargetController();
			this._initializeListeners();
			Logger.Log("ClientTargetController", "Initialized"); 
		}
	}

	/* Initialize Listeners */
	private static _initializeListeners() {
		/* #C2SRemote - Target Selected */
		this._targetSelectedConnection?.Disconnect();
		this._targetSelectedConnection = UserInputService.InputBegan.Connect((input, processed) => {
			if (processed) return;

			if (
				input.UserInputType === Enum.UserInputType.MouseButton1 ||
				input.UserInputType === Enum.UserInputType.Touch
			) {
				const target = this.getTargetFromScreenPosition(new Vector2(input.Position.X, input.Position.Y));
				if (target) {
					Logger.Log("Target selected: " + target.Name);
					this._targetSelected.SendToServer(target.GetFullName());
				} else {
					Logger.Log("No target selected.");
				}
			}
		});
	}

	/* Helper - Get Target From Screen Position */
	private static getTargetFromScreenPosition(screenPos: Vector2): Instance | undefined {
		const ray = this._camera.ScreenPointToRay(screenPos.X, screenPos.Y);
		const raycastParams = new RaycastParams();
		raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;

		//Exclude the local player's character from being selected.
		if (this._player.Character) {
			raycastParams.FilterDescendantsInstances = [this._player.Character];
		}

		const maxDistance = 500;
		const result = Workspace.Raycast(ray.Origin, ray.Direction.mul(maxDistance), raycastParams);
		if (result) {
			const resultParent = result.Instance?.Parent;
			if (resultParent?.HasTag("NPCCharacter")) {
				return resultParent;
			}
		}

		return undefined;
	}
}
