import mapDown from "../../../../../../../assets/graphics/maps/pokemon_market/down.png";
import mapUp from "../../../../../../../assets/graphics/maps/pokemon_market/up.png";
import { collisions } from '../../../poke_market/MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../../../Utils';


import blank from "../../../../../../../assets/graphics/characters/blank.png";

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
                        { type: "textMessage", text: "Hello,", facePlayer: "npcA" },
                        { type: "textMessage", text: "Do you need anything?", facePlayer: "npcA" },
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