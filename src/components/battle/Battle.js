import React from 'react';

import "./battle.scss"

import Combatant from './combatant/Combatant';
import BattleEvent from './events/BattleEvent';
import TurnCycle from './TurnCycle';

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
                hp: 50,
                maxHp: 50,
                xp: 75,
                maxXp: 100,
                level: 5,
                status: null,
                isPlayerControlled: true,
            }, this),
            "player2": new Combatant({
                ...pokemon.bulbasaur,
                team: "player",
                hp: 50,
                maxHp: 50,
                xp: 75,
                maxXp: 100,
                level: 5,
                status: null,
                isPlayerControlled: true,
            }, this),

            "enemy1": new Combatant({
                ...pokemon.charmander,
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 0,
                level: 5,
                status: null,
            }, this),

            "enemy2": new Combatant({
                ...pokemon.eevee,
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 0,
                level: 5,
                status: null,
            }, this)
        };
        this.activeCombatants = {
            player: "player1",
            enemy: "enemy1"
        };
        this.items = [
            { itemId: "FULLHEAL", instanceId: "p1", team: "player"},
            { itemId: "FULLHEAL", instanceId: "p2", team: "player"},
            { itemId: "POTION", instanceId: "p3", team: "player"},
            { itemId: "FULLHEAL", instanceId: "p4", team: "enemy"},
        ]
    };


    createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("battle");

		this.element.innerHTML = `
            <div class="player-animation"></div>
            <div class="battle-player">
                <img src=${playerImg} alt="player" />
            </div>
            <div class="enemy-animation"></div>
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

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this);
                    battleEvent.init(resolve);
                })
            }
        })
        this.turnCycle.init();
    };
};