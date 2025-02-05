// Utility Imports
import Logger from "shared/Utility/Logger";
// WCS Imports
import WcsClient from "./WCS Helpers/WCSClient";
WcsClient.Start();
import { StarUI } from "./UI Controller/ClientUI";
StarUI();
// Controllers
import KeyboardController from "client/Keyboard/Keyboard";

// Start the Keyboard Controller

KeyboardController.Start();
