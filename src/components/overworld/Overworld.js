import React from 'react';

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

            // establish camera person (or anything)
            const cameraPerson = this.map.gameObjects.player;

            // update all objects
            Object.values(this.map.gameObjects).forEach(obj => {
                // if too much objects handle here to do
                obj.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })
            
            // draw lower layer
            this.map.drawLowerImage(this.ctx, cameraPerson);
            // draw game objects
            Object.values(this.map.gameObjects).sort((a, b) => {
                return a.y - b.y;
            }).forEach(obj => {
                obj.sprite.draw(this.ctx, cameraPerson);
            });
            // draw upper layer
            this.map.drawUpperImage(this.ctx, cameraPerson);


            const fps = 90;
            setTimeout(() => {
            requestAnimationFrame(() => {
                step();
            })
            }, 1000 / fps);
        }
        step();
    }
    

    init() {
        this.map = new OverworldMap(
            window.OverworldMaps.DemoRoom,
        )
        this.map.mountObjects();
        this.directionInput = new DirectionInputs();
        this.directionInput.init();


        this.startGameLoop();

        // this.map.startCutScene([
        //     { who:"player", type: "walk", direction: "up", },
        //     { who:"player", type: "walk", direction: "up", },
        //     { who:"npcA", type: "walk", direction: "right", },
        // ]);
    };
};