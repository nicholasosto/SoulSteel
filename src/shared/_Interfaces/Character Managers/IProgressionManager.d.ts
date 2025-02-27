export default interface IProgressionManager {
	OnLevelUp(): void;
	OnExperienceGained(experience: number): void;
}
