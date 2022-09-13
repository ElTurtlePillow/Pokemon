import React from 'react';
import Person from '../../objects/Person';
import OverworldEvent from '../event/OverworldEvent';
import InteractiveObject from '../../objects/InteractiveObject';
// import PlayerState from '../../state/PlayerState';

import {  nextPosition, wait, withGrid } from '../../../Utils';
// import PlayerAnimation from "../../objects/player_animation/PlayerAnimation"

import { NewGame } from "./maps/new_game/NewGame"

import { PalletTown } from './maps/pallet_town/PalletTown';
import { MomHouseSecondFloor } from './maps/pallet_town/houses/mom_house/second_floor/MomHouseSecondFloor'
import { MomHouseFirstFloor } from './maps/pallet_town/houses/mom_house/first_floor/MomHouseFirstFloor'
import { RivalHouse } from './maps/pallet_town/houses/rival_house/RivalHouse'
import { ChenLab } from './maps/pallet_town/houses/chen_lab/ChenLab'


import { ViridianCity } from './maps/viridian_city/ViridianCity';
import { ViridianPokeCenterFirstFloor } from './maps/viridian_city/houses/poke_center/first_floor/ViridianPokeCenterFirstFloor';
import { ViridianPokeCenterSecondFloor } from './maps/viridian_city/houses/poke_center/second_floor/ViridianPokeCenterSecondFloor';
import { ViridianPokeMarket } from './maps/viridian_city/houses/poke_market/ViridianPokeMarket';
import { ViridianHouseOne } from './maps/viridian_city/houses/house_one/ViridianHouseOne';
import { ViridianHouseTwo} from './maps/viridian_city/houses/house_two/ViridianHouseTwo';

import { ViridianForest} from './maps/viridian_forest/ViridianForest';




export default class OverworldMap extends React.Component { 
    constructor(config) {
        super(config);
        
        this.overworld = null;

        this.gameObjects = {}; // live objects
        this.configObjects = config.configObjects; // config content

        this.music = config.music;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};
        this.grass = config.grass || {};
        this.bump = config.bump || {};

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
            withGrid(14) - cameraPerson.x, 
            withGrid(8) - cameraPerson.y, 
        );
    };
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage, 
            withGrid(14) - cameraPerson.x, 
            withGrid(8) - cameraPerson.y, 
        );
    };

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = nextPosition(currentX, currentY, direction);
        if (this.walls[`${x}, ${y}`]) {
            return true;
        }
        // check for game objects
        return Object.values(this.gameObjects).find(obj => {
            if (obj.x === x && obj.y === y) {return true};
            if (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y) {return true}
            return false
        })
    };

    isWalkingInGrass(currentX, currentY, direction) {
        const { x, y } = nextPosition(currentX, currentY, direction);
        if (this.grass[`${x}, ${y}`]) {
            return true;
        }
    };

    isWalkingOnBump(currentX, currentY, direction) {
        const { x, y } = nextPosition(currentX, currentY, direction);
        if (this.bump[`${x}, ${y}`]) {
            return true;
        }
    };

    mountObjects() {
        Object.keys(this.configObjects).forEach(key => {

            let obj = this.configObjects[key];
            obj.id = key;

            let instance;
            if (obj.type === "Person") {
                instance = new Person(obj)
            }
            if (obj.type === "InteractiveObject") {
                instance = new InteractiveObject(obj)
            }
            this.gameObjects[key] = instance;
            this.gameObjects[key].id = key;
            instance.mount(this);
        });
    };

    async startCutScene(events) {
        this.isCutscenePlaying = true;

        // ignore if nothing
        const player = this.gameObjects["player"];
        const match = this.cutsceneSpaces[ `${player.x},${player.y}` ];
        let ignore = false;

        if (match && match[2] !== undefined) {
        
        Object.keys(window.playerState.storyFlags).forEach(key => {
            if (match[2].nothing && (key === match[2].nothing)) {
                ignore = true;
            }
        })}

        // else create
        if (!ignore) {
            for (let i = 0; i < events.length; i++) {
                const eventHandler = new OverworldEvent({
                    event: events[i],
                    map: this,
                });
                const result = await eventHandler.init();
                if (result === "LOST_BATTLE") {

                    // return to nearest healing
                    const healingSpot = window.playerState.healing;
                    let x, y;
                    if (healingSpot === "MomHouseFirstFloor") {
                        x = 13;
                        y = 19;
                    } else {
                        x = 18;
                        y = 19;
                    }
                    this.startCutScene([
                        { 
                            type: "changeMap", 
                            map: healingSpot,
                            soundEffect: "run",
                            x: withGrid(x),
                            y: withGrid(y),
                            direction: 'up', 
                        },
                        { type: "healing", position: window.playerState.healing},
                    ])
                }
            }
        }
        
        this.isCutscenePlaying = false;
        // reset npcs to their behavior
        // Object.values(this.gameObjects).forEach(obj => obj.doBehaviorEvent(this));
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

    async checkForFootstepCutscene() {
        const player = this.gameObjects["player"];
        const match = this.cutsceneSpaces[ `${player.x},${player.y}` ];

        // walking in grass
        if (this.isWalkingInGrass(player.x, player.y, this.direction)) {

            // const grassAnimation = new PlayerAnimation({
            //     type: "grassSprite"
            // })
            // grassAnimation.init(document.querySelector(".game-container"))

            // start random wild battle
            const combatStartProbability = Math.floor(Math.random() * 100) + 1;
            if (combatStartProbability <= 8) { // 8 is nice, which is nice
                this.startCutScene([{ type: "battle", enemyId: "wild" }]);
                return
            }
        };


        // if required event 
        if (match && match[1] && match[1].required) {
            Object.keys(window.playerState.storyFlags).forEach(key => {
                if (key === match[1].required[0]) {
                    this.startCutScene(match[1].events);
                    return
                }
            })
        } 

        // normal event
        if (!this.isCutscenePlaying && match) {
            this.startCutScene(match[0].events);
            return
        };
    };

    // addWall(x, y) {
    //     this.walls[`${x}, ${y}`] = true;
    // };
    // removeWall(x, y) {
    //     delete this.walls[`${x}, ${y}`];
    // };
    // moveWall(wasX, wasY, direction) {
    //     this.removeWall(wasX, wasY);
    //     const { x, y } = nextPosition(wasX, wasY, direction);
    //     this.addWall(x, y);
    // }
};

window.OverworldMaps = {
    NewGame,

    MomHouseSecondFloor,
    MomHouseFirstFloor,
    PalletTown,
    RivalHouse,
    ChenLab,

    ViridianCity,
    ViridianPokeCenterFirstFloor,
    ViridianPokeCenterSecondFloor,
    ViridianPokeMarket,
    ViridianHouseOne,
    ViridianHouseTwo,
    ViridianForest,
};