import mapDown from "../../../../../../../assets/graphics/maps/viridian_city/classic_house/down.png";
import mapUp from "../../../../../../../assets/graphics/maps/viridian_city/classic_house/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../../../Utils';

import blank from "../../../../../../../assets/graphics/characters/blank.png";
import npcRImg from "../../../../../../../assets/graphics/characters/npcR.png";
import npcSImg from "../../../../../../../assets/graphics/characters/npcS.png";
import npcTImg from "../../../../../../../assets/graphics/characters/npcT.png";

import musicBg from "../../../../../../../assets/audio/background_music/ViridianCity.ogg"

export const ViridianHouseOne = {
    id: "ViridianHouseOne",
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
            x: withGrid(21),
            y: withGrid(13),
            src: npcSImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "She have to work a lot.", facePlayer: "npcA" },
                        { type: "textMessage", text: "I don't want her to end up like her brother!", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
        npcB: ({
            type: "Person",
            x: withGrid(20),
            y: withGrid(14),
            src: npcRImg,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "He is the worst teacher ever.", facePlayer: "npcB" },
                        { type: "textMessage", text: "How am i supposed to learn anything like that.", facePlayer: "npcB" },
                    ]
                }
            ]
        }),
        npcC: ({
            type: "Person",
            x: withGrid(10),
            y: withGrid(15),
            src: npcTImg,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 1200},
                { type: "stand", direction: "up", time: 3200},
                { type: "stand", direction: "left", time: 4200},
                { type: "stand", direction: "down", time: 2200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "He's too harsh.", facePlayer: "npcC" },
                        { type: "textMessage", text: "He should be careful, or she'll end up hating him.", facePlayer: "npcC" },
                    ]
                }
            ]
        }),
        tv: ({
            type: "Person",
            x: withGrid(14),
            y: withGrid(11),
            src: blank,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Firefighters should arrive quickly.", facePlayer: "tv" },
                        { type: "textMessage", text: "We keep you informed.", facePlayer: "tv" },
                    ]
                }
            ]
        }),
    },
    walls: loadWall(collisions),
    // grass: loadGrass(grass),
    cutsceneSpaces: {
        [asGridCoords(15, 20)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianCity",
                        soundEffect: "doors",
                        changeMusic: musicBg,
                        x: withGrid(53),
                        y: withGrid(58),
                        direction: 'down',
                    },
                ]
            }
        ],
    }
}