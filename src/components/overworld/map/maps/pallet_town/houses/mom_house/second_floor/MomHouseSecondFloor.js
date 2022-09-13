import mapDown from "../../../../../../../../assets/graphics/maps/pallet_town/houses/mom_house/second_floor/down.png";
import mapUp from "../../../../../../../../assets/graphics/maps/pallet_town/houses/mom_house/second_floor/up.png";
import { collisions } from './MapCollision';

import { asGridCoords, loadWall, withGrid } from '../../../../../../../../Utils';

import blank from "../../../../../../../../assets/graphics/characters/blank.png"

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
            canRun: false,
        }),
        computer: ({
            type: "Person",
            x: withGrid(9),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Windows update..."},
                    ]
                },
            ]
        }),
        notebook: ({
            type: "Person",
            x: withGrid(10),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: '"Every challenge along the way,"'},
                        { type: "textMessage", text: '"With courage I will face,"'},
                        { type: "textMessage", text: '"I will battle everyday,"'},
                        { type: "textMessage", text: '"To claim my rightful place!"'},
                    ]
                },
            ]
        }),
        bookshelf1: ({
            type: "Person",
            x: withGrid(12),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "There is a lot of books here."},
                    ]
                },
            ]
        }),
        bookshelf2: ({
            type: "Person",
            x: withGrid(13),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "There is a lot of books here."},
                    ]
                },
            ]
        }),
        n64: ({
            type: "Person",
            x: withGrid(14),
            y: withGrid(15),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Why is it not working ?"},
                    ]
                },
            ]
        }),
        degree: ({
            type: "Person",
            x: withGrid(19),
            y: withGrid(11),
            src: blank,
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Driver's license."},
                    ]
                },
            ]
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(17, 12)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "MomHouseFirstFloor",
                        soundEffect: "stairs",
                        x: withGrid(19),
                        y: withGrid(12),
                        direction: 'left',
                    },
                ]
            }
        ]
    },
}