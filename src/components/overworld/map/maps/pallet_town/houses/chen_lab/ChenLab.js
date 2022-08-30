import mapDown from "./../../../../../../../assets/graphics/maps/pallet_town/houses/chen_lab/down.png";
import mapUp from "./../../../../../../../assets/graphics/maps/pallet_town/houses/chen_lab/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from './../../../../../../../Utils';


import blank from "./../../../../../../../assets/graphics/characters/blank.png";

import npcE from "./../../../../../../../assets/graphics/characters/npcE.png"; // green girl
import npcF from "./../../../../../../../assets/graphics/characters/npcF.png"; // scientist
import profChen from "./../../../../../../../assets/graphics/characters/profChen.png";
import rival from "./../../../../../../../assets/graphics/characters/rival.png";

import pokeball from "./../../../../../../../assets/graphics/characters/item.png";

export const ChenLab = {
    id: "ChenLab",
    lowerSrc: mapDown,
    upperSrc: mapUp,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
        }),
        npcA: ({
            type: "Person",
            x: withGrid(13),
            y: withGrid(20),
            src: npcF,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1000},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I love professor Chen.", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
        npcB: ({
            type: "Person",
            x: withGrid(11),
            y: withGrid(19),
            src: npcE,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 4000},
                { type: "walk", direction: "right"},
                { type: "stand", direction: "up", time: 4400},
                { type: "walk", direction: "left"},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "There's so much knowledge here.", facePlayer: "npcB" },
                    ]
                }
            ]
        }),
        npcC: ({
            type: "Person",
            x: withGrid(21),
            y: withGrid(19),
            src: npcF,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1000},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "We have to learn more about Pokemon and their attributes.", facePlayer: "npcC" },
                    ]
                }
            ]
        }),
        profChen: ({
            type: "Person",
            x: withGrid(16),
            y: withGrid(11),
            src: profChen,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1000},
            ],
            talking : [
                {
                    required: ["TALKED_TO_CHEN_FIRST_TIME"],
                    events: [
                        { type: "textMessage", text: "You should come back later.", facePlayer: "profChen"},
                    ]
                },
                {
                    events: [
                        { type: "textMessage", text: "Chen: What do you want?", facePlayer: "profChen" },
                        // { type: "textMessage", text: "Jude: I would really like a Pokemon Grandpa.",  },
                        // { type: "textMessage", text: "Chen: I only have one left!" },
                        // { type: "textMessage", text: "Chen: Will you be nice with him?" },
                        // { type: "textMessage", text: "Jude: Of course!" },
                        // { who: "profChen", type: "stand", direction: "left", time: 700},
                        // { who: "profChen", type: "stand", direction: "right", time: 700},
                        // { type: "textMessage", text: "Chen: Ok sure, you can take him.", facePlayer: "profChen" },
                        // { type: "textMessage", text: "Jude: Thank you so much!" },
                        // { type: "textMessage", text: "Jude: I will do my best to raise him." },
                        // { who: "rival", type: "stand", direction: "right", time: 500},
                        // { type: "textMessage", text: "Jude: Sorry for you dude." },
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "right"},
                        // { who: "rival", type: "walk", direction: "right"},
                        // { who: "rival", type: "walk", direction: "right"},
                        // { who: "rival", type: "walk", direction: "right"},
                        // { who: "rival", type: "walk", direction: "right"},
                        // { who: "rival", type: "stand", direction: "up", time: 400},
                        // { who: "pokeballC", type: "stand", direction: "left"},
                        // { who: "rival", type: "stand", direction: "up", time: 400},
                        
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "left"},
                        // { who: "rival", type: "walk", direction: "left"},
                        // { who: "rival", type: "walk", direction: "left"},
                        // { who: "rival", type: "walk", direction: "left"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "stand", direction: "up", time: 700},
                        // { type: "textMessage", text: "Jude: Thank you Grandpa." },
                        
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { type: "textMessage", text: "Chen: He is not a bad kid." },
                        // { type: "textMessage", text: "Chen: Perhaps he has a bit too much of energy." },
                        // { type: "textMessage", text: "Chen: You are also here to take a Pokemon right?" },
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { who: "rival", type: "walk", direction: "down"},
                        // { type: "textMessage", text: "Chen: As you can see, I unfortunately give my last Pokemon." },
                        // { type: "textMessage", text: "Chen: You should come back later." },

                        
                        { 
                            type: "changeMap", 
                            map: "MomHouseFirstFloor",
                            x: withGrid(17),
                            y: withGrid(16),
                            direction: 'left',
                        },
                        
                        { type: "textMessage", text: "Mom: Well it's ok, you'll get yours in no time." },
                        { type: "textMessage", text: "Mom: I know it's not a good news but..." },
                        { type: "addStoryFlag", flag: "PALLET_TOWN_BURNING"},
                    ]
                }
            ]
        }),
        rival: ({
            type: "Person",
            x: withGrid(15),
            y: withGrid(12),
            src: rival,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 1000},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Jude: Gramps!" },
                        { type: "textMessage", text: "Jude: I want a Pokemon!" },
                    ]
                }
            ]
        }),
        pokeballC: ({
            type: "Person",
            x: withGrid(20),
            y: withGrid(12),
            src: pokeball,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "What's inside?"},
                    ]
                },
            ]
        }),
        computer: ({
            type: "Person",
            x: withGrid(12),
            y: withGrid(9),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: 'Some datas on Pokémons.'},
                    ]
                },
            ]
        }),
        degree: ({
            type: "Person",
            x: withGrid(16),
            y: withGrid(9),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: 'Pokemonology doctor.'},
                    ]
                },
            ]
        }),
        degree1: ({
            type: "Person",
            x: withGrid(17),
            y: withGrid(9),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: 'Brainstorm master.'},
                    ]
                },
            ]
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(16, 22)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        x: withGrid(21),
                        y: withGrid(19),
                        direction: 'down',
                    },
                ]
            }
        ]
    }
}