import React from 'react';
import Combatant from '../../battle/combatant/Combatant';
import { pokemon }  from '../../content/Pokemon'; 
import "./hud.scss"

export default class Hud extends React.Component { 
    constructor() {
        super();
        this.scoreboards = [];
    }

    update() {
		this.scoreboards.forEach((scoreboard) => {
			scoreboard.update(window.playerState.pokemons[scoreboard.id]);
		});
	}

	createElement() {
		if (this.element) {
			this.element.remove();
			this.scoreboards = [];
		}

		this.element = document.createElement("div");
		this.element.classList.add("hud");

        const {playerState} = window;
        playerState.lineup.forEach(key => {
            const pokemonsPlayer = playerState.pokemons[key];
			if (pokemonsPlayer) {
            const scoreboard = new Combatant({
                id: key,
                ...pokemon[pokemonsPlayer.pokemonId],
                ...pokemonsPlayer,
            }, null)
			
            scoreboard.createElement();
            this.scoreboards.push(scoreboard);
            this.element.appendChild(scoreboard.hudElement)
		}
        })
        this.update()
	}

	init(container) {
		this.createElement();
		container.appendChild(this.element);

        document.addEventListener("PlayerStateUpdated", () => {
			this.update();
		});

		document.addEventListener("LineupChanged", () => {
			this.createElement();
			container.appendChild(this.element);
		});
	}
};