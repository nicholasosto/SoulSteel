export type TDialog = Frame & {
	Close: Frame & {
		ImageButton: ImageButton;
	};
	Content: Frame & {
		Body: Frame & {
			Text: Frame & {
				TextLabel: TextLabel & {
					UITextSizeConstraint: UITextSizeConstraint;
				};
			};
		};
		Header: Frame & {
			Title: Frame;
		};
		Footer: Frame & {
			TextButton1: TextButton;
			TextButton2: TextButton;
		};
	};
};
