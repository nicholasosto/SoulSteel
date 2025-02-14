export default interface IProgressBar {
	frame: Frame;
	update(resourceId: string, current: number, max: number): void;
	setPercent(percent: number): void;
	setText(value: string): void;
	getPercent(): number;
	getText(): string;
}
