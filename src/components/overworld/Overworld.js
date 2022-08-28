import React from 'react';

import Progress from "../progress/Progress"

import OverworldMap from './map/OverworldMap';
import DirectionInputs from '../player_inputs/DirectionInputs';
import KeyPressListener from '../player_inputs/KeyPressListener';
import Hud from "./hud/Hud"

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


            // FPS
            if (!this.map.isPaused) {
                const fps = 120;
                setTimeout(() => {
                requestAnimationFrame(() => {
                    step();
                })
                }, 1000 / fps);
            }
        }
        step();
    }
    
    bindActionInput() {
        new KeyPressListener("Enter", () => {this.map.checkForActionCutscene()})
        new KeyPressListener("Space", () => {this.map.checkForActionCutscene()})
        new KeyPressListener("Escape", () => {
            if (!this.map.isCutscenePlaying) {
                this.map.startCutScene([
                    {type: "pause"}
                ])
            }
        })
    }

    bindPlayerPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "player") {
                this.map.checkForFootstepCutscene();
            }
        })
    }

    startMap(mapConfig, playerInitialState=null) {
        this.map = new OverworldMap(mapConfig)
        this.map.overworld = this;
        this.map.mountObjects();

        if (playerInitialState) {
            const {player} = this.map.gameObjects;
            this.map.removeWall(player.x, player.y)
            player.x = playerInitialState.x;
            player.y = playerInitialState.y;
            player.direction = playerInitialState.direction;
            this.map.addWall(player.x, player.y)

        }

        this.progress.mapId = mapConfig.id;
        this.progress.startingPlayerX = this.map.gameObjects.player.x;
        this.progress.startingPlayerY = this.map.gameObjects.player.y;
        this.progress.startingPlayerDirection = this.map.gameObjects.player.direction;
    }

    init() {

        // create progress tracker
        this.progress = new Progress();

        // saved data?
        let initialPlayerState = null;
        const saveFile = this.progress.getSaveFile();
        if (saveFile) {
            this.progress.load();
            initialPlayerState = {
                x: this.progress.startingPlayerX,
                y: this.progress.startingPlayerY,
                direction: this.progress.startingPlayerDirection,
            }
        }

        // load the hud
        this.hud = new Hud();
        this.hud.init(document.querySelector(".game-container"))

        // start 1st map
        console.log(this.progress.mapId);
        this.startMap(window.OverworldMaps[this.progress.mapId], initialPlayerState);

        // create controls
        this.bindActionInput();
        this.bindPlayerPositionCheck();

        this.directionInput = new DirectionInputs();
        this.directionInput.init();

        // launch
        this.startGameLoop();

        // this.map.startCutScene([
        //     {type : "battle", enemyId: "beth"},
        // ]);
    };
};