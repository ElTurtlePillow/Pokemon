import React from 'react';

import lowerImg from "../../../assets/map.png";
import upperImg from "../../../assets/mapupper.png";

import momImg from "../../../assets/mother.png";
import { loadWall, nextPosition, withGrid } from '../../../Utils';
import Person from '../../objects/Person';

import { collisions } from './MapCollision';

export default class OverworldMap extends React.Component { 
    constructor(config) {
        super(config);
        
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
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
        Object.values(this.gameObjects).forEach(obj => {

            // to do : determine if the object can be mount
            obj.mount(this);
        });
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
                src: momImg
            })
        },
        walls: loadWall(collisions)
    },
    MomHouse: {
        lowerSrc: lowerImg,
        upperSrc: upperImg,
        gameObjects: {
            player: new Person({
                x: withGrid(5),
                y: withGrid(5),
            }),
            npcMom: new Person({
                x: withGrid(3),
                y: withGrid(3),
                src: momImg
            }),
        }
    },
};