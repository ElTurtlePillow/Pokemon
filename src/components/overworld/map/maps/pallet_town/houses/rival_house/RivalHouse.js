import mapDown from "./../../../../../../../assets/graphics/maps/pallet_town/houses/rival_house/down.png";
import mapUp from "./../../../../../../../assets/graphics/maps/pallet_town/houses/rival_house/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from './../../../../../../../Utils';


import blank from "./../../../../../../../assets/graphics/characters/blank.png"

import npcCherry from "./../../../../../../../assets/graphics/characters/npcCherry.png"


export const RivalHouse = {
    id: "RivalHouse",
    lowerSrc: mapDown,
    upperSrc: mapUp,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
        }),
        npcCherry: ({
            type: "Person",
            x: withGrid(14),
            y: withGrid(11),
            src: npcCherry,
            behaviorLoop: [
                { type: "stand", direction: "left", time: 2000 },
            ],
            talking : [
                {
                    required: ["TALKED_TO_CHEN_FIRST_TIME"],
                    events: [
                        { type: "textMessage", text: "Cherry: My brother just went to Viridian City.", facePlayer: "npcCherry" },
                        { type: "textMessage", text: "Cherry: He will defeat the Gym Leader.", facePlayer: "npcCherry" },
                    ]
                },
                {
                    events: [
                        { type: "textMessage", text: "Cherry: My brother is at prof Chen's lab.", facePlayer: "npcCherry"},
                        { type: "textMessage", text: "Cherry: I think he will have his first Pokemon.", facePlayer: "npcCherry"},
                    ]
                },
            ]
        }),
        tv: ({
            type: "Person",
            x: withGrid(11),
            y: withGrid(7),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Team Rocket has struck again!"},
                        { type: "textMessage", text: "They stole all the pokeballs from the south of the continent."},
                        { type: "textMessage", text: "We keep you informed."},
                    ]
                },
            ]
        }),
        dishes: ({
            type: "Person",
            x: withGrid(6),
            y: withGrid(7),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "It's really dirty."},
                    ]
                },
            ]
        }),
        bookshelf1: ({
            type: "Person",
            x: withGrid(17),
            y: withGrid(7),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Some capitalist books."},
                    ]
                },
            ]
        }),
        bookshelf2: ({
            type: "Person",
            x: withGrid(18),
            y: withGrid(7),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Some capitalist books."},
                    ]
                },
            ]
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(10, 16)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        soundEffect: "doors",
                        x: withGrid(43),
                        y: withGrid(56),
                        direction: 'down',
                    },
                ]
            }
        ]
    }
}