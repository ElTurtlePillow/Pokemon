import React from 'react';

import GameObject from "../objects/GameObject";

import mapImg from "../../assets/map.png";
import playerImg from "../../assets/player.png";
import momImg from "../../assets/mother.png";

import OverworldMap from './map/OverworldMap';
import DirectionInputs from '../player_inputs/DirectionInputs';

export default class Overworld extends React.Component { 
    constructor(config) {
        super(config);

        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            // clear
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            
            // draw lower layer
            this.map.drawLowerImage(this.ctx);
            // draw game objects
            Object.values(this.map.gameObjects).forEach(obj => {
                obj.update({
                    arrow: this.directionInput.direction,
                })
                obj.sprite.draw(this.ctx);
            });
            // draw upper layer
            this.map.drawUpperImage(this.ctx);

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverworldMap(
            window.OverworldMaps.DemoRoom,
        )
        this.directionInput = new DirectionInputs();
        this.directionInput.init();


        this.startGameLoop();
    };
};