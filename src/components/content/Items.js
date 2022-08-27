export const items = {
	POTION: {
		Name: "Potion",
        PluralName: "Potions",
		Description: "A spray-type medicine for wounds. It restores the HP of one Pokémon by just 20 points.",
        TargetType: "friendly",
		Success: [
			{
				type: "textMessage",
				text: "{CASTER} uses a {MOVE} !",
			},
			{
				type: "animation",
				animation: "POTION",
			},
			{
				type: "stateChange",
                recover: 20,
			},
            {
				type: "textMessage",
				text: "{CASTER} recovers HP !",
			},
		]
	},
    FULLHEAL: {
		Name: "Full Heal",
        PluralName: "Full Heals",
		Description: "A spray-type medicine. It heals all the status problems of a single Pokémon.",
        TargetType: "friendly",
		Success: [
			{
				type: "textMessage",
				text: "{CASTER} uses a {MOVE} !",
			},
			{
				type: "animation",
				animation: "FULLHEAL",
			},
			{
				type: "stateChange",
				statusHandler: null,
			},
            {
				type: "textMessage",
				text: "{CASTER} is ready to fight !",
			},
		]
	},
}
