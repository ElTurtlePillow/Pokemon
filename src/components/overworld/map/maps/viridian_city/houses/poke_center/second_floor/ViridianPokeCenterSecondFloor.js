import mapDown from "../../../../../../../../assets/graphics/maps/pokemon_center/second_floor/down.png";
import mapUp from "../../../../../../../../assets/graphics/maps/pokemon_center/second_floor/up.png";
import { collisions } from '../../../../poke-center/second_floor/MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../../../../Utils';


import blank from "../../../../../../../../assets/graphics/characters/blank.png";
import npcNurse from "../../../../../../../../assets/graphics/characters/npcNurse.png";
import npcGImg from "../../../../../../../../assets/graphics/characters/npcG.png";
import npcNImg from "../../../../../../../../assets/graphics/characters/npcN.png";

export const ViridianPokeCenterSecondFloor = {
    id: "ViridianPokeCenterSecondFloor",
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
            x: withGrid(14),
            y: withGrid(18),
            src: blank,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "This service will be avaible soon.", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
        npcNurseA: ({
            type: "Person",
            x: withGrid(14),
            y: withGrid(17),
            src: npcNurse,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
        }),
        npcB: ({
            type: "Person",
            x: withGrid(22),
            y: withGrid(18),
            src: blank,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I don't think there is good or bad moment.", facePlayer: "npcB" },
                        { type: "textMessage", text: "I think that above all, life is about encounters.", facePlayer: "npcB" },
                    ]
                }
            ]
        }),
        npcNurseB: ({
            type: "Person",
            x: withGrid(22),
            y: withGrid(17),
            src: npcNurse,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
        }),
        npcC: ({
            type: "Person",
            x: withGrid(16),
            y: withGrid(23),
            src: npcGImg,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 4200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I've seen the biggest Drowzee of my life yesterday.", facePlayer: "npcC" },
                    ]
                }
            ]
        }),
        npcD: ({
            type: "Person",
            x: withGrid(23),
            y: withGrid(21),
            src: npcNImg,
            behaviorLoop: [
                { type: "walk", direction: "right"},
                { type: "walk", direction: "left"},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "There is no time!", facePlayer: "npcD" },
                    ]
                }
            ]
        }),
        computer: ({
            type: "Person",
            x: withGrid(17),
            y: withGrid(15),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "*Bip* *biiiip* *bip bip* *biiiiip*", facePlayer: "computer" },
                    ]
                }
            ]
        }),
        telA: ({
            type: "Person",
            x: withGrid(18),
            y: withGrid(15),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "We confirm that Viridian Forest is on fire.", facePlayer: "telA" },
                        { type: "textMessage", text: "We keep you informed.", facePlayer: "telA" },
                    ]
                }
            ]
        }),
        telB: ({
            type: "Person",
            x: withGrid(19),
            y: withGrid(15),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "We confirm that Viridian Forest is on fire.", facePlayer: "telA" },
                        { type: "textMessage", text: "We keep you informed.", facePlayer: "telA" },
                    ]
                }
            ]
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(11, 21)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianPokeCenterFirstFloor",
                        soundEffect: "stairs",
                        x: withGrid(12),
                        y: withGrid(21),
                        direction: 'right',
                    },
                ]
            }
        ],
    }
}