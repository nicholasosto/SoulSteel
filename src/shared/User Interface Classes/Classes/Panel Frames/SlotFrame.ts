type TItemConfig = {
	ItemImageId: string;
	ItemDisplayName: string;
};

type TSlotFrame = Frame & {
	ItemImage: ImageLabel;
	ItemDisplayName: TextLabel;
};

export default class SlotFrame {
	private _slotFrame: Frame;

	constructor(slotFrame: Frame, itemConfig: Configuration) {
		this._slotFrame = slotFrame;
	}
}
