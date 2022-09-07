import React from 'react';
import { emitEvent, wait } from '../../../../../Utils';
import "./healing.scss"

// reimplement scenetransition duration

export default class Healing extends React.Component { 
    constructor(config) {
        super(config);

        this.element = null;
	}
	createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("healing-transition");
	}

	fadeOut() {
		this.element.classList.add("fade-out");

			wait(3300)
			this.element.remove();
	}

	init(container) {
		this.createElement();
		container.appendChild(this.element);
		Object.values(window.playerState.pokemons).forEach((c) => {
			c.hp = c.maxHp;
		});
		window.playerState.healing = "";
		emitEvent("PlayerStateUpdated");
	}
};