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

			wait(4000)
			this.element.remove();
	}

	init(container) {
		this.createElement();
		container.appendChild(this.element);
		(console.log(window.playerState.pokemons))
		Object.values(window.playerState.pokemons).forEach((c) => {
			c.hp = c.maxHp;
		});
		console.log(this.element);
		window.playerState.healing = "";
		emitEvent("PlayerStateUpdated");
	}
};