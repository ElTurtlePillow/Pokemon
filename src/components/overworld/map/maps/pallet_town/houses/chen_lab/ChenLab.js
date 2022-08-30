import mapDown from "./../../../../../../../assets/graphics/maps/pallet_town/houses/chen_lab/down.png";
import mapUp from "./../../../../../../../assets/graphics/maps/pallet_town/houses/chen_lab/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from './../../../../../../../Utils';


import blank from "./../../../../../../../assets/graphics/characters/blank.png";

import npcE from "./../../../../../../../assets/graphics/characters/npcE.png"; // green girl
import npcF from "./../../../../../../../assets/graphics/characters/npcF.png"; // scientist
import profChen from "./../../../../../../../assets/graphics/characters/profChen.png";
import rival from "./../../../../../../../assets/graphics/characters/rival.png";


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
            x: withGrid(12),
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
                { type: "stand", direction: "down", time: 10000},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I'm chen", facePlayer: "profChen" },
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
                { type: "stand", direction: "up", time: 10000},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I'm rival", facePlayer: "rival" },
                    ]
                }
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