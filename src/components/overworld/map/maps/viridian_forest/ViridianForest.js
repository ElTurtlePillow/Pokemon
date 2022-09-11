import mapDown from "../../../../../assets/graphics/maps/viridian_forest/down.png";
import mapUp from "../../../../../assets/graphics/maps/viridian_forest/up.png";
import { collisions, grass, bump } from './MapCollision';

import { asGridCoords, loadWall, withGrid, loadGrass, loadBump } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png";

import ViridianCityBg  from "../../../../../assets/audio/background_music/ViridianCity.ogg"

export const ViridianForest = {
    id: "ViridianForest",
    lowerSrc: mapDown,
    upperSrc: mapUp,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
            canRun: true,
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
                    { type: "textMessage", text: "Nooo!", },
                    { type: "textMessage", text: "POKEMON !", },
                    { type: "textMessage", text: "STOP!", },


                    { type: "cameraPosition", x: 500, y:500, },
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