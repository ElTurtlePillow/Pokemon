import React from 'react';
import "./client-events.scss"

export default class ClientsEvents extends React.Component { 
    constructor(config) {
        super(config);

        this.element = null;
	}


	createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("client-events");
        const scene = `
            <div class=${this.props.event}></div>
        `
        this.element.innerHTML += scene;
	}

	init(container) {
		this.createElement();
		container.appendChild(this.element);
	}
}