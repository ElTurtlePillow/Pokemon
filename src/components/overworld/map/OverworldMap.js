import React from 'react';
import Person from '../../objects/Person';
import OverworldEvent from '../event/OverworldEvent';
import InteractiveObject from '../../objects/InteractiveObject';
import PlayerState from '../../state/PlayerState';

import {  nextPosition, withGrid } from '../../../Utils';

import { NewGame } from "./maps/new_game/NewGame"

import { MomHouseSecondFloor } from './maps/pallet_town/houses/mom_house/second_floor/MomHouseSecondFloor'
import { MomHouseFirstFloor } from './maps/pallet_town/houses/mom_house/first_floor/MomHouseFirstFloor'

import { RivalHouse } from './maps/pallet_town/houses/rival_house/RivalHouse'
import { ChenLab } from './maps/pallet_town/houses/chen_lab/ChenLab'

import { PalletTown } from './maps/pallet_town/PalletTown';

// import { DemoRoom } from './maps/demo/DemoRoom';


export default class OverworldMap extends React.Component { 
    constructor(config) {
        super(config);
        
        this.overworld = null;

        this.gameObjects = {}; // live objects
        this.configObjects = config.configObjects; // config content

        this.music = config.music;
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

    checkForFootstepCutscene() {
        const player = this.gameObjects["player"];
        const match = this.cutsceneSpaces[ `${player.x},${player.y}` ];
        if (!this.isCutscenePlaying && match) {
          this.startCutScene(match[0].events);
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
};