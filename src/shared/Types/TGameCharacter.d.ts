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
