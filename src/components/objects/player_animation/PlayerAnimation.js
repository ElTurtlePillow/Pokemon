import React from 'react';
import "./player-animation.scss"

import grassSprite from "../../../assets/graphics/characters/grassSprite.png"

export default class PlayerAnimation extends React.Component { 
    constructor({type}) {
        super(type);

        this.type = type;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("grass-animation");
        this.element.innerHTML= (`
            <img src=${grassSprite} alt="grass animation" />
        `);

        setTimeout(() => {
            this.close()
        }, 300)
    }

    close() {
        this.element.remove()
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
};