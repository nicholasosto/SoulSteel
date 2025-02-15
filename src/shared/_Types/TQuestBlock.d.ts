export type TQuestBlock = BasePart & {
	QuestId: StringValue;
	SurfaceGui: SurfaceGui & {
		TextLabel: TextLabel;
	};
};
