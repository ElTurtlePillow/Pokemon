import mapDown from "../../../../../assets/graphics/maps/viridian_forest/down.png";
import mapUp from "../../../../../assets/graphics/maps/viridian_forest/up.png";
import { collisions, grass, bump } from './MapCollision';

import { asGridCoords, loadWall, withGrid, loadGrass, loadBump } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png";

import teamRocketA from "../../../../../assets/graphics/characters/npcTeamRocketA.png";
import teamRocketB from "../../../../../assets/graphics/characters/npcTeamRocketB.png";
import mimikyu from "../../../../../assets/graphics/characters/mimikyu-undesguised-v2.png";

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
            canRun: true,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "..."},
                    ]
                },
            ],
            isNotHere: "MIAMIKYU",
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
            ],
            isNotHere: "MIAMIKYU",
        }),
        mimikyu: ({
            type: "Person",
            x: withGrid(26),
            y: withGrid(37),
            src: mimikyu,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "..."},
                    ]
                },
            ],
            isNotHere: "MIAMIKYU",
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
                        setFilter: "null",
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
                    { type: "textMessage", text: "CHARIZARD!!! PLEASE!", },
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

                    { who: "teamRocketA", type: "stand", direction: "down", time: 1000},
                    { type: "textMessage", text: "He is completely uncontrollable.", },
                    { who: "teamRocketB", type: "stand", direction: "down", time: 1000},
                    { type: "textMessage", text: "We wanted to keep the trainers away,", },
                    { type: "textMessage", text: "So that we could steal all Pokemon in this forest.", },
                    { type: "textMessage", text: "But Charizard start to burn everything.", },
                    { type: "textMessage", text: "And now there's nothing we can do!", }, 

                    
                    { type: "clientEvent", what:"charizard-fire"},

                    { who: "teamRocketA", type: "stand", direction: "right", time: 500},
                    { who: "teamRocketA", type: "walk", direction: "left"},
                    { who: "teamRocketA", type: "walk", direction: "left"},
                    { who: "teamRocketA", type: "walk", direction: "left"},
                    { who: "teamRocketA", type: "walk", direction: "left"},
                    { who: "teamRocketA", type: "stand", direction: "right", time: 400},
                    { who: "teamRocketA", type: "walk", direction: "left"},
                    { who: "teamRocketA", type: "walk", direction: "left"},
                    { who: "teamRocketA", type: "walk", direction: "left"},

                    
                    { type: "textMessage", text: "Good luck with that!", }, 
                    { who: "teamRocketB", type: "walk", direction: "left"},
                    { who: "teamRocketB", type: "walk", direction: "left"},
                    { who: "teamRocketB", type: "walk", direction: "left"},
                    { who: "teamRocketB", type: "walk", direction: "left"},
                    { who: "teamRocketB", type: "walk", direction: "left"},

                    
                    { who: "mimikyu", type: "walk", direction: "down"},
                    { who: "mimikyu", type: "walk", direction: "down"},
                    { who: "mimikyu", type: "walk", direction: "down"},
                    { who: "mimikyu", type: "walk", direction: "down"},
                    { who: "mimikyu", type: "walk", direction: "down"},
                    { who: "mimikyu", type: "stand", direction: "right", time: 1000},
                    
                    
                    { type: "textMessage", text: "Mimikyu...", }, 
                    { who: "mimikyu", type: "walk", direction: "right"},
                    { who: "mimikyu", type: "walk", direction: "right"},
                    
                    { who: "mimikyu", type: "stand", direction: "right", time:333 },
                    { type: "textMessage", text: "MIMIKYU!!!", }, 

                    { type: "clientEvent", what:"miamikyu"},
                    { type: "addStoryFlag", flag: "MIAMIKYU"},
                    { who: "mimikyu", type: "stand", direction: "right", time:333},


                        { 
                            type: "changeMap", 
                            map: "ViridianForest",
                            soundEffect: "mimikyuScream",
                            x: withGrid(28),
                            y: withGrid(44),
                            direction: 'up',
                        },
                    { type: "clientEvent", what:"reset"},
                   
                    
                    { who: "player", type: "stand", direction: "up", time:444},
                    
                    // reset
                    { type: "cameraPosition", x:-208, y:-112 },
                ]
            },
            {
                required: "//",
            },
            {
                nothing: "MIAMIKYU",
            },
        ],
    }
}