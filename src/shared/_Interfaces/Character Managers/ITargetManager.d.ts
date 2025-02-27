import IGameCharacter from "shared/_Interfaces/IGameCharacter";

export default interface ITargetManager {
	GetTarget(): IGameCharacter | undefined;
	OnTargetSelected(target: IGameCharacter): void;
	OnTargetDeselected(): void;
}
