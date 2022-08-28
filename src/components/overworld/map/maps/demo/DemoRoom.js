import { collisions } from './MapCollision';


import lowerImg from "../../../../../assets/graphics/maps/demo/map.png";
import upperImg from "../../../../../assets/graphics/maps/demo/mapupper.png";

import momImg from "../../../../../assets/graphics/characters/mother.png";
import npcAImg from "../../../../../assets/graphics/characters/npcA.png";


import { asGridCoords, loadWall, nextPosition, withGrid } from '../../../../../Utils';

export const DemoRoom = {
    id: "DemoRoom",
    lowerSrc: lowerImg,
    upperSrc: upperImg,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
            x: withGrid(4),
            y: withGrid(4)
        }),
        npcMom: ({
            type: "Person",
            x: withGrid(6),
            y: withGrid(3),
            src: momImg,
            behaviorLoop: [
                { type: "stand", direction: "down", time: 1},
                { type: "walk", direction: "up", },
                { type: "walk", direction: "right", },
                { type: "walk", direction: "down", },
                { type: "walk", direction: "left", },
            ],
            talking : [
                {
                    events: [
                        { type: "textMessage", text: "Hello world", facePlayer: "npcA" },
                        { type: "addStoryFlag", flag:"TALKD_TO_MOM"},
                    ]
                }
            ]
        }),
        npcA: ({
            type: "Person",
            x: withGrid(10),
            y: withGrid(5),
            src: npcAImg,
            behaviorLoop: [
                { type: "stand", direction: "right", time: 2000 },
                { type: "stand", direction: "down", time: 3000},
            ],
            talking : [
                {
                    required: ["TALKD_TO_MOM"],
                    events: [
                        { type: "textMessage", text: "Well well well", facePlayer: "npcA"},
                    ]
                },
                {
                    events: [
                        { type: "textMessage", text: "My pokemons are the best !", facePlayer: "npcA"},
                        { type: "battle", enemyId: "beth" },
                        { type: "addStoryFlag", flag: "DEFEATED_BETH"},
                        { type: "textMessage", text: "You're the king bro", facePlayer: "npcA"},
                    ]
                }
            ]
        }),
        interactiveObject: ({
            type: "InteractiveObject",
            x: withGrid(2),
            y: withGrid(8),
            storyFlag: "USED_INTERACTIVE_OBJECT",
            pokemons: ["pikachu"]
        })
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(1,1)]: [
            {
                events: [
                    { who: "player", type: "walk", direction: "right"},
                    { type: "textMessage", text:"Sionop rg r ger eg erzger ezrgz ethezth zeth zth eth zerh ze"},
                ]
            }
        ],
        [asGridCoords(7, 7)]: [
            {
                events: [
                    { 
                        type: "changeMap", 
                        map: "DemoMo",
                        x: withGrid(2),
                        y: withGrid(0),
                        direction: 'up',
                    },
                ]
            }
        ]
    }
}