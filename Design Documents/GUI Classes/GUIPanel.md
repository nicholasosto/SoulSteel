# GUIPanel

- Basic GUI Panel Object that contains a ```Title```, ```Close Button```, ```Main Container```
- Instance Object is a ScreenGUI

## Payload(s) and types

1. Payload is based on the panel type but contains all the necessary data to populate the panels GUI
    - ```SkillInfoPayload```
    - ```EquipmentInfoPayload```
2. Type: ```TGUIPanel```
    - ```CloseButton```: ```GUIButton```
    - ```TitleFrame```: ```Frame```

## Subclasses

1. ```NavigationBar``` - Manager using a ```Map<GUIButton, PanelContent>```
2. ```PanelContent``` - A Base class that is allowed in the PanelContainer
    - ```SkillInfoFrame```
    - ```EquipmentInfoFrame```

## Properties

1. ```Close```:```GUIButton``` - Sets the enabled property of the screenGUI
2. ```ChildContainer```: ```Frame``` - Frame object to hold child UI elements
3. ```NavigationContainer```: ```NavigationBar``` - Map Based GUI manager.
4. ```PayloadData```: ```<TPanelPayload>``` - Stores payload data for update methods

## Methods

1. ```constructor(tGuiPanel)```: takes in a TGuiPanel compatible object.
2. ```Update(payload: <TPanelPayload>)```: Sets the ```PayloadData``` and calls private methods
3. Enable: Sets Enabled to true
4. Disable: Sets Enabled to false

