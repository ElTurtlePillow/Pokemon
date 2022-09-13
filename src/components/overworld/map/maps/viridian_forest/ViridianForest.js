import mapDown from "../../../../../assets/graphics/maps/viridian_forest/down.png";
import mapUp from "../../../../../assets/graphics/maps/viridian_forest/up.png";
import { collisions, grass, bump } from './MapCollision';

import { asGridCoords, loadWall, withGrid, loadGrass, loadBump } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png";
import npcA from "../../../../../assets/graphics/characters/npcA.png";
import charizard from "../../../../../assets/graphics/story/charizardtest.gif"

import ViridianCityBg  from "../../../../../assets/audio/background_music/ViridianCity.ogg"

export const ViridianForest = {
    id: "ViridianForest",
    lowerSrc: mapDown,
    upperSrc: mapUp,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            canRun: true,
            isPlayerControlled: true,
        }),
        npcA: ({
            type: "Person",
            x: withGrid(28),
            y: withGrid(41),
            src: npcA,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "..."},
                    ]
                },
            ]
        }),
        charizard: ({
            type: "Person",
            x: withGrid(30),
            y: withGrid(42),
            src: charizard,
        }),
    },
    walls: loadWall(collisions),
    grass: loadGrass(grass),
    bump: loadBump(bump),
    cutsceneSpaces: {
        [asGridCoords(28, 50)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianCity",
                        soundEffect: "stairs",
                        changeMusic: ViridianCityBg,
                        x: withGrid(53),
                        y: withGrid(11),
                        direction: 'down',
                    },
                ]
            }
        ],

        // Viridian Forest burning scenario 1.1
        [asGridCoords(28, 48)]: [
            {
                events: [
                    { who: "player",type: "walk", direction: "up"},
                    { who: "player",type: "walk", direction: "up"},
                    { who: "player",type: "walk", direction: "up"},
                    { type: "textMessage", text: "CHARIZARD!!!", },
                    { type: "textMessage", text: "STOP!!!", },
                    
                    { who: "player",type: "walk", direction: "up"},


                    { type: "cameraPosition", x:-208, y:20 },
                    { type: "textMessage", text: "We didn't wnt that!", },

                    
                    { type: "cameraPosition", x:-208, y:-112 },
                    { type: "textMessage", text: "We didn't wnt that!", },
                ]
            },
            {
                required: "//",
            },
            {
                nothing: "//",
            },
        ],
    }
}