import mapDown from "../../../../../../../../assets/graphics/maps/pallet_town/houses/mom_house/second_floor/down.png";
import mapUp from "../../../../../../../../assets/graphics/maps/pallet_town/houses/mom_house/second_floor/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../../../../Utils';


import npcAImg from "../../../../../../../../assets/graphics/characters/npcA.png";

export const MomHouseSecondFloor = {
    id: "MomHouseSecondFloor",
    lowerSrc: mapDown,
    upperSrc: mapUp,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
            x: withGrid(14),
            y: withGrid(16),
            direction: "up",
        }),
        // npcA: ({
        //     type: "Person",
        //     x: withGrid(17),
        //     y: withGrid(12),
        //     src: npcAImg,
            
        // }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(17, 12)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "MomHouseFirstFloor",
                        x: withGrid(19),
                        y: withGrid(12),
                        direction: 'left',
                    },
                ]
            }
        ]
    }
}