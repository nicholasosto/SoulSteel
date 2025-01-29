import { Logger } from "shared/Utility/Logger";
import { TSkillPanel } from "./TSkillPanel";
import { SkillPanelState } from "./SkillPanelTypes";
import { PlayerSkillsData, SkillData } from "shared/Skills/Interfaces/SkillInterfaces";
import { SkillId } from "shared/Skills/Interfaces/SkillTypes";
import { getSkillDefinitionMap } from "shared/Skills/Data/SkillDefinitions";
import { StorageManager } from "shared/_References/Managers/StorageManager";
import { Character, Skill } from "@rbxts/wcs";
import { GridItemFrame } from "../GridItem/GridItemIndex";

import { SkillButton } from "./SkillButton";

export class SkillPanel {
	private screenGUI: TSkillPanel;
	private _stateValueObject: StringValue;
	private _scrollingFrame: ScrollingFrame;
	private _skillBar: Frame;
	private _slot1: Frame;
	private _slot2: Frame;
	private _slot3: Frame;
	private _slot4: Frame;
	private _slot5: Frame;
	private _skillDataMap = new Map<SkillId, SkillData>();
	private _assignedSkills: Array<SkillId | undefined> = [];
	private _skillButtonMap = new Map<SkillId, SkillButton>();
	private _stateChangedConnection: RBXScriptConnection | undefined;
	private _togglePanelConnection: RBXScriptConnection | undefined;
	private _selectedSkill: GridItemFrame | undefined;

	constructor(playerGui: Instance) {
		this.screenGUI = StorageManager.CloneFromStorage("SkillPanel_Template") as TSkillPanel;
		this.screenGUI.Name = "SkillPanel";
		this.screenGUI.Parent = playerGui;

		// Get references to the GUI elements
		this._stateValueObject = this.screenGUI.State;
		this._scrollingFrame = this.screenGUI.PanelContent.TopContent.Scroll_Parent.ScrollingFrame;
		this._skillBar = this.screenGUI.PanelContent.SkillBar_Frame;
		this._slot1 = this.screenGUI.PanelContent.SkillBar_Frame.Slot1;
		this._slot2 = this.screenGUI.PanelContent.SkillBar_Frame.Slot2;
		this._slot3 = this.screenGUI.PanelContent.SkillBar_Frame.Slot3;
		this._slot4 = this.screenGUI.PanelContent.SkillBar_Frame.Slot4;
		this._slot5 = this.screenGUI.PanelContent.SkillBar_Frame.Slot5;

		// Ensure references are valid
		assert(this.screenGUI, "Screen GUI is nil");
		assert(this._stateValueObject, "State Value Object is nil");
		assert(this._scrollingFrame, "Scrolling Frame is nil");
		assert(this._skillBar, "Skill Bar is nil");

		// Initialize connections
		this._InitializeConnections();

		// Set the initial state
		this.SetState("Loading");

		Logger.Log(script, "Skill Panel Created");

		this.LoadSkillGrid();
	}

	public LoadPlayerSkillData(wcsCharacter: Character, playerSkillData: PlayerSkillsData) {
		//this._skillDataMap = getSkillDataMap(playerSkillData);
		this._assignedSkills = playerSkillData.assignedSlots;
		Logger.Log(script, "Assigned Skills", this._assignedSkills as unknown as string);
		let skillIndex = 0;

		for (const skillId of this._assignedSkills) {
			let skillFrame = undefined;
			switch (skillIndex) {
				case 0:
					skillFrame = this._slot1;
					break;
				case 1:
					skillFrame = this._slot2;
					break;
				case 2:
					skillFrame = this._slot3;
					break;
				case 3:
					skillFrame = this._slot4;
					break;
				case 4:
					skillFrame = this._slot5;
					break;
			}
			skillIndex++;
			if (skillId !== undefined) {
				const skill = wcsCharacter.GetSkills().find((skill) => skill.GetName() === skillId);
				assert(skill, "Skill is nil");

				this._skillButtonMap.get(skillId as SkillId)?.Destroy();

				const skillButton = new SkillButton(skill as Skill, skillFrame as Frame);

				this._skillButtonMap.set(skillId as SkillId, skillButton);
				Logger.Log(script, "Skill Button Created", skillButton.Parent.Name);
			}
		}
	}

	public LoadSkillGrid() {
		// Load the skill grid
		const SkillDefinitions = getSkillDefinitionMap();
		for (const [skillId, skillDefinition] of SkillDefinitions) {
			const gridButton = StorageManager.CloneFromStorage("GridItem_Template") as GridItemFrame;
			gridButton.GridItemButton.Image = skillDefinition.icon;
			gridButton.Name = skillId;
			gridButton.Parent = this._scrollingFrame;
			gridButton.GridItemButton.Activated.Connect(() => {
				this._selectedSkill = gridButton;
				this.SetState("SkillSelected");
			});
		}
	}

	// State Machine
	public RunState(state: SkillPanelState) {
		switch (state) {
			case "Loading":
				this._LoadingState();
				break;
			case "Displayed":
				this._DisplayState();
				break;
			case "SkillSelected":
				this._SkillSelectedState();
				break;
			case "Hidden":
				this._HiddenState();
				break;
		}
	}

	// State Setter
	public SetState(state: SkillPanelState) {
		this._stateValueObject.Value = state;
	}

	private _InitializeConnections() {
		this._destroyConnections();
		// State Changed
		this._stateChangedConnection = this._stateValueObject.Changed.Connect((newState) => {
			Logger.Log(script, "State Changed", this._stateValueObject.Value);
			this.RunState(this._stateValueObject.Value as SkillPanelState);
		});

		// Toggle Panel
		this._togglePanelConnection = this.screenGUI.TogglePanel.Activated.Connect(() => {
			Logger.Log(script, "Toggle Panel");
			this._ToggleTopContent();
		});
	}

	private _ToggleTopContent() {
		switch (this._stateValueObject.Value as SkillPanelState) {
			case "Displayed":
				this.SetState("Hidden");
				break;
			case "SkillSelected":
				this.SetState("Hidden");
				break;
			default:
				this.SetState("Displayed");
				break;
		}
	}

	private _DisplayState() {
		this.screenGUI.PanelContent.TopContent.Scroll_Parent.Visible = true;
		this.screenGUI.PanelContent.TopContent.SkillInfo_Parent.Visible = false;
	}

	private _SkillSelectedState() {
		this.screenGUI.PanelContent.TopContent.Scroll_Parent.Visible = true;
		this.screenGUI.PanelContent.TopContent.SkillInfo_Parent.Visible = true;

	}

	private _HiddenState() {
		this.screenGUI.PanelContent.TopContent.Scroll_Parent.Visible = false;
		this.screenGUI.PanelContent.TopContent.SkillInfo_Parent.Visible = false;
	}

	private _LoadingState() {
		this.screenGUI.PanelContent.TopContent.Visible = false;
		this.screenGUI.PanelContent.TopContent.SkillInfo_Parent.Visible = false;
	}

	private _destroyConnections() {
		this._stateChangedConnection?.Disconnect();
		this._togglePanelConnection?.Disconnect();
	}
}
