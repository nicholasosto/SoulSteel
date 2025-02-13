import Logger from "shared/Utility/Logger";
import { Skill, SkillDecorator, Character } from "@rbxts/wcs";

@SkillDecorator
export class BasicMelee extends Skill {
	private _damageContainer = this.CreateDamageContainer(14);
	private _connectionHitbox: RBXScriptConnection | undefined;

	private projectile: Model | undefined;

	// Server-Side Start
	protected OnStartServer(): void {
		Logger.Log(script, "OnServerStart()");

		/* Hit Box */
		const hitbox = this.createHitbox();

		// Connect the Hitbox
		this._connectionHitbox?.Disconnect();
		this._connectionHitbox = hitbox.Touched.Connect((hit) => {
			const characterModel = hit?.Parent as Model;
			const wcsCharacter = Character.GetCharacterFromInstance(characterModel);
			if (wcsCharacter !== this.Character) {
				wcsCharacter?.TakeDamage(this._damageContainer);
				this._connectionHitbox?.Disconnect();

				this.projectile?.Destroy();
				hitbox.Destroy();
				return;
			}
		});
	}

	protected createHitbox(): Part {
		const hitbox = new Instance("Part");
		hitbox.Size = new Vector3(3, 3, 3);
		hitbox.Anchored = true;
		hitbox.CanCollide = false;
		hitbox.Material = Enum.Material.Neon;
		hitbox.BrickColor = new BrickColor("Bright red");
		hitbox.Parent = game.Workspace;

		const characterCFrame = (this.Character.Instance as Model).GetPivot();
		const offset = characterCFrame.mul(new CFrame(0, 0, -16));
		hitbox.PivotTo(offset);

		return hitbox;
	}
}
