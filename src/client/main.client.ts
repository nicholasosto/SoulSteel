// Utility Imports
import Logger from "shared/Utility/Logger";

// Targeting
import { initializeTargetSelection } from "client/TargetSelector/TargetSelector";
initializeTargetSelection();
// WCS Imports
import WcsClient from "./WCS Helpers/WCSClient";
WcsClient.Start();

// Controllers
import KeyboardController from "client/Keyboard/Keyboard";

// Start the Keyboard Controller

KeyboardController.Start();
