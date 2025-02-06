// Utility Imports
import Logger from "shared/Utility/Logger";

// Targeting
import { initializeTargetSelection } from "client/TargetSelector/TargetSelector";
initializeTargetSelection();
// WCS Imports
import WcsClient from "./WCS Helpers/WCSClient";
WcsClient.Start();
import { StarUI } from "./UI Controller/ClientUI";
StarUI();
// Controllers
import KeyboardController from "client/Keyboard/Keyboard";

// Start the Keyboard Controller

KeyboardController.Start();
