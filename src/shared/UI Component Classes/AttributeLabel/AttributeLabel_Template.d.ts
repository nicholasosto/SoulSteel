export type AttributeLabel_Template = Frame & {
	UICorner: UICorner;
	AttributeName: TextLabel;
	AttributeValue: TextLabel & {
		UICorner: UICorner;
		UITextSizeConstraint: UITextSizeConstraint;
	};
	UIListLayout: UIListLayout;
};
