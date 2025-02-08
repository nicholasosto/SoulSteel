// Purpose: Factory class for creating models.
import StorageManager from "shared/Storage Manager/StorageManager";
import ReferenceBlock from "./Classes/ReferenceBlockClass";
import { TReferenceBlock } from "./References/ReferenceBlock";

export default class ModelFactory {
	// Reference Block
	public static ReferenceBlock(): ReferenceBlock {
		const referenceBlock = StorageManager.CloneFromStorage("ReferenceBlock") as TReferenceBlock;
		return new ReferenceBlock(referenceBlock);
	}
}
