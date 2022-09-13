import mapDown from "../../../../../assets/graphics/maps/pallet_town/down.png";
import mapUp from "../../../../../assets/graphics/maps/pallet_town/up.png";
import { collisions, grass, bump } from './MapCollision';

import { asGridCoords, loadWall, withGrid, loadGrass, loadBump } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png"

import npcAImg from "../../../../../assets/graphics/characters/npcA.png";
import npcCImg from "../../../../../assets/graphics/characters/npcC.png";
import npcDImg from "../../../../../assets/graphics/characters/npcD.png";
import npcGImg from "../../../../../assets/graphics/characters/npcG.png";

import npcHImg from "../../../../../assets/graphics/characters/npcH.png";
import npcIImg from "../../../../../assets/graphics/characters/npcI.png";
import rival from "./../../../../../assets/graphics/characters/rival.png";

import mimikyu from "../../../../../assets/graphics/characters/mimikyu-undesguised-elec.png";


import musicBg from "../../../../../assets/audio/background_music/ViridianCity.ogg"

export const PalletTown = {
    id: "PalletTown",
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
                        { type: "textMessage", text: "Team Rocket are the worst.", facePlayer: "npcA" },
                        { type: "textMessage", text: "I do what I want with my Pokemon.", facePlayer: "npcA" },
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
                        // { type: "battle", enemyId: "beth" },
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
                        { type: "textMessage", text: "Cherry and Green's house."},
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
        signE: ({
            type: "Person",
            x: withGrid(43),
            y: withGrid(6),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Viridian City."},
                    ]
                },
            ]
        }),
        bully: ({
            type: "Person",
            initialX: withGrid(40),
            initialY: withGrid(46),
            src: rival,
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
        bully1: ({
            type: "Person",
            initialX: withGrid(40),
            initialY: withGrid(46),
            src: rival,
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
            isNowHere: "MIMIKYU_FIRST_DISPARITIONs",
            isNotHere: "MIMIKYU_JOIN_TEAM"
        }),

        // route one 
        npcH: ({
            type: "Person",
            x: withGrid(34),
            y: withGrid(34),
            src: npcHImg,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 4000},
                { type: "walk", direction: "down"},
                { type: "stand", direction: "down", time: 3200},
                { type: "walk", direction: "up"},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "People are way meaner to pokemon now.", facePlayer: "npcH"},
                        { type: "textMessage", text: "I don't hunderstand why...", facePlayer: "npcH"},
                    ]
                },
            ]
        }),
        npcI: ({
            type: "Person",
            x: withGrid(46),
            y: withGrid(23),
            src: npcIImg,
            behaviorLoop: [
                { type: "stand", direction: "left", time: 3600},
                { type: "walk", direction: "right"},
                { type: "stand", direction: "right", time: 3300},
                { type: "walk", direction: "left"},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "It seems that the Team Rocket is destroying the Viridian Forest.", facePlayer: "npcI"},
                    ]
                },
            ]
        }),
        signD: ({
            type: "Person",
            x: withGrid(37),
            y: withGrid(38),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Route 1"},
                    ]
                },
            ]
        }),
    },
    walls: loadWall(collisions),
    grass: loadGrass(grass),
    bump: loadBump(bump),
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
                    { type: "textMessage", text: "Green: You really are an ugly Pokemon." },
                    { type: "textMessage", text: "Green: Pikachu use thunder-shock!" },
                    { who: "mimikyu", type: "stand", direction: "right", time: 1100},

                    
                    { who: "mimikyu", type: "stand", direction: "down", time: 1200},
                    { who: "mimikyu", type: "stand", direction: "left"},
                    { type: "textMessage", text: "Mimikyu..." },
                    { type: "textMessage", text: "Green: Pokemon like you doesn't deserve to live." },
                    { type: "textMessage", text: "Green: Haha sad little shit." },
                    
                    { who: "player", type: "walk", direction: "up"},
                    { who: "bully", type: "stand", direction: "down", time: 400},
                    { type: "textMessage", text: "Green: What do you want?" },
                    { who: "bully", type: "stand", direction: "down", time: 600},
                    { type: "textMessage", text: "Green: Save this Pokemon?" },
                    { who: "bully", type: "stand", direction: "down", time: 800},
                    { type: "textMessage", text: "Green: You don't scare me!" },
                     { type: "battle", enemyId: "rivalA" },



                    { type: "textMessage", text: "Mimikyu..." },
                    { who: "mimikyu", type: "walk", direction: "up"},
                    { who: "mimikyu", type: "walk", direction: "up"},
                    { who: "mimikyu", type: "walk", direction: "up"},
                    { who: "mimikyu", type: "stand", direction: "down", time: 800},
                    { who: "mimikyu", type: "walk", direction: "up"},
                    { who: "mimikyu", type: "walk", direction: "up"},

                    
                    { type: "textMessage", text: "Green: Look at it! He get away like a coward!", },
                    { type: "textMessage", text: "Green: You won't be so lucky next time.", },
                    
                    { type: "addStoryFlag", flag: "MIMIKYU_FIRST_DISPARITION"},
                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        sound: "run",
                        x: withGrid(40),
                        y: withGrid(47),
                        direction: 'up',
                    },
                ]
            },
            {
                nothing: "MIMIKYU_FIRST_DISPARITION",
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
                    { type: "textMessage", text: "Green: You really are an ugly Pokemon." },
                    { type: "textMessage", text: "Green: Pikachu use thunder-shock!" },
                    { who: "mimikyu", type: "stand", direction: "right", time: 1100},

                    
                    { who: "mimikyu", type: "stand", direction: "down", time: 1200},
                    { who: "mimikyu", type: "stand", direction: "left"},
                    { type: "textMessage", text: "Green: Pokemon like you doesn't deserve to live." },
                    { type: "textMessage", text: "Green: Haha sad little shit." },
                    
                    { who: "player", type: "walk", direction: "up"},
                    { who: "player", type: "walk", direction: "left"},
                    { who: "player", type: "stand", direction: "up", time: 400},
                    { who: "bully", type: "stand", direction: "down", time: 400},
                    { type: "textMessage", text: "Green: What do you want?" },
                    { who: "bully", type: "stand", direction: "down", time: 600},
                    { type: "textMessage", text: "Green: Save this Pokemon?" },
                    { who: "bully", type: "stand", direction: "down", time: 800},
                    { type: "textMessage", text: "Green: You don't scare me!" },
                     { type: "battle", enemyId: "rivalA" },



                    { type: "textMessage", text: "Mimikyu..." },
                    { who: "mimikyu", type: "walk", direction: "up"},
                    { who: "mimikyu", type: "walk", direction: "up"},
                    { who: "mimikyu", type: "walk", direction: "up"},
                    { who: "mimikyu", type: "stand", direction: "down", time: 800},
                    { who: "mimikyu", type: "walk", direction: "up"},
                    { who: "mimikyu", type: "walk", direction: "up"},

                    
                    { type: "textMessage", text: "Green: Look at it! He get away like a coward!", },
                    { type: "textMessage", text: "Green: You won't be so lucky next time.", },
                    
                    { type: "addStoryFlag", flag: "MIMIKYU_FIRST_DISPARITION"},
                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        sound: "run",
                        x: withGrid(40),
                        y: withGrid(47),
                        direction: 'up',
                    },
                ]
            },
            {
                nothing: "MIMIKYU_FIRST_DISPARITION",
            },
        ],
        // [asGridCoords(40, 46)]: [
        //     {
        //         events: [
        //             { who: "player", type: "stand", direction: "right", time: 444 },
        //             { type: "textMessage", text: "Mimikyu..." },
        //             { who: "player", type: "stand", direction: "right", time: 555 },

        //             // get mimikyu
        //             { type: "getPokemon", id:"mimikyu"},
        //             { type: "addStoryFlag", flag: "MIMIKYU_JOIN_TEAM"},

        //             { 
        //                 type: "changeMap", 
        //                 map: "PalletTown",
        //                 soundEffect: "getpkmn",
        //                 x: withGrid(40),
        //                 y: withGrid(46),
        //                 direction: 'right',
        //             },
                    
        //             { type: "textMessage", text: "Mimikyu just join your team!" },
        //             { type: "textMessage", text: "Be nice with Mimikyu." },
        //         ]
        //     },
        //     {
        //         required: ["//"],
        //     },
        //     {
        //         nothing: "MIMIKYU_JOIN_TEAM",
        //     },
        // ],
        // route 1 to 
        [asGridCoords(40, 6)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianCity",
                        soundEffect: "stairs",
                        changeMusic: musicBg,
                        x: withGrid(52),
                        y: withGrid(74),
                        direction: 'up',
                    },
                ]
            }
        ]
    }
}