import React from 'react';

import OverworldMap from './map/OverworldMap';
import DirectionInputs from '../player_inputs/DirectionInputs';
import KeyPressListener from '../player_inputs/KeyPressListener';

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


            const fps = 120;
            setTimeout(() => {
            requestAnimationFrame(() => {
                step();
            })
            }, 1000 / fps);
        }
        step();
    }
    
    bindActionInput() {
        new KeyPressListener("Enter", () => {this.map.checkForActionCutscene()})
        new KeyPressListener("Space", () => {this.map.checkForActionCutscene()})
    }

    bindPlayerPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "player") {
                this.map.checkForFootstepCutscene();
            }
        })
    }

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig)
        this.map.overworld = this;
        this.map.mountObjects();
    }

    init() {
        this.startMap(window.OverworldMaps.DemoRoom);

        this.bindActionInput();
        this.bindPlayerPositionCheck();

        this.directionInput = new DirectionInputs();
        this.directionInput.init();


        this.startGameLoop();

        // this.map.startCutScene([
        //     {type : "battle", enemyId: "beth"},
        // ]);
    };
};