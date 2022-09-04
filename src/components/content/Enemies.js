export const enemies = {
	wild: {
		name: "Wild",
		pokemons: {},
	},
    rival: {
		name: "Rival",
		// first line of dialog : "You're my rival, aren't you?"
		// last line of dialog : "What? Unbelievable!"
		pokemons: {
			a: {
				pokemonId: "eevee",
				maxHp: 34,
				level: 4,
				// more...
			},
            b: {
				pokemonId: "eevee",
				maxHp: 44,
				level: 4,
				// more...
			},
		},
	},
	beth: {
		name: "Beth",
		pokemons: {
			a: {
				hp: 1,
				pokemonId: "eevee",
				maxHp: 90,
				level: 1,
			},
            b: {
				hp: 1,
				pokemonId: "eevee",
				maxHp: 90,
				level: 1,
			},
		},
	},
}