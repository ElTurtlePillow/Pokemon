import React from 'react';


export default class ClientsEvents extends React.Component { 
    constructor(config) {
        super(config);

        this.element = null;
	}
	createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("client-events");
        const scene = `
            <div></div>
        `
        this.element.innerHTML += scene;
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