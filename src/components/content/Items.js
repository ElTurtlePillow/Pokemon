export const items = {
	POTION: {
		Name: "Potion",
        PluralName: "Potions",
		Description: "A spray-type medicine for wounds. It restores the HP of one Pokémon by just 20 points.",
        TargetType: "friendly",
		Price : 100,
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
		Name: "FullHeal",
        PluralName: "Full Heals",
		Description: "A spray-type medicine. It heals all the status problems of a single Pokémon.",
        TargetType: "friendly",
		Price : 400,
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
	ANTIDOTE: {
		Name: "Antidote",
        PluralName: "Antidotes",
		Description: "A spray-type medicine. It lifts the effect of poison from one Pokémon.",
        TargetType: "friendly",
		Price : 200,
		Success: [
			{
				type: "textMessage",
				text: "{CASTER} uses a {MOVE} !",
			},
			{
				type: "animation",
				animation: "ANTIDOTE",
			},
			{
				type: "stateChange",
				// just for poison
				statusHandler: null,
			},
            {
				type: "textMessage",
				text: "{CASTER} is no longer poisoned.",
			},
		]
	},
	PARALYZEHEAL: {
		Name: "ParalyzeHeal",
        PluralName: "Paralyze Heals",
		Description: "A spray-type medicine. It eliminates paralysis from a single Pokémon.",
        TargetType: "friendly",
		Price : 200,
		Success: [
			{
				type: "textMessage",
				text: "{CASTER} uses a {MOVE} !",
			},
			{
				type: "animation",
				animation: "PARALYZEHEAL",
			},
			{
				type: "stateChange",
				// just for para
				statusHandler: null,
			},
            {
				type: "textMessage",
				text: "{CASTER} is no longer paralyzed.",
			},
		]
	},
}
