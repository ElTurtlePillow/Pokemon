import React from 'react';

import shadowImg from "../../assets/graphics/characters/shadow.png";
import { withGrid } from '../../Utils';

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
        this.animation = config.animation || {
            "idle-down": [[0,0]],
            "idle-up": [[0,3]],
            "idle-left": [[0,1]],
            "idle-right": [[0,2]],
            
            "walk-down": [[1,0], [0,0], [3,0], [0,0]],
            "walk-up": [[1,3], [0,3], [3,3], [0,3]],
            "walk-left": [[1,1], [0,1], [3,1], [0,1]],
            "walk-right": [[1,2], [0,2], [3,2], [0,2]],
        };
        this.currentAnimation = "idle-left" // config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;


        this.animationFrameLimit = config.animationFrameLimit || 24; // frame speed
        this.animationFrameProgress = this.animationFrameLimit;

        // ref game object
        this.gameObject = config.gameObject;
    };

    get frame() {
        return this.animation[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        // downtick time 
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        // reset counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x + withGrid(7) - cameraPerson.x; 
        const y = this.gameObject.y - 16 + withGrid(4) - cameraPerson.y;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(
            this.image,
            frameX * 32, 
            frameY * 48,
            32, 
            48,
            x,
            y,
            32,
            48
        )
        
        this.updateAnimationProgress();
    };
};