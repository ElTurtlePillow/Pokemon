import React from 'react';

import Sprite from "./Sprite";
import playerImg from "../../assets/player.png";

export default class GameObject extends React.Component { 
    constructor(config) {
        super(config);
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || playerImg,
        });

        this.id = null;
    }

    update() {

    }
};