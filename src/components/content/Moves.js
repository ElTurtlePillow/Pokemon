export const moves = {
	SCRATCH: {
		Name: "Scratch",
		Description: "Hard, pointed, and sharp claws rake the target to inflict damage.",
		Accuracy: 100,
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
				damage: 35,
			},
			{
				type: "moveType",
				moveType: "NORMAL"
			}
		]
	},
	GROWL: {
		Name: "Growl",
		Description: "The user growls in an endearing way, making the foe less wary. The foe's Attack stat is lowered.",
		Accuracy: 100,
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
				statusHandler: {
					type: "low-atk",
					expiresIn: 3,
				},
			},
			{
				type: "moveType",
				moveType: "NORMAL"
			}
		]
	},
	TAILWHIP: {
		Name: "Tail Whip",
		Description: "The user wags its tail cutely, making opposing Pokémon less wary and lowering their Defense stat.",
		Accuracy: 90,
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
				statusHandler: {
					type: "low-def",
					expiresIn: 3,
				},
			},
			{
				type: "moveType",
				moveType: "NORMAL"
			}
		]
	},
	THUNDERSHOCK: {
		Name: "Thunder Shock",
		Description : "A jolt of electricity is hurled at the foe to inflict damage. It may also leave the target with paralysis.",
		Accuracy: 90,
		Success: [
			{
				type: "textMessage",
				text: "{CASTER} uses {MOVE} !",
			},
			{
				type: "animation",
				animation: "THUNDERSHOCK",
			},
			{
				type: "stateChange",
				damage: 30,
				statusHandler: {
					type: "par",
					expiresIn: 3,
				},
			},
			{
				type: "moveType",
				moveType: "ELECTRIC"
			}
		]
	}
}