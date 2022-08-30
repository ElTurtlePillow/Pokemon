import { collisions } from './MapCollision';


import lowerImg from "../../../../../assets/graphics/maps/new_game/down.png";
import upperImg from "../../../../../assets/graphics/maps/new_game/up.png";

import momImg from "../../../../../assets/graphics/characters/mom.png";


import { asGridCoords, loadWall, nextPosition, withGrid } from '../../../../../Utils';

export const NewGame = {
    id: "NewGame",
    lowerSrc: lowerImg,
    upperSrc: upperImg,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
            x: withGrid(13),
            y: withGrid(18),
            direction: "up"
        }),
        npcMom: ({
            type: "Person",
            x: withGrid(13),
            y: withGrid(13),
            src: momImg,
            behaviorLoop: [
                { type: "stand", direction: "up", time: 1000},
            ],
        }),
    },
    walls: loadWall(collisions),
    cutsceneSpaces: {
        [asGridCoords(13,16)]: [
            {
                events: [
                    { who: "npcMom", type: "stand", direction: "up", time: 1100},
                    { type: "textMessage", text:"Hello Red,"},
                    { type: "textMessage", text:"Welcome to the Pokemon universe."},
                    { who: "npcMom", type: "stand", direction: "down", time: 1000},
                    { type: "textMessage", text:"I hope you'll find hapiness here."},
                    { who: "npcMom", type: "walk", direction: "down"},
                    { who: "npcMom", type: "stand", direction: "down", time: 1100},
                    { type: "textMessage", text:"Take care of you and your Pokemons."},
                    { who: "npcMom", type: "stand", direction: "down", time: 1100},
                    
                    { type: "addStoryFlag", flag: "GAME_INITIALISED"},

                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},

                    { who: "player", type: "walk", direction: "up"},
                ]
            },
            {
                required: ["GAME_INITIALISED"],
                events: [
                    { who: "npcMom", type: "stand", direction: "up", time: 1},
                ]
            },
        ],
        [asGridCoords(13,10)]: [
            {
                events: [
                    { who: "player", type: "stand", direction: "up", time: 100},
                    { who: "player", type: "stand", direction: "right", time: 80},
                    { who: "player", type: "stand", direction: "down", time: 70},
                    { who: "player", type: "stand", direction: "left", time: 60},
                    { who: "player", type: "stand", direction: "up", time: 50},
                    { who: "player", type: "stand", direction: "right", time: 40},
                    { who: "player", type: "stand", direction: "down", time: 30},
                    { who: "player", type: "stand", direction: "left", time: 30},
                    { who: "player", type: "stand", direction: "up", time: 20},
                    { who: "player", type: "stand", direction: "right", time: 20},
                    { who: "player", type: "stand", direction: "down", time: 20},
                    { who: "player", type: "stand", direction: "left", time: 20},
                    { who: "player", type: "stand", direction: "up", time: 20},
                    { who: "player", type: "stand", direction: "right", time: 20},
                    { who: "player", type: "stand", direction: "down", time: 30},
                    { who: "player", type: "stand", direction: "left", time: 30},
                    { who: "player", type: "stand", direction: "up", time: 20},
                    { who: "player", type: "stand", direction: "right", time: 20},
                    { who: "player", type: "stand", direction: "down", time: 20},
                    { who: "player", type: "stand", direction: "left", time: 20},
                    { who: "player", type: "stand", direction: "up", time: 20},
                    { who: "player", type: "stand", direction: "right", time: 20},
                    { 
                        type: "changeMap", 
                        map: "MomHouseSecondFloor",
                        x: withGrid(11),
                        y: withGrid(15),
                        direction: 'right',
                    },
                ]
            }
        ],
        
    }
}