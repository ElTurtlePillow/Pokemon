import mapDown from "../../../../../assets/graphics/maps/viridian_city/down.png";
import mapUp from "../../../../../assets/graphics/maps/viridian_city/up.png";
import { collisions, grass, bump } from './MapCollision';

import { asGridCoords, loadWall, withGrid, loadGrass, loadBump } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png";

import npcJImg from "../../../../../assets/graphics/characters/npcJ.png";
import npcGImg from "../../../../../assets/graphics/characters/npcG.png";
import npcIImg from "../../../../../assets/graphics/characters/npcI.png";
import npcWImg from "../../../../../assets/graphics/characters/npcW.png";
import npcXImg from "../../../../../assets/graphics/characters/npcX.png";
import npcYImg from "../../../../../assets/graphics/characters/npcY.png";
import npcZImg from "../../../../../assets/graphics/characters/npcZ.png";
import npc2Img from "../../../../../assets/graphics/characters/npc2.png";
import npcOImg from "../../../../../assets/graphics/characters/npcO.png";
import npcVImg from "../../../../../assets/graphics/characters/npcV.png";
import npc3Img from "../../../../../assets/graphics/characters/npc3.png";
import npc4Img from "../../../../../assets/graphics/characters/npc4.png";
import npcTeamRocketA from "../../../../../assets/graphics/characters/npcTeamRocketA.png";
import npcTeamRocketB from "../../../../../assets/graphics/characters/npcTeamRocketB.png";


import palletTownBg from "../../../../../assets/audio/background_music/PalletTown.ogg"
import pokeCenterMsc from "../../../../../assets/audio/background_music/PokeCenter.ogg"
import pokeMarketMsc from "../../../../../assets/audio/background_music/PokeMarket.ogg"
import ViridianForestBurning from "../../../../../assets/audio/background_music/ViridianForestBurning.ogg"

export const ViridianCity = {
    id: "ViridianCity",
    lowerSrc: mapDown,
    upperSrc: mapUp,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
            canRun: true,
        }),
        npcA: ({
            type: "Person",
            x: withGrid(14),
            y: withGrid(20),
            src: npcJImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "This is the Pokémon League Reception Gate.", facePlayer: "npcA" },
                        { type: "textMessage", text: "You need the 8 badges to continue.", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
        npcB: ({
            type: "Person",
            x: withGrid(50),
            y: withGrid(26),
            src: npcIImg,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 2200},
                { type: "walk", direction: "right"},
                { type: "stand", direction: "up", time: 3200},
                { type: "walk", direction: "left"},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Viridian Forest is burning!", facePlayer: "npcB" },
                        { type: "textMessage", text: "But i'm too afraid to go see.", facePlayer: "npcB" },
                    ]
                }
            ]
        }),
        npcC: ({
            type: "Person",
            x: withGrid(47),
            y: withGrid(50),
            src: npcWImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 2200},
                { type: "stand", direction: "right", time: 3200},
            ],
            talking : [
                {
                required: ["GET_RUNNING_SHOES"],
                events: [
                    { type: "textMessage", text: "These shoes look great on you.", facePlayer: "npcC"},
                ]
                },
                {
                    events: [
                        { type: "textMessage", text: "We live right here.", facePlayer: "npcC" },
                        { type: "textMessage", text: "My father donates his old shoes.", facePlayer: "npcC" },
                    ]
                }
            ]
        }),
        npcD: ({
            type: "Person",
            x: withGrid(25),
            y: withGrid(55),
            src: npcXImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 2200},
                { type: "stand", direction: "left", time: 3200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "This is the road for the pokemon league.", facePlayer: "npcD" },
                        { type: "textMessage", text: "Unfortunately a trainer stripped me!", facePlayer: "npcD" },
                    ]
                }
            ]
        }),
        npcE: ({
            type: "Person",
            x: withGrid(54),
            y: withGrid(71),
            src: npcZImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 2200},
                { type: "walk", direction: "right",},
                { type: "stand", direction: "right", time: 3200},
                { type: "walk", direction: "left",},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "The gym is closed.", facePlayer: "npcE" },
                        { type: "textMessage", text: "It's been a long time since we've seen the leader.", facePlayer: "npcE" },
                    ]
                }
            ]
        }),
        npcF: ({
            type: "Person",
            x: withGrid(69),
            y: withGrid(56),
            src: npc2Img,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 2200},
                { type: "walk", direction: "right",},
                { type: "stand", direction: "right", time: 3200},
                { type: "walk", direction: "up",},
                { type: "stand", direction: "up", time: 3200},
                { type: "walk", direction: "left",},
                { type: "stand", direction: "left", time: 3300},
                { type: "walk", direction: "down",},
                
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I hate him,", facePlayer: "npcF" },
                        { type: "textMessage", text: "But I wish I was as rich as Jiff Bosis.", facePlayer: "npcF" },
                    ]
                }
            ]
        }),
        npcG: ({
            type: "Person",
            x: withGrid(58),
            y: withGrid(21),
            src: npcOImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 2200},
                
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "The smoke is coming so far.", facePlayer: "npcG" },
                    ]
                }
            ]
        }),
        npcH: ({
            type: "Person",
            x: withGrid(58),
            y: withGrid(22),
            src: npcVImg,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 2200},
                
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "It smells burnt.", facePlayer: "npcH" },
                    ]
                }
            ]
        }),
        npcI: ({
            type: "Person",
            x: withGrid(47),
            y: withGrid(36),
            src: npc3Img,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 2200},
                
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "It is really impressive.", facePlayer: "npcI" },
                        { type: "textMessage", text: "All this fire...", facePlayer: "npcI" },
                    ]
                }
            ]
        }),
        npcJ: ({
            type: "Person",
            x: withGrid(34),
            y: withGrid(9),
            src: npc4Img,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 4444},
                { type: "stand", direction: "down", time: 4444},
                
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "What are they doing...", facePlayer: "npcJ" },
                    ]
                }
            ]
        }),
        npcK: ({
            type: "Person",
            x: withGrid(12),
            y: withGrid(30),
            src: npcGImg,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 4444},
                { type: "stand", direction: "down", time: 4444},
                
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I clearly don't have the level.", facePlayer: "npcK" },
                    ]
                }
            ]
        }),
        npcTeamRocketB: ({
            type: "Person",
            x: withGrid(55),
            y: withGrid(12),
            src: npcTeamRocketB,
            behaviorLoop: [
                { type: "stand", direction: "left", time: 4444},
                
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "It didn't go as planned at all...", facePlayer: "npcTeamRocketB" },
                        { type: "textMessage", text: "We are really sorry.", facePlayer: "npcTeamRocketB" },
                    ]
                }
            ]
        }),

        // trainers
        crazyLouis: ({
            type: "Person",
            x: withGrid(17),
            y: withGrid(52),
            src: npcYImg,
            behaviorLoop: [
                { type: "stand", direction: "left", time: 2200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I try to rob the passersby.", facePlayer: "crazyLouis" },
                    ]
                }
            ]
        }),
        teamRocketA: ({
            type: "Person",
            x: withGrid(30),
            y: withGrid(19),
            src: npcTeamRocketA,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 2200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "We didn't want the fire to spread like this!", facePlayer: "teamRocketA" },
                    ]
                }
            ]
        }),

        // objects
        gymDoor: ({
            type: "Person",
            x: withGrid(66),
            y: withGrid(48),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "The gym is closed."},
                    ]
                },
            ]
        }),
        signA: ({
            type: "Person",
            x: withGrid(55),
            y: withGrid(75),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Route 1."},
                    ]
                },
            ]
        }),
        signB: ({
            type: "Person",
            x: withGrid(47),
            y: withGrid(70),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Viridian City, the city of Evergreen."},
                    ]
                },
            ]
        }),
        signC: ({
            type: "Person",
            x: withGrid(47),
            y: withGrid(55),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Pokemon museum under construction."},
                    ]
                },
            ]
        }),
        signD: ({
            type: "Person",
            x: withGrid(62),
            y: withGrid(48),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Viridian City Gym."},
                    ]
                },
            ]
        }),
        signE: ({
            type: "Person",
            x: withGrid(18),
            y: withGrid(60),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Route 22."},
                    ]
                },
            ]
        }),
        signF: ({
            type: "Person",
            x: withGrid(16),
            y: withGrid(24),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Pokémon League Reception Gate."},
                    ]
                },
            ]
        }),
        signG: ({
            type: "Person",
            x: withGrid(47),
            y: withGrid(28),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Viridian Forest to the north, Diglett's Cave to the east."},
                    ]
                },
            ]
        }),
        signH: ({
            type: "Person",
            x: withGrid(51),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Viridian Forest."},
                    ]
                },
            ]
        }),
        signI: ({
            type: "Person",
            x: withGrid(62),
            y: withGrid(12),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Diglett's Cave."},
                    ]
                },
            ]
        }),
    },
    walls: loadWall(collisions),
    grass: loadGrass(grass),
    bump: loadBump(bump),
    cutsceneSpaces: {
        [asGridCoords(52, 75)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        soundEffect: "stairs",
                        changeMusic: palletTownBg,
                        x: withGrid(40),
                        y: withGrid(7),
                        direction: 'down',
                    },
                ]
            }
        ],
        [asGridCoords(54, 65)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianPokeCenterFirstFloor",
                        soundEffect: "doors",
                        changeMusic: pokeCenterMsc,
                        x: withGrid(18),
                        y: withGrid(24),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(65, 58)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianPokeMarket",
                        soundEffect: "doors",
                        changeMusic: pokeMarketMsc,
                        x: withGrid(14),
                        y: withGrid(19),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(53, 57)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianHouseOne",
                        soundEffect: "doors",
                        x: withGrid(15),
                        y: withGrid(19),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(54, 50)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianHouseTwo",
                        soundEffect: "doors",
                        x: withGrid(15),
                        y: withGrid(19),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(53, 10)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianForest",
                        soundEffect: "stairs",
                        changeMusic: ViridianForestBurning,
                        setFilter: "fire",
                        x: withGrid(28),
                        y: withGrid(49),
                        direction: 'up',
                    },
                ]
            }
        ],

        // trainers 
        [asGridCoords(16, 52)]: [
            {
                events: [
                    { type: "battleTeasing", who: "crazyLouis" },
                    { who: "player",type: "stand", direction: "right"},
                    { type: "textMessage", text: "You have way too much hope.", },
                    { type: "battle", enemyId: "crazyLouis" },

                    { type: "textMessage", text: "I underestimated you.", },
                    { type: "addStoryFlag", flag: "DEFEAT_CRAZY_LOUIS"},
                ]
            },
            {
                required: "//",
            },
            {
                nothing: "DEFEAT_CRAZY_LOUIS",
            },
        ],
        [asGridCoords(15, 52)]: [
            {
                events: [
                    { type: "battleTeasing", who: "crazyLouis" },
                    { who: "player",type: "stand", direction: "right"},
                    { who: "crazyLouis",type: "walk", direction: "left"},
                    { type: "textMessage", text: "You have way too much hope.", },
                    { type: "battle", enemyId: "crazyLouis" },

                    { type: "textMessage", text: "I underestimated you.", },
                    { type: "addStoryFlag", flag: "DEFEAT_CRAZY_LOUIS"},
                ]
            },
            {
                required: "//",
            },
            {
                nothing: "DEFEAT_CRAZY_LOUIS",
            },
        ],

        [asGridCoords(31, 19)]: [
            {
                events: [
                    { type: "battleTeasing", who: "teamRocketA" },
                    { who: "player",type: "stand", direction: "left"},
                    { type: "textMessage", text: "They told me not to let anyone pass.", },
                    { type: "battle", enemyId: "teamRocketA" },

                    { type: "textMessage", text: "We can no longer control the fire!", },
                    { type: "addStoryFlag", flag: "DEFEAT_TEAM_ROCKET_A"},
                ]
            },
            {
                required: "//",
            },
            {
                nothing: "DEFEAT_TEAM_ROCKET_A",
            },
        ],
        [asGridCoords(32, 19)]: [
            {
                events: [
                    { type: "battleTeasing", who: "teamRocketA" },
                    { who: "player",type: "stand", direction: "left"},
                    { who: "teamRocketA",type: "walk", direction: "right"},
                    { type: "textMessage", text: "They told me not to let anyone pass.", },
                    { type: "battle", enemyId: "teamRocketA" },

                    { type: "textMessage", text: "We can no longer control the fire!", },
                    { type: "addStoryFlag", flag: "DEFEAT_TEAM_ROCKET_A"},
                ]
            },
            {
                required: "//",
            },
            {
                nothing: "DEFEAT_TEAM_ROCKET_A",
            },
        ],
        [asGridCoords(33, 19)]: [
            {
                events: [
                    { type: "battleTeasing", who: "teamRocketA" },
                    { who: "player",type: "stand", direction: "left"},
                    { who: "teamRocketA",type: "walk", direction: "right"},
                    { who: "teamRocketA",type: "walk", direction: "right"},
                    { type: "textMessage", text: "They told me not to let anyone pass.", },
                    { type: "battle", enemyId: "teamRocketA" },

                    { type: "textMessage", text: "We can no longer control the fire!", },
                    { type: "addStoryFlag", flag: "DEFEAT_TEAM_ROCKET_A"},
                ]
            },
            {
                required: "//",
            },
            {
                nothing: "DEFEAT_TEAM_ROCKET_A",
            },
        ],
    }
}