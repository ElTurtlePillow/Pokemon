import mapDown from "../../../../../../../../assets/graphics/maps/pokemon_center/first_floor/down.png";
import mapUp from "../../../../../../../../assets/graphics/maps/pokemon_center/first_floor/up.png";
import { collisions } from '../../../../poke-center/first_floor/MapCollision';

import { asGridCoords, loadWall, withGrid, loadGrass } from '../../../../../../../../Utils';


import blank from "../../../../../../../../assets/graphics/characters/blank.png";
import npcNurse from "../../../../../../../../assets/graphics/characters/npcNurse.png";


import musicBg from "../../../../../../../../assets/audio/background_music/ViridianCity.ogg"

export const ViridianPokeCenterFirstFloor = {
    id: "ViridianPokeCenterFirstFloor",
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
            x: withGrid(18),
            y: withGrid(18),
            src: blank,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Hello,", facePlayer: "npcA" },
                        { type: "textMessage", text: "You and your Pokemons looked exhausted!", facePlayer: "npcA" },
                        { type: "textMessage", text: "You should rest a little bit.", facePlayer: "npcA" },
                        { type: "healing", position: "ViridianPokeCenterFirstFloor"},
                        { type: "textMessage", text: "Your all look well better.", facePlayer: "npcA" },
                        { type: "textMessage", text: "See you!", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
        npcNurse: ({
            type: "Person",
            x: withGrid(18),
            y: withGrid(17),
            src: npcNurse,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
        }),
    },
    walls: loadWall(collisions),
    // grass: loadGrass(grass),
    cutsceneSpaces: {
        [asGridCoords(18, 25)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianCity",
                        soundEffect: "doors",
                        changeMusic: musicBg,
                        x: withGrid(54),
                        y: withGrid(66),
                        direction: 'down',
                    },
                ]
            }
        ],
    }
}