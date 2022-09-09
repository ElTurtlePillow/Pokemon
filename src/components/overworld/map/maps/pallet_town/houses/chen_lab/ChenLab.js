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


// import musicBg from "./../../../../../../../assets/audio/background_music/PalletTownBurn.mp3"

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
                        { type: "textMessage", text: "Chen: Are you having fun?", facePlayer: "profChen"},
                    ]
                },
                {
                    events: [
                        { type: "textMessage", text: "Chen: What do you want?", facePlayer: "profChen" },
                        { type: "textMessage", text: "Green: I want you to give me a Pokemon." },
                        { type: "textMessage", text: "Chen: I only have one left!" },
                        { type: "textMessage", text: "Chen: Will you be nice with it?" },
                        { type: "textMessage", text: "Green: Yes, of course." },
                        { who: "profChen", type: "stand", direction: "right", time: 700},
                        { who: "profChen", type: "stand", direction: "left", time: 700},
                        { type: "textMessage", text: "Chen: Ok sure, you can take it.", facePlayer: "profChen" },
                        { type: "textMessage", text: "Green: Thank you grandpa." },
                        { type: "textMessage", text: "Green: I will try to raise it good." },
                        { who: "rival", type: "stand", direction: "right", time: 500},
                        { type: "textMessage", text: "Green: Sorry for you dude." },
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "right"},
                        { who: "rival", type: "walk", direction: "right"},
                        { who: "rival", type: "walk", direction: "right"},
                        { who: "rival", type: "walk", direction: "right"},
                        { who: "rival", type: "walk", direction: "right"},
                        { who: "rival", type: "stand", direction: "up", time: 400},
                        { who: "pokeballC", type: "stand", direction: "left"},
                        { who: "rival", type: "stand", direction: "up", time: 400},
                        
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "left"},
                        { who: "rival", type: "walk", direction: "left"},
                        { who: "rival", type: "walk", direction: "left"},
                        { who: "rival", type: "walk", direction: "left"},
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "stand", direction: "up", time: 700},
                        
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { type: "textMessage", text: "Chen: He is not a bad kid." },
                        { type: "textMessage", text: "Chen: He can be a little rowdy though." },
                        { type: "textMessage", text: "Chen: You are also here for a Pokemon right?" },
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { who: "rival", type: "walk", direction: "down"},
                        { type: "textMessage", text: "Chen: As you can see, I unfortunately gave away my last Pokemon." },
                        { type: "textMessage", text: "Chen: ..." },
                        { type: "textMessage", text: "Chen: I might have one slug which hangs around." },
                        
                        { who: "profChen", type: "walk", direction: "left"},
                        { who: "profChen", type: "walk", direction: "left"},
                        { who: "profChen", type: "walk", direction: "left"},
                        { who: "profChen", type: "walk", direction: "up"},
                        { who: "profChen", type: "stand", direction: "up", time: 1000},
                        { type: "textMessage", text: "Chen: Looks like it is." },
                        { who: "profChen", type: "walk", direction: "down"},
                        { who: "profChen", type: "walk", direction: "right"},
                        { who: "profChen", type: "walk", direction: "right"},
                        { who: "profChen", type: "walk", direction: "right"},
                        { who: "profChen", type: "stand", direction: "down", time: 1000},
                        { type: "textMessage", text: "Chen: You can take that!" },
                        
                        // get mimikyu
                        { type: "getPokemon", id:"dratini"},
                        { type: "addStoryFlag", flag: "DRATINI_JOIN_TEAM"},
                        { who: "profChen", type: "stand", direction: "down", time: 3500},
                        
                        
                        { type: "textMessage", text: "You get Dratini!" },
                        { type: "textMessage", text: "Chen: Go have fun with it." },


                        { type: "addStoryFlag", flag: "TALKED_TO_CHEN_FIRST_TIME"},
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
                        { type: "textMessage", text: "Green: Chen!" },
                        { type: "textMessage", text: "Green: Give me a Pokemon!" },
                    ]
                }
            ],
            isNotHere: "TALKED_TO_CHEN_FIRST_TIME",
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
            ],
            isNotHere: "TALKED_TO_CHEN_FIRST_TIME",
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
                        soundEffect: "doors",
                        x: withGrid(43),
                        y: withGrid(63),
                        direction: 'down',
                    },
                ]
            }
        ]
    }
}