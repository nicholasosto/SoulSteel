type TSlotAssignmentButton = ImageButton & {
	SlotId: NumberValue;
	ItemId: StringValue;
	TextValue: string;
};

interface ISlotAssignmentButton {
	Button: TSlotAssignmentButton;
	OnActivate: () => void;
}

export { TSlotAssignmentButton, ISlotAssignmentButton };
