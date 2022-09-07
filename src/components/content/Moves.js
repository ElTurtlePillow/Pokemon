export const moves = {
	SCRATCH: {
		Name: "Scratch",
		Description: "Hard, pointed, and sharp claws rake the target to inflict damage.",
		Accuracy: 100,
		MoveType: "NORMAL",
		Success: [
			{
				type: "textMessage",
				text: "{CASTER} uses {MOVE} !",
			},
			{
				type: "animation",
				animation: "SCRATCH",
			},
			{
				type: "stateChange",
				damage: 40,
			},
		]
	},
	GROWL: {
		Name: "Growl",
		Description: "The user growls in an endearing way, making the foe less wary. The foe's Attack stat is lowered.",
		Accuracy: 100,
		MoveType: "NORMAL",
		Success: [
			{
				type: "textMessage",
				text: "{CASTER} uses {MOVE} !",
			},
			{
				type: "animation",
				animation: "GROWL",
			},
			{
				type: "stateChange",
				statsHandler: {
					type: "low-atk",
					expiresIn: 99,
				},
			},
		]
	},
	TAILWHIP: {
		Name: "Tail Whip",
		Description: "The user wags its tail cutely, making opposing Pokémon less wary and lowering their Defense stat.",
		Accuracy: 90,
		MoveType: "NORMAL",
		Success: [
			{
				type: "textMessage",
				text: "{CASTER} uses {MOVE} !",
			},
			{
				type: "animation",
				animation: "TAILWHIP",
			},
			{
				type: "stateChange",
				statsHandler: {
					type: "low-def",
					expiresIn: 99,
				},
			}
		]
	},
	TACKLE : {
		Name: "Tackle",
		Description : "A physical attack in which the user charges and slams into the target with its whole body.",
		MoveType : "NORMAL",
		Accuracy: 100,
		Success: [
			{
				type: "textMessage",
				text: "{CASTER} uses {MOVE} !",
			},
			{
				type: "animation",
				animation: "TACKLE" , 
				color: "#db32a5"
			},
			{
				type: "stateChange",
				damage: 40,
			},
		]
	},
	THUNDERSHOCK: {
		Name: "Thunder Shock",
		Description : "A jolt of electricity is hurled to inflict damage. May leave the target with paralysis.",
		MoveType: "ELECTRIC",
		Accuracy: 90,
		// TargetType: "friendly",
		Success: [
			{
				type: "textMessage",
				text: "{CASTER} uses {MOVE} !",
			},
			{
				type: "animation",
				animation: "THUNDERSHOCK" , 
				color: "#db32a5"
			},
			{
				type: "stateChange",
				damage: 50,
			},
			{
				type: "stateChange",
				statusHandler: {
					type: "par",
					expiresIn: 3,
					probability: [false, false, true],
				},
				// onCaster: true
			},
		]
	}
}