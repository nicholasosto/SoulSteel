// TargetSelector.ts
import { Players, Workspace, UserInputService } from "@rbxts/services";
import { Requests } from "shared/Remotes/ClientRemotes";
import Logger from "shared/Utility/Logger";

const localPlayer = Players.LocalPlayer;
const camera = Workspace.CurrentCamera!;

export function getTargetFromScreenPosition(screenPos: Vector2): Instance | undefined {
	const ray = camera.ScreenPointToRay(screenPos.X, screenPos.Y);
	const raycastParams = new RaycastParams();
	raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;

	// Exclude the local player's character from being selected.
	if (localPlayer.Character) {
		raycastParams.FilterDescendantsInstances = [localPlayer.Character];
	}

	const maxDistance = 500;
	const result = Workspace.Raycast(ray.Origin, ray.Direction.mul(maxDistance), raycastParams);
	if (result) {
		const resultParent = result.Instance?.Parent;
		if (resultParent?.HasTag("GameCharacter")) {
			return resultParent;
		}
	}

	return undefined;
}

export function initializeTargetSelection() {
	UserInputService.InputBegan.Connect((input, processed) => {
		if (processed) return;

		if (
			input.UserInputType === Enum.UserInputType.MouseButton1 ||
			input.UserInputType === Enum.UserInputType.Touch
		) {
			const target = getTargetFromScreenPosition(new Vector2(input.Position.X, input.Position.Y));
			if (target) {
				Logger.Log("Target selected: " + target.Name);
				Requests.TargetSelectionRequest.SendToServer(target.GetFullName());
				// Here you can perform additional actions such as highlighting the target or firing a remote event.
			} else {
				Logger.Log("No target selected.");
			}
		}
	});
}
