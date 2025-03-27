import Fusion from "@rbxts/fusion";
import { PlayerClassVO, PlayerDisplayNameVO, PlayerCoreStatsVO } from "../PlayerDataObjects";

const { New, Children } = Fusion;

/* == Sizes == */
/* Main Container */
const mainFrameSize = new UDim2(0, 300, 0, 600);
const mainFramePosition = new UDim2(0.2, 0, 0.2, 0);
const mainFrameBackgroundColor = new Color3(0.82, 0.11, 0.11);
const mainFrameAnchorPoint = new Vector2(0, 0);


/* Container For Data Item Viewer */
const DataItemViewer = New("ScrollingFrame")({
	Size: mainFrameSize,
	Position: mainFramePosition,
	BackgroundColor3: mainFrameBackgroundColor,
	AnchorPoint: mainFrameAnchorPoint,
	BorderSizePixel: 0,
	ScrollBarThickness: 1,
	BackgroundTransparency: 0.5,
	[Children]: [
		New("UIListLayout")({
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, 5),
		}),
	],
});

export { DataItemViewer };
