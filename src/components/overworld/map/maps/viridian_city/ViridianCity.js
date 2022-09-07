import mapDown from "../../../../../assets/graphics/maps/viridian_city/down.png";
import mapUp from "../../../../../assets/graphics/maps/viridian_city/up.png";
import { collisions, grass } from './MapCollision';

import { asGridCoords, loadWall, withGrid, loadGrass } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png";

import npcAImg from "../../../../../assets/graphics/characters/npcA.png";


import musicBg from "../../../../../assets/audio/background_music/PalletTown.ogg"

export const ViridianCity = {
    id: "ViridianCity",
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
            y: withGrid(42),
            src: npcAImg,
            behaviorLoop: [
                { type: "stand", direction: "left", time: 1200},
                { type: "stand", direction: "right", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "LOREMIPSUM", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
    },
    walls: loadWall(collisions),
    grass: loadGrass(grass),
    cutsceneSpaces: {
        [asGridCoords(52, 75)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        soundEffect: "stairs",
                        changeMusic: musicBg,
                        x: withGrid(40),
                        y: withGrid(7),
                        direction: 'down',
                    },
                ]
            }
        ],
    }
}