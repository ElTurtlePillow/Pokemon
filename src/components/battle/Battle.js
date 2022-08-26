import React from 'react';
import "./battle.scss"
import Combatant from './combatant/Combatant';

import {pokemon} from "../content/Pokemon"


import playerImg from "./../../assets/graphics/battle/trainers/player.png";
import rivalImg from "./../../assets/graphics/battle/trainers/rival.png";


export default class Battle extends React.Component { 
    constructor(config) {
        super(config)

        this.combatants = {
            "player1": new Combatant({
                ...pokemon.pikachu,
                team: "player",
                hp: 25,
                maxHp: 50,
                xp: 75,
                maxXp: 100,
                level: 1,
                status: null,
            }, this),

            "enemy1": new Combatant({
                ...pokemon.charmander,
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 0,
                level: 1,
                status: null,
            }, this),

            "enemy2": new Combatant({
                ...pokemon.eevee,
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 0,
                level: 1,
                status: null,
            }, this)
        }
        this.activeCombatants = {
            player: "player1",
            enemy: "enemy1"
        }
    };


    createElement() {
        console.log(pokemon);
		this.element = document.createElement("div");
		this.element.classList.add("battle");

		this.element.innerHTML = `
            <div class="battle-player">
                <img src=${playerImg} alt="player" />
            </div>
            <div class="battle-enemy">
                <img src="${rivalImg}" alt=${0} />
            </div>
            <div class="text-container">
            </div>
        `;
	}

    init(container) {
        this.createElement();
        container.appendChild(this.element)

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element)
        })
    };
};