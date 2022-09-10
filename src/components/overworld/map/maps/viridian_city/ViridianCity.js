import mapDown from "../../../../../assets/graphics/maps/viridian_city/down.png";
import mapUp from "../../../../../assets/graphics/maps/viridian_city/up.png";
import { collisions, grass, bump } from './MapCollision';

import { asGridCoords, loadWall, withGrid, loadGrass, loadBump } from '../../../../../Utils';


import blank from "../../../../../assets/graphics/characters/blank.png";

import npcJImg from "../../../../../assets/graphics/characters/npcJ.png";


import palletTownBg from "../../../../../assets/audio/background_music/PalletTown.ogg"
import pokeCenterMsc from "../../../../../assets/audio/background_music/PokeCenter.ogg"
import pokeMarketMsc from "../../../../../assets/audio/background_music/PokeMarket.ogg"

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
            x: withGrid(14),
            y: withGrid(20),
            src: npcJImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1200},
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "This is the Pokémon League Reception Gate.", facePlayer: "npcA" },
                        { type: "textMessage", text: "You need the 7 badges to continue.", facePlayer: "npcA" },
                    ]
                }
            ]
        }),
        signA: ({
            type: "Person",
            x: withGrid(55),
            y: withGrid(75),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Route 1."},
                    ]
                },
            ]
        }),
        signB: ({
            type: "Person",
            x: withGrid(47),
            y: withGrid(70),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Viridian City, the city of Evergreen."},
                    ]
                },
            ]
        }),
        signC: ({
            type: "Person",
            x: withGrid(47),
            y: withGrid(55),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Pokemon museum under construction."},
                    ]
                },
            ]
        }),
        signD: ({
            type: "Person",
            x: withGrid(62),
            y: withGrid(48),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Viridian City Gym."},
                    ]
                },
            ]
        }),
        signE: ({
            type: "Person",
            x: withGrid(18),
            y: withGrid(60),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Route 22."},
                    ]
                },
            ]
        }),
        signF: ({
            type: "Person",
            x: withGrid(16),
            y: withGrid(24),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Pokémon League Reception Gate."},
                    ]
                },
            ]
        }),
        signG: ({
            type: "Person",
            x: withGrid(47),
            y: withGrid(28),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Viridian Forest to the north, Diglett's Cave to the east."},
                    ]
                },
            ]
        }),
        signH: ({
            type: "Person",
            x: withGrid(51),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Viridian Forest."},
                    ]
                },
            ]
        }),
        signI: ({
            type: "Person",
            x: withGrid(62),
            y: withGrid(12),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Diglett's Cave."},
                    ]
                },
            ]
        }),
    },
    walls: loadWall(collisions),
    grass: loadGrass(grass),
    bump: loadBump(bump),
    cutsceneSpaces: {
        [asGridCoords(52, 75)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        soundEffect: "stairs",
                        changeMusic: palletTownBg,
                        x: withGrid(40),
                        y: withGrid(7),
                        direction: 'down',
                    },
                ]
            }
        ],
        [asGridCoords(54, 65)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianPokeCenterFirstFloor",
                        soundEffect: "doors",
                        changeMusic: pokeCenterMsc,
                        x: withGrid(18),
                        y: withGrid(24),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(65, 58)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianPokeMarket",
                        soundEffect: "doors",
                        changeMusic: pokeMarketMsc,
                        x: withGrid(14),
                        y: withGrid(19),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(53, 57)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianHouseOne",
                        soundEffect: "doors",
                        x: withGrid(15),
                        y: withGrid(19),
                        direction: 'up',
                    },
                ]
            }
        ],
        [asGridCoords(54, 50)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "ViridianHouseTwo",
                        soundEffect: "doors",
                        x: withGrid(15),
                        y: withGrid(19),
                        direction: 'up',
                    },
                ]
            }
        ],
    }
}