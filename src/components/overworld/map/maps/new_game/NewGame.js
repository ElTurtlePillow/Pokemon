import { collisions } from './MapCollision';

import { asGridCoords, loadWall, nextPosition, withGrid } from '../../../../../Utils';

import lowerImg from "../../../../../assets/graphics/maps/new_game/down.png";
import upperImg from "../../../../../assets/graphics/maps/new_game/up.png";

import momImg from "../../../../../assets/graphics/characters/mom.png";
import musicBg from "../../../../../assets/audio/background_music/PalletTown.ogg"


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
                    { type: "textMessage", text:"Don't be afraid."},
                    { who: "npcMom", type: "stand", direction: "down", time: 1000},
                    { type: "textMessage", text:"A great journey awaits you."},
                    { type: "textMessage", text:"I hope you find the way..."},
                    { who: "npcMom", type: "stand", direction: "down", time: 1000},
                    { type: "textMessage", text:"The Pokemon world is going through a big change."},
                    { who: "npcMom", type: "walk", direction: "down"},
                    { who: "npcMom", type: "stand", direction: "down", time: 1100},
                    { type: "textMessage", text:"I think you will make the right choices."},
                    { type: "textMessage", text:"For you and your Pokemons."},
                    { who: "npcMom", type: "stand", direction: "down", time: 700},
                    { type: "textMessage", text:"Be careful in this peaceful lands."},
                    { who: "npcMom", type: "stand", direction: "down", time: 1100},
                    
                    { type: "addStoryFlag", flag: "GAME_INITIALISED"},

                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},
                    { who: "npcMom", type: "walk", direction: "up"},

                    
                    { who: "npcMom", type: "stand", direction: "down", time: 9},

                    { who: "player", type: "walk", direction: "up"},
                ]
            },
            {
                required: ["//"],
            },
            {
                nothing: "MIMIKYU_JOIN_TEAM",
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
                        changeMusic: musicBg,
                        x: withGrid(11),
                        y: withGrid(15),
                        direction: 'right',
                    },
                ]
            }
        ],
        
    }
}



// set up 
// import { collisions } from './MapCollision';


// import lowerImg from "../../../../../assets/graphics/maps/demo/map.png";
// import upperImg from "../../../../../assets/graphics/maps/demo/mapupper.png";

// import momImg from "../../../../../assets/graphics/characters/mother.png";
// import npcAImg from "../../../../../assets/graphics/characters/npcA.png";


// import { asGridCoords, loadWall, nextPosition, withGrid } from '../../../../../Utils';

// export const DemoRoom = {
//     id: "DemoRoom",
//     lowerSrc: lowerImg,
//     upperSrc: upperImg,
//     gameObjects: {},
//     configObjects: {
//         player: ({
//             type: "Person",
//             isPlayerControlled: true,
//             x: withGrid(4),
//             y: withGrid(4)
//         }),
//         npcMom: ({
//             type: "Person",
//             x: withGrid(6),
//             y: withGrid(3),
//             src: momImg,
//             behaviorLoop: [
//                 { type: "stand", direction: "down", time: 1},
//                 { type: "walk", direction: "up", },
//                 { type: "walk", direction: "right", },
//                 { type: "walk", direction: "down", },
//                 { type: "walk", direction: "left", },
//             ],
//             talking : [
//                 {
//                     events: [
//                         { type: "textMessage", text: "Hello world", facePlayer: "npcA" },
//                         { type: "addStoryFlag", flag:"TALKD_TO_MOM"},
//                     ]
//                 }
//             ]
//         }),
//         npcA: ({
//             type: "Person",
//             x: withGrid(10),
//             y: withGrid(5),
//             src: npcAImg,
//             behaviorLoop: [
//                 { type: "stand", direction: "right", time: 2000 },
//                 { type: "stand", direction: "down", time: 3000},
//             ],
//             talking : [
//                 {
//                     required: ["TALKD_TO_MOM"],
//                     events: [
//                         { type: "textMessage", text: "Well well well", facePlayer: "npcA"},
//                     ]
//                 },
//                 {
//                     events: [
//                         { type: "textMessage", text: "My pokemons are the best !", facePlayer: "npcA"},
//                         { type: "battle", enemyId: "beth" },
//                         { type: "addStoryFlag", flag: "DEFEATED_BETH"},
//                         { type: "textMessage", text: "You're the king bro", facePlayer: "npcA"},
//                     ]
//                 }
//             ]
//         }),
//         interactiveObject: ({
//             type: "InteractiveObject",
//             x: withGrid(2),
//             y: withGrid(8),
//             storyFlag: "USED_INTERACTIVE_OBJECT",
//             pokemons: ["pikachu"]
//         })
//     },
//     walls: loadWall(collisions),
//     cutsceneSpaces: {
//         [asGridCoords(1,1)]: [
//             {
//                 events: [
//                     { who: "player", type: "walk", direction: "right"},
//                     { type: "textMessage", text:"Sionop rg r ger eg erzger ezrgz ethezth zeth zth eth zerh ze"},
//                 ]
//             }
//         ],
//         [asGridCoords(7, 7)]: [
//             {
//                 events: [
//                     { 
//                         type: "changeMap", 
//                         map: "DemoMo",
//                         x: withGrid(2),
//                         y: withGrid(0),
//                         direction: 'up',
//                     },
//                 ]
//             }
//         ]
//     }
// }