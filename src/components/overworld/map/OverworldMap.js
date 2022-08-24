import React from 'react';
import Person from '../../objects/Person';

import lowerImg from "../../../assets/map.png";
import upperImg from "../../../assets/mapupper.png";

import momImg from "../../../assets/mother.png";
import npcAImg from "../../../assets/npcA.png"

import { collisions } from './MapCollision';
import { loadWall, nextPosition, withGrid } from '../../../Utils';
import OverworldEvent from '../event/OverworldEvent';

export default class OverworldMap extends React.Component { 
    constructor(config) {
        super(config);
        
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
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

        for (let i = 0; i < events.length; i ++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            });
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;
        // reset npcs to their behavior
        Object.values(this.gameObjects).forEach(obj => obj.doBehaviorEvent(this))
    }

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
                ]
            }),
            npcA: new Person({
                x: withGrid(10),
                y: withGrid(5),
                src: npcAImg,
                behaviorLoop: [
                    { type: "stand", direction: "right", time: 2000 },
                    // { type: "stand", direction: "right", time: 3000},
                    // { type: "walk", direction: "up" },
                    // { type: "walk", direction: "left" },
                    // { type: "stand", direction: "down", time: 3000},
                    { type: "stand", direction: "down", time: 3000},
                ]
            })
        },
        walls: loadWall(collisions)
    },
    // MomHouse: {
    //     lowerSrc: lowerImg,
    //     upperSrc: upperImg,
    //     gameObjects: {
    //         player: new Person({
    //             x: withGrid(5),
    //             y: withGrid(5),
    //         }),
    //         npcMom: new Person({
    //             x: withGrid(3),
    //             y: withGrid(3),
    //             src: momImg
    //         }),
    //     }
    // },
};