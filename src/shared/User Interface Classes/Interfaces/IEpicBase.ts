export interface ITextAttribute {
	SetText(text: string): void;
}

export interface IBarPercentAttribute {
	SetBarByPercent(percent: number): void;
	SetBarByValue(current: number, max: number): void;
	GetBarPercent(): number;
	GetBarValue(): { current: number; max: number };
}

export interface IVisibleAttribute {
	SetVisible(visible: boolean): void;
	GetVisible(): boolean;
}
