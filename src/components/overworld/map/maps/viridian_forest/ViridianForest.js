import mapDown from "../../../../../assets/graphics/maps/viridian_forest/down.png";
import mapUp from "../../../../../assets/graphics/maps/viridian_forest/up.png";
import { collisions, grass, bump } from './MapCollision';

import { asGridCoords, loadWall, withGrid, loadGrass, loadBump } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png";
import teamRocketA from "../../../../../assets/graphics/characters/npcTeamRocketA.png";
import teamRocketB from "../../../../../assets/graphics/characters/npcTeamRocketB.png";

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
        teamRocketA: ({
            type: "Person",
            x: withGrid(26),
            y: withGrid(42),
            src: teamRocketB,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "..."},
                    ]
                },
            ]
        }),
        teamRocketB: ({
            type: "Person",
            x: withGrid(24),
            y: withGrid(41),
            src: teamRocketA,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "..."},
                    ]
                },
            ]
        }),
        // charizard: ({
        //     type: "Person",
        //     x: withGrid(30),
        //     y: withGrid(42),
        //     src: charizard,
        // }),
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
                    { who: "player", type: "walk", direction: "up"},
                    
                    
                    
                    { type: "cameraPosition", x:-208, y:-64 },
                    { type: "playSoundEffect", soundEffect:"roar"},
                    { type: "clientEvent", what:"charizard"},
                    
                    { who: "player", type: "stand", direction: "up", time: 3000},
                    { type: "textMessage", text: "CHAAAAAAAARIIIZAAAAARD!!!", },
                    
                    { who: "player", type: "stand", direction: "up", time: 2000},
                    { type: "textMessage", text: "What are you doing?!", },
                    { type: "textMessage", text: "We just had to scare them!", },
                    { type: "textMessage", text: "Not burn the whole forest!", },
                    
                    { type: "textMessage", text: "CHAAAAAAAAAAA!!!", },

                    { who: "teamRocketA", type: "stand", direction: "down", time: 2000},

                    
                    //reset
                    // { type: "cameraPosition", x:-208, y:-112 },
                    // { type: "textMessage", text: "We didn't wnt that!", },
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