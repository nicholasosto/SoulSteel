export type TGameCharacter = Model & {
	LeftLowerArm: MeshPart & {
		LeftLowerArm: WrapTarget;
		OriginalSize: Vector3Value;
		LeftElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftElbow: Motor6D;
		AvatarPartScaleType: StringValue;
		LeftWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	LeftFoot: MeshPart & {
		LeftFoot: WrapTarget;
		LeftAnkle: Motor6D;
		AvatarPartScaleType: StringValue;
		OriginalSize: Vector3Value;
		LeftAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftFootAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	RightHand: MeshPart & {
		RightGripAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightWrist: Motor6D;
		RightWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightHand: WrapTarget;
		OriginalSize: Vector3Value;
		AvatarPartScaleType: StringValue;
	};
	HumanoidRootPart: Part & {
		RootRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		RootAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	Shirt: Shirt;
	Pants: Pants;
	RightLowerLeg: MeshPart & {
		RightAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		RightKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightLowerLeg: WrapTarget;
		RightKnee: Motor6D;
		AvatarPartScaleType: StringValue;
	};
	InitialPoses: Folder & {
		LeftUpperLeg_Composited: CFrameValue;
		LeftUpperLeg_Initial: CFrameValue;
		RightLowerLeg_Initial: CFrameValue;
		LeftFoot_Original: CFrameValue;
		LeftUpperLeg_Original: CFrameValue;
		LeftHand_Composited: CFrameValue;
		RightLowerArm_Initial: CFrameValue;
		RightFoot_Original: CFrameValue;
		RightUpperArm_Initial: CFrameValue;
		LeftUpperArm_Composited: CFrameValue;
		UpperTorso_Composited: CFrameValue;
		RightHand_Original: CFrameValue;
		LeftLowerLeg_Original: CFrameValue;
		RightHand_Initial: CFrameValue;
		UpperTorso_Original: CFrameValue;
		LowerTorso_Composited: CFrameValue;
		LeftFoot_Initial: CFrameValue;
		LeftLowerArm_Original: CFrameValue;
		RightUpperArm_Composited: CFrameValue;
		LeftHand_Original: CFrameValue;
		UpperTorso_Initial: CFrameValue;
		Head_Initial: CFrameValue;
		RightFoot_Initial: CFrameValue;
		RightFoot_Composited: CFrameValue;
		LowerTorso_Initial: CFrameValue;
		RightHand_Composited: CFrameValue;
		LeftUpperArm_Initial: CFrameValue;
		RightLowerLeg_Original: CFrameValue;
		LeftUpperArm_Original: CFrameValue;
		RightUpperLeg_Original: CFrameValue;
		RightUpperLeg_Initial: CFrameValue;
		RightUpperLeg_Composited: CFrameValue;
		LeftLowerArm_Composited: CFrameValue;
		Head_Composited: CFrameValue;
		LeftLowerLeg_Composited: CFrameValue;
		Head_Original: CFrameValue;
		LeftLowerArm_Initial: CFrameValue;
		LowerTorso_Original: CFrameValue;
		LeftLowerLeg_Initial: CFrameValue;
		RightUpperArm_Original: CFrameValue;
		RightLowerLeg_Composited: CFrameValue;
		RightLowerArm_Composited: CFrameValue;
		RightLowerArm_Original: CFrameValue;
		LeftHand_Initial: CFrameValue;
		LeftFoot_Composited: CFrameValue;
	};
	LeftLowerLeg: MeshPart & {
		LeftKnee: Motor6D;
		OriginalSize: Vector3Value;
		AvatarPartScaleType: StringValue;
		LeftKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftLowerLeg: WrapTarget;
	};
	LowerTorso: MeshPart & {
		WaistCenterAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		Root: Motor6D;
		OriginalSize: Vector3Value;
		AvatarPartScaleType: StringValue;
		RootRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		WaistBackAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		WaistRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LowerTorso: WrapTarget;
		WaistFrontAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	Head: MeshPart & {
		HatAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		NeckRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		FaceFrontAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		face: Decal;
		HairAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		Neck: Motor6D;
		Head: WrapTarget;
		FaceCenterAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	["Body Colors"]: BodyColors;
	UpperTorso: MeshPart & {
		LeftShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		BodyBackAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		NeckRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		Waist: Motor6D;
		OriginalSize: Vector3Value;
		AvatarPartScaleType: StringValue;
		LeftCollarAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightCollarAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		BodyFrontAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		WaistRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		UpperTorso: WrapTarget;
		NeckAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	["Son Guko 1  Face"]: Accessory & {
		Handle: MeshPart & {
			FaceCenterAttachment: Attachment;
			OriginalSize: Vector3Value;
			AvatarPartScaleType: StringValue;
		};
	};
	["Instinctive Son Hair"]: Accessory & {
		Handle: MeshPart & {
			HairAttachment: Attachment;
			OriginalSize: Vector3Value;
			AvatarPartScaleType: StringValue;
		};
	};
	LeftUpperArm: MeshPart & {
		LeftUpperArm: WrapTarget;
		OriginalSize: Vector3Value;
		LeftShoulderAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftShoulder: Motor6D;
		LeftShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		AvatarPartScaleType: StringValue;
	};
	RightLowerArm: MeshPart & {
		RightLowerArm: WrapTarget;
		OriginalSize: Vector3Value;
		RightElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightElbow: Motor6D;
		AvatarPartScaleType: StringValue;
	};
	LeftHand: MeshPart & {
		LeftHand: WrapTarget;
		OriginalSize: Vector3Value;
		LeftWrist: Motor6D;
		LeftGripAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		AvatarPartScaleType: StringValue;
		LeftWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	RightFoot: MeshPart & {
		RightAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		RightAnkle: Motor6D;
		RightFootAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightFoot: WrapTarget;
		AvatarPartScaleType: StringValue;
	};
	Humanoid: Humanoid & {
		BodyDepthScale: NumberValue;
		BodyHeightScale: NumberValue;
		BodyTypeScale: NumberValue;
		BodyProportionScale: NumberValue;
		Animator: Animator;
		BodyWidthScale: NumberValue;
		HumanoidDescription: HumanoidDescription;
		HeadScale: NumberValue;
	};
	RightUpperArm: MeshPart & {
		RightShoulder: Motor6D;
		RightUpperArm: WrapTarget;
		RightElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		RightShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightShoulderAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		AvatarPartScaleType: StringValue;
	};
	RightUpperLeg: MeshPart & {
		OriginalSize: Vector3Value;
		RightHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightHip: Motor6D;
		RightUpperLeg: WrapTarget;
		AvatarPartScaleType: StringValue;
	};
	LeftUpperLeg: MeshPart & {
		LeftHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftHip: Motor6D;
		AvatarPartScaleType: StringValue;
		OriginalSize: Vector3Value;
		LeftUpperLeg: WrapTarget;
		LeftKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
};
