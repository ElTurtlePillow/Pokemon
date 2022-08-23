import React from 'react';

import shadowImg from "../../assets/shadow.png";

export default class Sprite extends React.Component { 
    constructor(config) {
        super(config);

        // set up the img
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // shadow
        this.shadow = new Image();
        this.useShadow = true;
        if (this.useShadow) {
            this.shadow.src = shadowImg;
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        // configure animation
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ],
            // walkDown: [
            //     [0,0], [1,0], [2,0], [3,0]
            // ],
        };
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        // ref game object
        this.gameObject = config.gameObject;
    };

    draw(ctx) {
        const x = this.gameObject.x;
        const y = this.gameObject.y - 16;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

        this.isLoaded && ctx.drawImage(
            this.image,
            0,
            0,
            32, 
            48,
            x,
            y,
            32,
            48
        )
    };
    
};