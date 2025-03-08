import { generateCharacterName } from "shared/_Factories/NameFactory";
import CharacterSlot from "../../GUI_ComponentClasses/Frames/CharacterSlotComponent";

export default class StartScreenController {
	private static _instance: StartScreenController;
	private static screenGui: ScreenGui;
	private static test_slot: CharacterSlot;
	private _characterSlots: Array<CharacterSlot> = [];

	constructor(screenGui: ScreenGui) {
		StartScreenController.screenGui = screenGui;
		StartScreenController.test_slot = new CharacterSlot(
			screenGui
				.WaitForChild("ContainerFrame")
				.WaitForChild("CharacterListFrame")
				.FindFirstChild("CharacterSlot") as Frame,
		);

		StartScreenController.test_slot.SetCharacterName(generateCharacterName());
		StartScreenController.test_slot.SetDescription("This is a test description");
		StartScreenController.test_slot.SetProgressLevel(10);
	}
	public static Start(screenGui: ScreenGui) {
		if (this._instance === undefined) {
			this._instance = new StartScreenController(screenGui);
		}
	}
}
