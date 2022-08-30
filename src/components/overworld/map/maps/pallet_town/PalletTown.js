import mapDown from "../../../../../assets/graphics/maps/pallet_town/down.png";
import mapUp from "../../../../../assets/graphics/maps/pallet_town/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png"

import npcAImg from "../../../../../assets/graphics/characters/npcA.png";
import npcBImg from "../../../../../assets/graphics/characters/npcB.png";
import npcCImg from "../../../../../assets/graphics/characters/npcC.png";
import npcDImg from "../../../../../assets/graphics/characters/npcD.png";

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
            x: withGrid(20),
            y: withGrid(23),
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
                        { type: "textMessage", text: "Smells weird, uh !", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
        npcC: ({
            type: "Person",
            x: withGrid(12),
            y: withGrid(20),
            src: npcCImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 3200},
                { type: "stand", direction: "left", time: 2100},
                { type: "stand", direction: "right", time: 2300},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I really like this town !", facePlayer: "npcC" },
                    ]
                }
            ]
        }),
        npcD: ({
            type: "Person",
            x: withGrid(19),
            y: withGrid(4),
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
            ]
        }),
        mailBoxA: ({
            type: "Person",
            x: withGrid(10),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Home of YOU." },
                    ]
                },
            ]
        }),
        mailBoxB: ({
            type: "Person",
            x: withGrid(19),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "RIVAL's house."},
                    ]
                },
            ]
        }),
        signA: ({
            type: "Person",
            x: withGrid(14),
            y: withGrid(16),
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
            x: withGrid(10),
            y: withGrid(19),
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
            x: withGrid(22),
            y: withGrid(22),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Plowland looking for landscaper."},
                    ]
                },
            ]
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(12, 11)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "MomHouseFirstFloor",
                        x: withGrid(13),
                        y: withGrid(19),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(21, 11)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "RivalHouse",
                        x: withGrid(10),
                        y: withGrid(15),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(21, 18)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ChenLab",
                        x: withGrid(16),
                        y: withGrid(21),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(18, 4)]: [
            {
                events: [
                    { who: "player", type: "stand", direction: "right"},
                    { who: "npcD", type: "walk", direction: "up"},
                    { who: "npcD", type: "walk", direction: "left"},
                    { who: "npcD", type: "stand", direction: "down"},
                    { who: "player", type: "stand", direction: "up"},
                    { type: "textMessage", text:"You should not go there without a Pokemon !"},
                    { who: "player", type: "walk", direction: "down"},
                    { who: "npcD", type: "walk", direction: "down"},
                    { who: "npcD", type: "walk", direction: "right"},
                ]
            }
        ]
    }
}