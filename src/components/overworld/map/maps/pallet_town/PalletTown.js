import mapDown from "../../../../../assets/graphics/maps/pallet_town/down.png";
import mapUp from "../../../../../assets/graphics/maps/pallet_town/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, nextPosition, withGrid } from '../../../../../Utils';


import npcAImg from "../../../../../assets/graphics/characters/npcA.png";

export const PalletTown = {
    id: "PalletTown",
    lowerSrc: mapDown,
    upperSrc: mapUp,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
            x: withGrid(16),
            y: withGrid(12)
        }),
        npcA: ({
            type: "Person",
            x: withGrid(18),
            y: withGrid(18),
            src: npcAImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
                { type: "stand", direction: "left", time: 3000},
                { type: "stand", direction: "right", time: 2100},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Welcome to the Pokemon world !", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(7, 7)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "MomKitchen",
                        x: withGrid(16),
                        y: withGrid(11),
                        direction: 'up',
                    },
                ]
            }
        ]
    }
}