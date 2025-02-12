export type TAnimationPackage = Folder & {
	TakeDamage: Folder & {
		TakeDamage1: Animation;
	};
	Melee: Folder & {
		Kick_Left: Animation;
		Punch_Left: Animation;
		Punch_Right: Animation;
		Kick_Right: Animation;
	};
	Dodge: Folder & {
		Dodge3: Animation;
		Dodge2: Animation;
		Dodge1: Animation;
	};
	Casting: Folder & {
		FastHands: Animation;
	};
	Flight: Folder & {
		FlyBack: Animation;
		FlyRight: Animation;
		FlyIdle: Animation;
		FlyForward: Animation;
		FlyLeft: Animation;
	};
};
