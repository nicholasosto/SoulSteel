// Utility Imports
import Logger from "shared/Utility/Logger";
import KeyboardController from "client/Keyboard/Keyboard";
import { initializeTargetSelection } from "client/TargetSelector/TargetSelector";
import WcsClient from "./WCS Helpers/WCSClient";

// Enable Target Selection
initializeTargetSelection();

// Start the WCS Client
WcsClient.Start();

// Start the Keyboard Controller
KeyboardController.Start();
