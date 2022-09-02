import mapDown from "../../../../../assets/graphics/maps/pallet_town/down.png";
import mapUp from "../../../../../assets/graphics/maps/pallet_town/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png"

import npcAImg from "../../../../../assets/graphics/characters/npcA.png";
import npcCImg from "../../../../../assets/graphics/characters/npcC.png";
import npcDImg from "../../../../../assets/graphics/characters/npcD.png";
import npcGImg from "../../../../../assets/graphics/characters/npcG.png";

import mimikyu from "../../../../../assets/graphics/characters/mimikyu.png";

export const PalletTown = {
    id: "PalletTown",
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
            x: withGrid(42),
            y: withGrid(67),
            src: npcAImg,
            behaviorLoop: [
                { type: "stand", direction: "left", time: 1200},
                { type: "stand", direction: "right", time: 3000},
                { type: "walk", direction: "right"},
                { type: "stand", direction: "right", time: 2100},
                { type: "walk", direction: "down"},
                { type: "stand", direction: "down", time: 2300},
                { type: "walk", direction: "left"},
                { type: "stand", direction: "left", time: 3000},
                { type: "walk", direction: "up", time: 2700},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Smells weird, uh!", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
        npcC: ({
            type: "Person",
            x: withGrid(36),
            y: withGrid(64),
            src: npcCImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 3200},
                { type: "stand", direction: "left", time: 2100},
                { type: "stand", direction: "right", time: 2300},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I really like this town!", facePlayer: "npcC" },
                    ]
                }
            ]
        }),
        npcD: ({
            type: "Person",
            x: withGrid(41),
            y: withGrid(48),
            src: npcDImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1000},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Walking in tall grass is dangerous.", facePlayer: "npcD" },
                    ]
                }
            ],
            isNotHere: "TALKED_TO_CHEN_FIRST_TIME",
        }),
        mailBoxA: ({
            type: "Person",
            x: withGrid(32),
            y: withGrid(55),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Home of Martha and Red." },
                    ]
                },
            ]
        }),
        mailBoxB: ({
            type: "Person",
            x: withGrid(41),
            y: withGrid(55),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Cherry and Jude's house."},
                    ]
                },
            ]
        }),
        signA: ({
            type: "Person",
            x: withGrid(36),
            y: withGrid(60),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Pallet Town."},
                    ]
                },
            ]
        }),
        signB: ({
            type: "Person",
            x: withGrid(32),
            y: withGrid(63),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Mimosa garden."},
                    ]
                },
            ]
        }),
        signC: ({
            type: "Person",
            x: withGrid(44),
            y: withGrid(66),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Plowland looking for landscaper."},
                    ]
                },
            ]
        }),
        bully: ({
            type: "Person",
            initialX: withGrid(40),
            initialY: withGrid(46),
            src: npcGImg,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 1000},
            ],
            isNowHere: "TALKED_TO_CHEN_FIRST_TIME",
        }),
        mimikyu: ({
            type: "Person",
            initialX: withGrid(41),
            initialY: withGrid(46),
            src: mimikyu,
            behaviorLoop: [
                { type: "stand", direction: "left", time: 1000},
            ],
            isNowHere: "TALKED_TO_CHEN_FIRST_TIME",
        }),
        mimikyuA: ({
            type: "Person",
            initialX: withGrid(41),
            initialY: withGrid(46),
            src: mimikyu,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Mimikyu...", facePlayer: "mimikyuA" },
                    ]
                },
            ],
            behaviorLoop: [
                { type: "stand", direction: "left", time: 1000},
            ],
            isNowHere: "MIMIKYU_FIRST_KILL",
            isNotHere: "MIMIKYU_JOIN_TEAM"
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(34, 55)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "MomHouseFirstFloor",
                        soundEffect: "doors",
                        x: withGrid(13),
                        y: withGrid(19),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(43, 55)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "RivalHouse",
                        soundEffect: "doors",
                        x: withGrid(10),
                        y: withGrid(15),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(43, 62)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ChenLab",
                        soundEffect: "doors",
                        x: withGrid(16),
                        y: withGrid(21),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(40, 48)]: [
            {
                events: [
                    { who: "player", type: "stand", direction: "right"},
                    { who: "npcD", type: "walk", direction: "up"},
                    { who: "npcD", type: "walk", direction: "left"},
                    { who: "npcD", type: "stand", direction: "down"},
                    { who: "player", type: "stand", direction: "up"},
                    { type: "textMessage", text:"You should not go there without a Pokemon!"},
                    { who: "player", type: "walk", direction: "down"},
                    { who: "npcD", type: "walk", direction: "down"},
                    { who: "npcD", type: "walk", direction: "right"},
                    { who: "npcD", type: "stand", direction: "down"},
                ]
            },
            {
                required: ["TALKED_TO_CHEN_FIRST_TIME"],
                events: [
                    { type: "textMessage", text: "Ho someone kick you?" },
                    { type: "textMessage", text: "Haha of course, you are so ugly!" },
                    
                    { who: "mimikyu", type: "stand", direction: "down", time: 666},
                    { who: "mimikyu", type: "stand", direction: "left"},
                    { type: "textMessage", text: "Pokemon like you doesn't deserve to live." },
                    { type: "textMessage", text: "*Hit*" },
                    { who: "mimikyu", type: "stand", direction: "right"},
                    { type: "textMessage", text: "Haha sad little shit." },
                    
                    { who: "player", type: "walk", direction: "up"},
                    { who: "bully", type: "stand", direction: "down", time: 400},
                    { type: "textMessage", text: "What do you want?" },
                    { who: "bully", type: "stand", direction: "down", time: 600},
                    { type: "textMessage", text: "Save this Pokemon?" },
                    { who: "bully", type: "stand", direction: "down", time: 800},
                    { type: "textMessage", text: "You don't scare me!" },
                    { who: "mimikyu", type: "stand", direction: "left", time: 800},
                    { type: "textMessage", text: "MIMMIKYU!!!" },
                    
                    { type: "addStoryFlag", flag: "MIMIKYU_FIRST_KILL"},
                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        soundEffect: "mimikyuScream",
                        x: withGrid(40),
                        y: withGrid(47),
                        direction: 'up',
                    },
                ]
            },
            {
                nothing: "MIMIKYU_FIRST_KILL",
            },
            
        ],
        [asGridCoords(41, 48)]: [
            {
                events: [
                    { who: "player", type: "stand", direction: "right"},
                    { who: "npcD", type: "walk", direction: "up"},
                    { who: "npcD", type: "walk", direction: "left"},
                    { who: "npcD", type: "stand", direction: "down"},
                    { who: "player", type: "stand", direction: "up"},
                    { type: "textMessage", text:"You should not go there without a Pokemon!"},
                    { who: "player", type: "walk", direction: "down"},
                    { who: "npcD", type: "walk", direction: "down"},
                    { who: "npcD", type: "walk", direction: "right"},
                    { who: "npcD", type: "stand", direction: "down"},
                ]
            },
            {
                required: ["TALKED_TO_CHEN_FIRST_TIME"],
                events: [
                    { type: "textMessage", text: "Ho someone kick you?" },
                    { type: "textMessage", text: "Haha of course, you are so ugly!" },
                    
                    { who: "mimikyu", type: "stand", direction: "down", time: 666},
                    { who: "mimikyu", type: "stand", direction: "left"},
                    { type: "textMessage", text: "Pokemon like you doesn't deserve to live." },
                    { type: "textMessage", text: "*Hit*" },
                    { who: "mimikyu", type: "stand", direction: "right"},
                    { type: "textMessage", text: "Haha sad little shit." },
                    
                    { who: "player", type: "walk", direction: "up"},
                    { who: "bully", type: "stand", direction: "down", time: 400},
                    { type: "textMessage", text: "What do you want?" },
                    { who: "bully", type: "stand", direction: "down", time: 600},
                    { type: "textMessage", text: "Save this Pokemon?" },
                    { who: "bully", type: "stand", direction: "down", time: 800},
                    { type: "textMessage", text: "You don't scare me!" },
                    { who: "mimikyu", type: "stand", direction: "left", time: 800},
                    { type: "textMessage", text: "MIMMIKYU!!!" },
                    
                    { type: "addStoryFlag", flag: "MIMIKYU_FIRST_KILL"},
                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        soundEffect: "mimikyuScream",
                        x: withGrid(40),
                        y: withGrid(47),
                        direction: 'up',
                    },
                ]
            },
            {
                nothing: "MIMIKYU_FIRST_KILL",
            },
        ],
        [asGridCoords(40, 46)]: [
            {
                events: [
                    { who: "player", type: "stand", direction: "right", time: 444 },
                    { type: "textMessage", text: "Mimikyu..." },
                    { who: "player", type: "stand", direction: "right", time: 555 },

                    // get mimikyu
                    { type: "getPokemon", id:"mimikyu"},
                    { type: "addStoryFlag", flag: "MIMIKYU_JOIN_TEAM"},

                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        soundEffect: "mimikyuScream",
                        x: withGrid(40),
                        y: withGrid(46),
                        direction: 'right',
                    },
                ]
            },
            {
                nothing: "MIMIKYU_JOIN_TEAM",
            },
        ]
    }
}