import React from 'react';

import GameObject from "../../objects/GameObject";

import lowerImg from "../../../assets/map.png";
import upperImg from "../../../assets/mapupper.png";

import momImg from "../../../assets/mother.png";
import { withGrid } from '../../../Utils';
import Person from '../../objects/Person';

export default class OverworldMap extends React.Component { 
    constructor(config) {
        super(config);
        
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }
    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }
};

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: lowerImg,
        upperSrc: upperImg,
        gameObjects: {
            player: new Person({
                isPlayerControlled: true,
                x: withGrid(5),
                y: withGrid(6)
            }),
            npcMom: new Person({
                x: withGrid(3),
                y: withGrid(3),
                src: momImg
            })
        }
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
}