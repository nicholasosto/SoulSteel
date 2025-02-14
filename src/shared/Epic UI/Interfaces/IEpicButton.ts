export default interface IEpicButton {
	SetText(text: string): void;
	SetActive(active: boolean): void;
	SetVisible(visible: boolean): void;
	OnActivated: RBXScriptSignal;
}
