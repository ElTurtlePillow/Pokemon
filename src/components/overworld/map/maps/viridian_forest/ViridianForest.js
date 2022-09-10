import mapDown from "../../../../../assets/graphics/maps/viridian_forest/down.png";
import mapUp from "../../../../../assets/graphics/maps/viridian_forest/up.png";
// import { collisions, grass, bump } from './MapCollision';

import { asGridCoords, loadWall, withGrid, loadGrass, loadBump } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png";

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
        
    // walls: loadWall(collisions),
    // grass: loadGrass(grass),
    // bump: loadBump(bump),
    cutsceneSpaces: {
        [asGridCoords(0, 0)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianCity",
                        soundEffect: "stairs",
                        // changeMusic: palletTownBg,
                        x: withGrid(0),
                        y: withGrid(0),
                        direction: 'down',
                    },
                ]
            }
        ],
    }
}