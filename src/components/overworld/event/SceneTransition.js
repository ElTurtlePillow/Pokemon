import React from 'react';
import "./scene-transition.scss"

// reimplement scenetransition duration

export default class SceneTransition extends React.Component { 
    constructor(config) {
        super(config);

        this.element = null;
	}
	createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("scene-transition");
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
};