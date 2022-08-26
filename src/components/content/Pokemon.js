// types
export const pokemonTypes = {
	normal: {
		Name: "Normal",
		InternalName: "NORMAL",
		Weaknesses: "FIGHTING",
		Immunities: "GHOST",
	},
	fighting: {
		Name: "Fighting",
		InternalName: "FIGHTING",
		Weaknesses: ["FLYING", "PSYCHIC", "FAIRY"],
		Resistances: ["ROCK", "BUG", "DARK"],
	},
	flying: {
		Name: "Flying",
		InternalName: "FLYING",
		Weaknesses: ["ROCK", "ELECTRIC", "ICE"],
		Resistances: ["FIGHTING", "BUG", "GRASS"],
		Immunities: "GROUND",
	},
	poison: {
		Name: "Poison",
		InternalName: "POISON",
		Weaknesses: ["GROUND", "PSYCHIC"],
		Resistances: ["FIGHTING", "POISON", "BUG", "GRASS", "FAIRY"],
	},
	ground: {
		Name: "Ground",
		InternalName: "GROUND",
		Weaknesses: ["WATER", "GRASS", "ICE"],
		Resistances: ["POISON", "ROCK"],
		Immunities: "ELECTRIC",
	},
	rock: {
		Name: "Rock",
		InternalName: "ROCK",
		Weaknesses: ["FIGHTING", "GROUND", "STEEL", "WATER", "GRASS"],
		Resistances: ["NORMAL", "FLYING", "POISON", "FIRE"],
	},
	bug: {
		Name: "Bug",
		InternalName: "BUG",
		Weaknesses: ["FLYING", "ROCK", "FIRE"],
		Resistances: ["FIGHTING", "GROUND", "GRASS"],
	},
	ghost: {
		Name: "Ghost",
		InternalName: "GHOST",
		Weaknesses: ["GHOST", "DARK"],
		Resistances: ["POISON", "BUG"],
		Immunities: ["NORMAL", "FIGHTING"],
	},
	steel: {
		Name: "Steel",
		InternalName: "STEEL",
		Weaknesses: ["FIGHTING", "GROUND", "FIRE"],
		Resistances: ["NORMAL", "FLYING", "ROCK", "BUG", "STEEL", "GRASS", "PSYCHIC", "ICE", "DRAGON", "FAIRY"],
		Immunities: "POISON",
	},
	fire: {
		Name: "Fire",
		InternalName: "FIRE",
		IsSpecialType: true,
		Weaknesses: ["GROUND", "ROCK", "WATER"],
		Resistances: ["BUG", "STEEL", "FIRE", "GRASS", "ICE", "FAIRY"],
	},
	water: {
		Name: "Water",
		InternalName: "WATER",
		IsSpecialType: true,
		Weaknesses: ["GRASS", "ELECTRIC"],
		Resistances: ["STEEL", "FIRE", "WATER", "ICE"],
	},
	grass: {
		Name: "Grass",
		InternalName: "GRASS",
		IsSpecialType: true,
		Weaknesses: ["FLYING", "POISON", "BUG", "FIRE", "ICE"],
		Resistances: ["GROUND", "WATER", "GRASS", "ELECTRIC"],
	},
	electric: {
		Name: "Electric",
		InternalName: "ELECTRIC",
		IsSpecialType: true,
		Weaknesses: "GROUND",
		Resistances: ["FLYING", "STEEL", "ELECTRIC"],
	},
	psychic: {
		Name: "Psychic",
		InternalName: "PSYCHIC",
		IsSpecialType: true,
		Weaknesses: ["BUG", "GHOST", "DARK"],
		Resistances: ["FIGHTING", "PSYCHIC"],
	},
	ice: {
		Name: "Ice",
		InternalName: "ICE",
		IsSpecialType: true,
		Weaknesses: ["FIGHTING", "ROCK", "STEEL", "FIRE"],
		Resistances: "ICE",
	},
	dragon: {
		Name: "Dragon",
		InternalName: "DRAGON",
		IsSpecialType: true,
		Weaknesses: ["ICE", "DRAGON", "FAIRY"],
		Resistances: ["FIRE", "WATER", "GRASS", "ELECTRIC"],
	},
	dark: {
		Name: "Dark",
		InternalName: "DARK",
		IsSpecialType: true,
		Weaknesses: ["FIGHTING", "BUG", "FAIRY"],
		Resistances: ["GHOST", "DARK"],
		Immunities: "PSYCHIC",
	},
	fairy: {
		Name: "Fairy",
		InternalName: "FAIRY",
		IsSpecialType: true,
		Weaknesses: ["POISON", "STEEL"],
		Resistances: ["FIGHTING", "BUG", "DARK"],
		Immunities: "DRAGON",
	},
};

// pokemon
export const pokemon = {
    pikachu: {
		Name: "Pikachu",
		InternalName: "PIKACHU",
		Type1: "ELECTRIC",
		BaseStats: [35, 55, 40, 90, 50, 50],
		GenderRate: "Female50Percent",
		GrowthRate: "Medium",
		BaseEXP: 112,
		EffortPoints: [0, 0, 0, 2, 0, 0],
		Rareness: 190,
		Happiness: 70,
		Abilities: "STATIC",
		HiddenAbility: "LIGHTNINGROD",
		Moves: [1, "TAILWHIP", 1, "THUNDER SHOCK", 5, "GROWL", 7, "PLAYNICE", 10, "QUICKATTACK", 13, "ELECTROBALL", 18, "THUNDER WAVE", 21, "FEINT", 23, "DOUBLETEAM", 26, "SPARK", 29, "NUZZLE", 34, "DISCHARGE", 37, "SLAM", 42, "THUNDER BOLT", 45, "AGILITY", 50, "WILDCHARGE", 53, "LIGHTSCREEN", 58, "THUNDER"],
		TutorMoves: ["ATTRACT", "BRICKBREAK", "CHARGEBEAM", "CONFIDE", "COVET", "DOUBLETEAM", "ECHOEDVOICE", "ELECTROWEB", "FACADE", "FLING", "FOCUSPUNCH", "FRUSTRATION", "GRASSKNOT", "HELPINGHAND", "HIDDENPOWER", "IRONTAIL", "KNOCKOFF", "LASERFOCUS", "LIGHTSCREEN", "MAGNETRISE", "PROTECT", "RAINDANCE", "REST", "RETURN", "ROCKSMASH", "ROUND", "SHOCKWAVE", "SIGNALBEAM", "SLEEPTALK", "SNORE", "STRENGTH", "SUBSTITUTE", "SWAGGER", "THUNDER", "THUNDER BOLT", "THUNDERPUNCH", "THUNDER WAVE", "TOXIC", "VOLTSWITCH", "VOLTTACKLE", "WILDCHARGE"],
		Compatibility: "Field",
		StepsToHatch: 2560,
		Height: 0.4,
		Weight: 6.0,
		Color: "Yellow",
		Shape: "Quadruped",
		Habitat: "Forest",
		Kind: "Mouse",
		// Pokedex : It stores electricity in the electric sacs on its cheeks. When it releases pent-up energy in a burst, the electric power is equal to a lightning bolt.
		Generation: 1,
		WildItemUncommon: "LIGHTBALL",
		BattlerPlayerX: -5,
		BattlerPlayerY: 0,
		BattlerEnemyX: 4,
		BattlerEnemyY: 14,
		BattlerShadowX: 0,
		BattlerShadowSize: 1,
		Evolutions: ["RAICHU", "Item", "THUNDER STONE"],
		Moves: ["THUNDERSHOCK", "SCRATCH"],
	},
    charmander: {
		Name: "Charmander",
		InternalName: "CHARMANDER",
		Type1: "FIRE",
		BaseStats: [39, 52, 43, 65, 60, 50],
		GenderRate: "FemaleOneEighth",
		GrowthRate: "Parabolic",
		BaseEXP: 62,
		EffortPoints: [0, 0, 0, 1, 0, 0],
		Rareness: 45,
		Happiness: 70,
		Abilities: "BLAZE",
		HiddenAbility: "SOLARPOWER",
		Moves: [1, "SCRATCH", 1, "GROWL", 7, "EMBER", 10, "SMOKESCREEN", 16, "DRAGONRAGE", 19, "SCARYFACE", 25, "FIREFANG", 28, "FLAMEBURST", 34, "SLASH", 37, "FLAMETHROWER", 43, "FIRESPIN", 46, "INFERNO"],
		TutorMoves: ["AERIALACE", "ATTRACT", "BRICKBREAK", "CONFIDE", "CUT", "DOUBLETEAM", "DRAGONCLAW", "DRAGONPULSE", "ECHOEDVOICE", "FACADE", "FIREBLAST", "FIREPLEDGE", "FIREPUNCH", "FLAMECHARGE", "FLAMETHROWER", "FLING", "FOCUSPUNCH", "FRUSTRATION", "HEATWAVE", "HIDDENPOWER", "IRONTAIL", "OVERHEAT", "POWERUPPUNCH", "PROTECT", "REST", "RETURN", "ROCKSLIDE", "ROCKSMASH", "ROCKTOMB", "ROUND", "SHADOWCLAW", "SLEEPTALK", "SNORE", "STRENGTH", "SUBSTITUTE", "SUNNYDAY", "SWAGGER", "SWORDSDANCE", "THUNDER PUNCH", "TOXIC", "WILLOWISP", "WORKUP"],
		EggMoves: ["AIRCUTTER", "ANCIENTPOWER", "BEATUP", "BELLYDRUM", "BITE", "COUNTER", "CRUNCH", "DRAGONDANCE", "DRAGONPULSE", "DRAGONRUSH", "FLAREBLITZ", "FOCUSPUNCH", "METALCLAW", "OUTRAGE"],
		Compatibility: ["Monster", "Dragon"],
		StepsToHatch: 5120,
		Height: 0.6,
		Weight: 8.5,
		Color: "Red",
		Shape: "BipedalTail",
		Habitat: "Mountain",
		Kind: "Lizard",
		// Pokedex : The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is happy, and blazes when it is enraged.
		Generation: 1,
		BattlerPlayerX: -6,
		BattlerPlayerY: 0,
		BattlerEnemyX: 4,
		BattlerEnemyY: 19,
		BattlerShadowX: 0,
		BattlerShadowSize: 1,
		Evolutions: ["CHARMELEON", "Level", 16],
		Moves: ["THUNDERSHOCK"],
	},
    eevee: {
		Name: "Eevee",
		InternalName: "EEVEE",
		Type1: "NORMAL",
		BaseStats: [55, 55, 50, 55, 45, 65],
		GenderRate: "FemaleOneEighth",
		GrowthRate: "Medium",
		BaseEXP: 65,
		EffortPoints: [0, 0, 0, 0, 0, 1],
		Rareness: 45,
		Happiness: 70,
		Abilities: ["RUNAWAY", "ADAPTABILITY"],
		HiddenAbility: "ANTICIPATION",
		Moves: [1, "COVET", 1, "HELPINGHAND", 1, "GROWL", 1, "TACKLE", 1, "TAILWHIP", 5, "SANDATTACK", 9, "BABYDOLLEYES", 13, "QUICKATTACK", 17, "BITE", 17, "SWIFT", 20, "REFRESH", 25, "TAKEDOWN", 29, "CHARM", 33, "BATONPASS", 37, "DOUBLEEDGE", 41, "LASTRESORT", 45, "TRUMPCARD"],
		TutorMoves: ["ATTRACT", "CONFIDE", "COVET", "DOUBLETEAM", "ECHOEDVOICE", "FACADE", "FRUSTRATION", "HEALBELL", "HELPINGHAND", "HIDDENPOWER", "HYPERVOICE", "IRONTAIL", "LASERFOCUS", "LASTRESORT", "PROTECT", "RAINDANCE", "REST", "RETURN", "ROUND", "SHADOWBALL", "SLEEPTALK", "SNORE", "SUBSTITUTE", "SUNNYDAY", "SWAGGER", "TOXIC", "WORKUP"],
		EggMoves: ["CAPTIVATE", "CHARM", "COVET", "CURSE", "DETECT", "ENDURE", "FAKETEARS", "FLAIL", "NATURALGIFT", "STOREDPOWER", "SYNCHRONOISE", "TICKLE", "WISH", "YAWN"],
		Compatibility: "Field",
		StepsToHatch: 8960,
		Height: 0.3,
		Weight: 6.5,
		Color: "Brown",
		Shape: "Quadruped",
		Habitat: "Urban",
		Kind: "Evolution",
		// Pokedex : An Eevee has an unstable genetic makeup that suddenly mutates due to its environment. Radiation from various stones causes this Pokémon to evolve.
		Generation: 1,
		BattlerPlayerX: -7,
		BattlerPlayerY: 0,
		BattlerEnemyX: 0,
		BattlerEnemyY: 20,
		BattlerShadowX: 0,
		BattlerShadowSize: 2,
		Evolutions: ["VAPOREON", "Item", "WATERSTONE", "JOLTEON", "Item", "THUNDER STONE", "FLAREON", "Item", "FIRESTONE", "LEAFEON", "Location", "28", "GLACEON", "Location", "34", "SYLVEON", "HappinessMoveType", "FAIRY", "ESPEON", "HappinessDay","UMBREON", "HappinessNight"],
		Moves: ["GROWL"],
	},
}