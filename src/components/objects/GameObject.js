import React from 'react';

import Sprite from "./Sprite";
import OverworldEvent from '../overworld/event/OverworldEvent';

import playerImg from "../../assets/graphics/characters/player.png";

export default class GameObject extends React.Component { 
    constructor(config) {
        super(config);

        this.id = null;

        this.isMaounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || playerImg,
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

        this.talking = config.talking || [];
    };

    mount(map) {
        this.isMaounted = true;
        map.addWall(this.x, this.y);

        // start behavior after n sec
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 1);
    };

    update() {};

    async doBehaviorEvent(map) {
        // stop if cutscene
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
            return;
        };

        // event with info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        // create event instance
        const eventHandler = new OverworldEvent({ map, event: eventConfig });
        await eventHandler.init();

        // setting next event
        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0;
        };

        this.doBehaviorEvent(map);
    };
};