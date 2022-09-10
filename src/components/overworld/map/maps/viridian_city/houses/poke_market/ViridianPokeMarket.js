import mapDown from "../../../../../../../assets/graphics/maps/pokemon_market/down.png";
import mapUp from "../../../../../../../assets/graphics/maps/pokemon_market/up.png";
import { collisions } from '../../../poke_market/MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../../../Utils';


import blank from "../../../../../../../assets/graphics/characters/blank.png";
import npcHimg from "../../../../../../../assets/graphics/characters/npcH.png";
import npcOimg from "../../../../../../../assets/graphics/characters/npcO.png";
import npcPimg from "../../../../../../../assets/graphics/characters/npcP.png";
import npcQimg from "../../../../../../../assets/graphics/characters/npcQ.png";

import musicBg from "../../../../../../../assets/audio/background_music/ViridianCity.ogg"

export const ViridianPokeMarket = {
    id: "ViridianPokeMarket",
    lowerSrc: mapDown,
    upperSrc: mapUp,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
            canRun: false,
        }),
        npcA: ({
            type: "Person",
            x: withGrid(9),
            y: withGrid(15),
            src: blank,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Hello,", facePlayer: "npcC" },
                        { type: "textMessage", text: "Do you need anything?", facePlayer: "npcC" },
                    ]
                }
            ]
        }),
        npcB: ({
            type: "Person",
            x: withGrid(10),
            y: withGrid(14),
            src: blank,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Hello,", facePlayer: "npcC" },
                        { type: "textMessage", text: "Do you need anything?", facePlayer: "npcC" },
                    ]
                }
            ]
        }),
        npcC: ({
            type: "Person",
            x: withGrid(9),
            y: withGrid(14),
            src: npcHimg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
        }),
        npcD: ({
            type: "Person",
            x: withGrid(12),
            y: withGrid(11),
            src: npcOimg,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I don't have enough money to buy that.", facePlayer: "npcD" },
                    ]
                }
            ]
        }),
        npcE: ({
            type: "Person",
            x: withGrid(15),
            y: withGrid(17),
            src: npcPimg,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "If there is something that I know.", facePlayer: "npcE" },
                        { type: "textMessage", text: "It's that I don't know anything.", facePlayer: "npcE" },
                    ]
                }
            ]
        }),
        npcF: ({
            type: "Person",
            x: withGrid(21),
            y: withGrid(14),
            src: npcQimg,
            behaviorLoop: [
                { type: "stand", direction: "left", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "This video game is full of secret.", facePlayer: "npcF" },
                    ]
                }
            ]
        }),
    },
    walls: loadWall(collisions),
    // grass: loadGrass(grass),
    cutsceneSpaces: {
        [asGridCoords(14, 20)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianCity",
                        soundEffect: "doors",
                        changeMusic: musicBg,
                        x: withGrid(65),
                        y: withGrid(59),
                        direction: 'down',
                    },
                ]
            }
        ],
    }
}