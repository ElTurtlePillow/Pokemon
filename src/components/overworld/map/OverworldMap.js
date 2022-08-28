import React from 'react';
import Person from '../../objects/Person';

import lowerImg from "../../../assets/graphics/maps/map.png";
import upperImg from "../../../assets/graphics/maps/mapupper.png";

import demoRimg from "../../../assets/graphics/maps/map1.png"
import demoRimup from "../../../assets/graphics/maps/map1d.png"

import momImg from "../../../assets/graphics/characters/mother.png";
import npcAImg from "../../../assets/graphics/characters/npcA.png";

import { collisions } from './MapCollision';
import { asGridCoords, loadWall, nextPosition, withGrid } from '../../../Utils';
import OverworldEvent from '../event/OverworldEvent';

import PlayerState from '../../state/PlayerState';

import InteractiveObject from '../../objects/InteractiveObject';

export default class OverworldMap extends React.Component { 
    constructor(config) {
        super(config);
        
        this.overworld = null;

        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
        this.isPaused = false;
    };

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage, 
            withGrid(7) - cameraPerson.x, 
            withGrid(4) - cameraPerson.y, 
        );
    };
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage, 
            withGrid(7) - cameraPerson.x, 
            withGrid(4) - cameraPerson.y, 
        );
    };

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = nextPosition(currentX, currentY, direction);
        return this.walls[`${x}, ${y}`] || false;
    };

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {

            let obj = this.gameObjects[key];
            obj.id = key;

            // to do : determine if the object can be mount
            obj.mount(this);
        });
    };

    async startCutScene(events) {
        this.isCutscenePlaying = true;

		for (let i = 0; i < events.length; i++) {
			const eventHandler = new OverworldEvent({
				event: events[i],
				map: this,
			});
            const result = await eventHandler.init();
            if (result === "LOST_BATTLE") {
                break;
            }
        }

        this.isCutscenePlaying = false;
        // reset npcs to their behavior
        Object.values(this.gameObjects).forEach(obj => obj.doBehaviorEvent(this));
    }

    checkForActionCutscene() {
		const player = this.gameObjects["player"];
		const nextCoords = nextPosition(player.x, player.y, player.direction);
		const match = Object.values(this.gameObjects).find((object) => {
			return `${object.x}, ${object.y}` === `${nextCoords.x}, ${nextCoords.y}`;
		});
		if (!this.isCutscenePlaying && match && match.talking.length) {

            const relevantScenario = match.talking.find((scenario) => {
                return (scenario.required || []).every((sf) => {
                    return window.playerState.storyFlags[sf]
                })
            })

            relevantScenario && this.startCutScene(relevantScenario.events);
        };
	};

    checkForFootstepCutscene() {
        const player = this.gameObjects["player"];
        const match = this.cutsceneSpaces[ `${player.x},${player.y}` ];
        if (!this.isCutscenePlaying && match) {
          this.startCutScene(match[0].events);
        };
    };

    addWall(x, y) {
        this.walls[`${x}, ${y}`] = true;
    };
    removeWall(x, y) {
        delete this.walls[`${x}, ${y}`];
    };
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const { x, y } = nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }
};

window.OverworldMaps = {
    DemoRoom: {
        id: "DemoRoom",
        lowerSrc: lowerImg,
        upperSrc: upperImg,
        gameObjects: {
            player: new Person({
                isPlayerControlled: true,
                x: withGrid(4),
                y: withGrid(4)
            }),
            npcMom: new Person({
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
            npcA: new Person({
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
            interactiveObject: new InteractiveObject({
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
    },
    DemoMo: {
        id: "DemoMo",
        lowerSrc: demoRimg,
        upperSrc: demoRimup,
        gameObjects: {
            player: new Person({
                isPlayerControlled: true,
                x: withGrid(-1),
                y: withGrid(-1),
            }),
            npcMom: new Person({
                x: withGrid(3),
                y: withGrid(3),
                src: momImg,
                talking : [
                    {
                        events: [
                            { type: "textMessage", text: "Love u", facePlayer: "npcMom"},
                        ]
                    }
                ]
            }),
        }
    },
};