import mapDown from "../../../../../../../assets/graphics/maps/viridian_city/classic_house/down.png";
import mapUp from "../../../../../../../assets/graphics/maps/viridian_city/classic_house/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../../../Utils';

import blank from "../../../../../../../assets/graphics/characters/blank.png";
import npcJImg from "../../../../../../../assets/graphics/characters/npcJ.png";
import npcUImg from "../../../../../../../assets/graphics/characters/npcU.png";
import npcVImg from "../../../../../../../assets/graphics/characters/npcV.png";

import musicBg from "../../../../../../../assets/audio/background_music/ViridianCity.ogg"

export const ViridianHouseTwo = {
    id: "ViridianHouseTwo",
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
            y: withGrid(14),
            src: npcJImg,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 2400},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I can't walk anymore.", facePlayer: "npcA" },
                        { type: "textMessage", text: "You should take my running shoes.", facePlayer: "npcA" },
                        { type: "getEssentialItem", id:"runningShoes"},
                    ]
                }
            ]
        }),
        npcB: ({
            type: "Person",
            x: withGrid(9),
            y: withGrid(12),
            src: npcUImg,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "He lost his legs in an accident.", facePlayer: "npcB" },
                        { type: "textMessage", text: "But he doesn't want to talk about it.", facePlayer: "npcB" },
                    ]
                }
            ]
        }),
        npcC: ({
            type: "Person",
            x: withGrid(14),
            y: withGrid(17),
            src: npcVImg,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 4200},
                { type: "stand", direction: "right", time: 2200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "I'm exhausted.", facePlayer: "npcC" },
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
                        { type: "textMessage", text: "Will Stella go out with John again?", facePlayer: "tv" },
                        { type: "textMessage", text: "You will find out in the next episode!", facePlayer: "tv" },
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
                        x: withGrid(54),
                        y: withGrid(51),
                        direction: 'down',
                    },
                ]
            }
        ],
    }
}