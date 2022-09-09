import mapDown from "../../../../../../../../assets/graphics/maps/pokemon_center/first_floor/down.png";
import mapUp from "../../../../../../../../assets/graphics/maps/pokemon_center/first_floor/up.png";
import { collisions } from '../../../../poke-center/first_floor/MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../../../../Utils';


import blank from "../../../../../../../../assets/graphics/characters/blank.png";
import npcNurse from "../../../../../../../../assets/graphics/characters/npcNurse.png";
import npcBImg from "../../../../../../../../assets/graphics/characters/npcB.png";
import npcLImg from "../../../../../../../../assets/graphics/characters/npcLBloody.png";
import npcMImg from "../../../../../../../../assets/graphics/characters/npcM.png";
import npcDImg from "../../../../../../../../assets/graphics/characters/npcD.png";


import musicBg from "../../../../../../../../assets/audio/background_music/ViridianCity.ogg"

export const ViridianPokeCenterFirstFloor = {
    id: "ViridianPokeCenterFirstFloor",
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
            x: withGrid(18),
            y: withGrid(18),
            src: blank,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Hi,", facePlayer: "npcA" },
                        { type: "textMessage", text: "You and your Pokemons looked exhausted!", facePlayer: "npcA" },
                        { type: "textMessage", text: "You should rest a little bit.", facePlayer: "npcA" },
                        { type: "healing", position: "ViridianPokeCenterFirstFloor"},
                        { type: "textMessage", text: "You are all looking well better.", facePlayer: "npcA" },
                        { type: "textMessage", text: "See you!", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
        npcNurse: ({
            type: "Person",
            x: withGrid(18),
            y: withGrid(17),
            src: npcNurse,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
        }),
        npcB: ({
            type: "Person",
            x: withGrid(21),
            y: withGrid(21),
            src: npcBImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 4400},
                { type: "stand", direction: "right", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "My husband was mugged in Viridian Forest.", facePlayer: "npcB" },
                        { type: "textMessage", text: "Look how they beat him up...", facePlayer: "npcB" },
                        { type: "textMessage", text: "I'm so confused...", facePlayer: "npcB" },
                    ]
                }
            ]
        }),
        npcC: ({
            type: "Person",
            x: withGrid(23),
            y: withGrid(20),
            src: npcLImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 4900},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "They hit me when i was on the floor!", facePlayer: "npcC" },
                        { type: "textMessage", text: "I was there to catch Caterpies.", facePlayer: "npcC" },
                        { type: "textMessage", text: "Nothing more.", facePlayer: "npcC" },
                    ]
                }
            ]
        }),
        npcD: ({
            type: "Person",
            x: withGrid(12),
            y: withGrid(17),
            src: npcMImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 3200},
                { type: "stand", direction: "left", time: 1600},
                { type: "stand", direction: "right", time: 1600},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "You need something?", facePlayer: "npcD" },
                        { type: "textMessage", text: "Nothing? Ho ok...", facePlayer: "npcD" },
                    ]
                }
            ]
        }),
        npcE: ({
            type: "Person",
            x: withGrid(13),
            y: withGrid(24),
            src: npcDImg,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 1600},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I'm waiting for my mother.", facePlayer: "npcD" },
                        { type: "textMessage", text: "She will be here soon.", facePlayer: "npcD" },
                    ]
                }
            ]
        }),
        bookShelf1: ({
            type: "Person",
            x: withGrid(13),
            y: withGrid(15),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Pokemon medicine.", facePlayer: "bookShelf1" },
                    ]
                }
            ]
        }),
        bookShelf2: ({
            type: "Person",
            x: withGrid(14),
            y: withGrid(15),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Pokemon medicine.", facePlayer: "bookShelf1" },
                    ]
                }
            ]
        }),
        computer: ({
            type: "Person",
            x: withGrid(22),
            y: withGrid(15),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Updating windows.", facePlayer: "computer" },
                    ]
                }
            ]
        }),
    },
    walls: loadWall(collisions),
    // grass: loadGrass(grass),
    cutsceneSpaces: {
        [asGridCoords(18, 25)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianCity",
                        soundEffect: "doors",
                        changeMusic: musicBg,
                        x: withGrid(54),
                        y: withGrid(66),
                        direction: 'down',
                    },
                ]
            }
        ],
        [asGridCoords(11, 21)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianPokeCenterSecondFloor",
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