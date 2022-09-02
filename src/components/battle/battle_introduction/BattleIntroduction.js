import React from 'react';
import './battle-introduction.scss'

export default class Battle extends React.Component { 
    constructor(config) {
        super(config)

    }
    createElement() {
        console.log("battle");
		this.element = document.createElement("div");
		this.element.classList.add("battle-introduction");

		this.element.innerHTML = `
            <div class="battle-introduction_animation"></div>
        `;
        
	}

    init(container) {
        this.createElement();
        container.appendChild(this.element)
    };
};