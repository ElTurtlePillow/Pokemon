import React from 'react';

import mapImg from "../../assets/map.png"
import playerImg from "../../assets/player.png"
import shadowImg from "../../assets/shadow.png"

export default class Overworld extends React.Component { 
    constructor(config) {
        super(config);

        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        // map
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0,0);
        };
        image.src = mapImg;

        // player
        const x = 2;
        const y = 1;

        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,
                0, // left cut
                0, // top cut
                52, // width cut
                16, // height cut
                x * 32, 
                y * 32 + 16,
                32, // width draw
                16 // height draw
            );
        }
        shadow.src= shadowImg

        const player = new Image();
        player.onload = () => {
            this.ctx.drawImage(
                player,
                0, // left cut
                0, // top cut
                32, // width cut
                48, // height cut
                x * 32, 
                y * 32 - 16,
                32, // width draw
                48 // height draw
            );
        }
        player.src = playerImg;
    }
}