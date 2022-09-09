import mapDown from "../../../../../../../../assets/graphics/maps/pallet_town/houses/mom_house/first_floor/down.png";
import mapUp from "../../../../../../../../assets/graphics/maps/pallet_town/houses/mom_house/first_floor/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../../../../Utils';


import blank from "../../../../../../../../assets/graphics/characters/blank.png"

import npcMom from "../../../../../../../../assets/graphics/characters/mom.png";


export const MomHouseFirstFloor = {
    id: "MomHouseFirstFloor",
    lowerSrc: mapDown,
    upperSrc: mapUp,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
        }),
        npcMom: ({
            type: "Person",
            x: withGrid(14),
            y: withGrid(16),
            src: npcMom,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 2000 },
            ],
            talking : [
                {
                    required: ["TALKED_TO_CHEN_FIRST_TIME"],
                    events: [
                        { type: "textMessage", text: "Mom: You should rest a little bit.", facePlayer: "npcMom" },
                        { type: "healing", position: "MomHouseFirstFloor"},
                        { type: "textMessage", text: "Mom: There you go!", facePlayer: "npcMom" },
                    ]
                },
                // {
                //     required: ["TALKED_TO_CHEN_FIRST_TIME"],
                //     events: [
                //         { type: "textMessage", text: "Mom: Well it's ok, you'll get yours in no time.", facePlayer: "npcMom" },
                //         { type: "textMessage", text: "Mom: I know it's not a good news but you'll find your Pokemon.", facePlayer: "npcMom" },
                //     ]
                // },
                {
                    events: [
                        { type: "textMessage", text: "Mom: I know you would have preferred to stay in Celadon City.", facePlayer: "npcMom"},
                        { type: "textMessage", text: "Mom: But I'm sure Pallet Town has a lot to offer.", facePlayer: "npcMom"},
                    ]
                },
            ]
        }),
        tv: ({
            type: "Person",
            x: withGrid(14),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "The weather is weird in Viridian Forest."},
                        { type: "textMessage", text: "We keep you informed."},
                    ]
                },
            ]
        }),
        dishes: ({
            type: "Person",
            x: withGrid(9),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Too many dishes to do."},
                    ]
                },
            ]
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(20, 12)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "MomHouseSecondFloor",
                        soundEffect: "stairs",
                        x: withGrid(18),
                        y: withGrid(12),
                        direction: 'right',
                    },
                ]
            }
        ],
        [asGridCoords(13, 20)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "PalletTown",
                        soundEffect: "doors",
                        x: withGrid(34),
                        y: withGrid(56),
                        direction: 'down',
                    },
                ]
            }
        ]
    },
}