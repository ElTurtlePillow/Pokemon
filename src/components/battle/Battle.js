import React from 'react';

export default class Battle extends React.Component { 
    constructor(config) {

    };

    createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("battle");

		this.element.innerHTML = `
            <div class="battle-player">
                <img src=${0} alt="player" />
            </div>
            <div class="battle-enemy">
                <img src="${0}" alt=${0} />
            </div>
            <div class="text-container">
            </div>
        `;
	}

    init(container) {};
};