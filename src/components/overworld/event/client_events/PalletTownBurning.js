import React from 'react';
import "./pallet-town-burning.scss"

import full from "../../../../assets/graphics/events/pallet_town_burn/full.gif"

export default class PalletTownBurning extends React.Component { 
    constructor(config) {
        super(config);

        this.element = null;
	}
	createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("pallet-town-burning");
        const scene = `
            <img src="${full}" class="explosion one" alt="explosion" />
        `
        this.element.innerHTML += scene;
	}

	fadeOut() {
		this.element.classList.add("fade-out");
		this.element.addEventListener(
			"animationend",
			() => {
				this.element.remove();
			},
			{ once: true }
		);
	}

	init(container, callback) {
		this.createElement();
		container.appendChild(this.element);

		this.element.addEventListener(
			"animationend",
			() => {
				callback();
			},
			{ once: true }
		);
	}
}