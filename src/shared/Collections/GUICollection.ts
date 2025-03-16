import { CollectionService } from "@rbxts/services";
import { Players } from "@rbxts/services";
import { Character, Skill } from "@rbxts/wcs";
import SkillBar from "shared/User Interface Classes/Classes/Panel Frames/SkillBar";
import ProgressBar from "shared/User Interface Classes/Classes/Assemblies/ProgressBar";
import GamePanel from "shared/User Interface Classes/Classes/Panel Frames/GamePanel";

/**
 * A singleton class that manages a collection of UI elements.
 * UIInstances will be instantiated and registered here.
 * This class provides methods to add, remove, and retrieve UI elements.
 * @example
 * const uiCollection = new GUICollection();
 * uiCollection.addElement('example', new UIElement());
 * const exampleElement = uiCollection.getElement('example');
 * uiCollection.removeElement('example');
 *
 * @singleton
 * @class GUICollection
 * @version 1.0
 * @author Nicholas Osto
 * @date 2025-05-15
 *
 */

const Tags = {
	SkillBar: "SkillBar",
	ProgressBar: "ProgressBar",
	MenuButton: "MenuButton",
	TargetFrame: "InfoFrame",
	CharacterFrame: "InfoFrame",
	CurrencyFrame: "CurrencyFrame",
	GamePanel: "GamePanel",
};

export default class GUICollection {
	/* Instance */
	private static _instance: GUICollection;
	private static _player = Players.LocalPlayer;
	private static _playerGui = this._player.WaitForChild("PlayerGui") as PlayerGui;

	/* Collection of UI elements */
	private static _uiElements: Map<string, unknown>;

	/* Connections */
	private static _gamePanelTagAdded: RBXScriptConnection | undefined;
	private static _connectionTagRemoved: RBXScriptConnection | undefined;

	/* Constructor */
	private constructor() {}

	/* Get Instance */
	public static GetInstance() {
		if (this._instance === undefined) {
			this._instance = new GUICollection();
			this._uiElements = new Map<string, unknown>();
			this._initializeCollection();
		}
		return this._instance;
	}

	private static _initializeCollection() {
		this._gamePanelTagAdded = CollectionService.GetInstanceAddedSignal(Tags.GamePanel).Connect((instance) => {
			if (instance.FindFirstAncestor("PlayerGui") === undefined) return;
			InitializeGamePanel(instance);
			warn("GamePanel added to GUICollection", instance);
		});
		this._connectionTagRemoved = CollectionService.GetInstanceRemovedSignal(Tags.GamePanel).Connect((instance) => {
			warn("GamePanel removed from GUICollection", instance);
		});
	}

	public static AddElement(key: string, element: unknown) {
		warn(`Adding element to GUICollection with key: ${key}`, element);
		this._uiElements.set(key, element);
	}

	public static RemoveElement(key: string) {
		warn(`Removing element from GUICollection with key: ${key}`);
		const element = this._uiElements.get(key) as GamePanel;
		if (element === undefined) return;
		element.disablePanel();
		element.Destroy();
		this._uiElements.delete(key);
	}

	public static GetElement(key: string): unknown {
		return this._uiElements.get(key);
	}
}

function InitializeGamePanel(instance: Instance) {
	const gamePanel = new GamePanel(instance.Name, instance.Name + "Panel");
	GUICollection.AddElement(instance.Name, gamePanel);
}