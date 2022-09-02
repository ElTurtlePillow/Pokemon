import React from 'react';

import "./battle.scss"

import Combatant from './combatant/Combatant';
import BattleEvent from './events/BattleEvent';
import TurnCycle from './TurnCycle';

import {pokemon} from "../content/Pokemon"


import playerImg from "./../../assets/graphics/battle/trainers/player.png";
// import rivalImg from "./../../assets/graphics/battle/trainers/rival.png";
import Team from './team/Team';
import PlayerState from '../state/PlayerState';
import { emitEvent } from '../../Utils';


export default class Battle extends React.Component { 
    constructor({enemy, onComplete}) {
        super(enemy)

        this.enemy = enemy;
        this.onComplete = onComplete;

        this.combatants = {};
        
        this.activeCombatants = {
            player: null, // "player1",
            enemy: null, // "enemy1"
        };

        // dynamically add player team
        window.playerState.lineup.forEach(id => {
            this.addCombatant(id, "player", window.playerState.pokemons[id])
        })

        if (this.enemy === "wild") {
            // random combats if grass

        this.addCombatant("e_" + "key", "enemy", 
            {
                pokemonId: "eevee",
                maxHp: 34,
                level: 4,
            },
        );

        } else {
            // load scripted enemy
            // then enemy
            Object.keys(this.enemy.pokemons).forEach((key) => {
			this.addCombatant("e_" + key, "enemy", this.enemy.pokemons[key]);
		});
        }

        

		// add player items
        this.items = [];
		window.playerState.items.forEach((item) => {
			this.items.push({
				...item,
				team: "player",
			});
		});
        this.usedInstanceIds = {};
    };

    addCombatant(id, team, config) {
		this.combatants[id] = new Combatant(
			{
				...pokemon[config.pokemonId],
				...config,
				team,
				isPlayerControlled: team === "player",
			},
			this
		);

		// populate 1st pokemon
		this.activeCombatants[team] = this.activeCombatants[id] || id;
	}


    createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("battle");

        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return true});
            return images;
        }
        const enemiesImg = importAll(require.context('./../../assets/graphics/battle/trainers', false, /\.(png|jpe?g|svg)$/));
        // to do change here to pick up source and not name

		this.element.innerHTML = `
            <div class="player-animation"></div>
            <div class="battle-player">
                <img src=${playerImg} alt="player" />
            </div>
            <div class="enemy-animation"></div>
            <div class="battle-enemy">
                <img src=${enemiesImg[`${this.enemy.name}.png`]} alt=${this.enemy.name} />
            </div>
            <div class="text-container">
            </div>
        `;
        
	}

    init(container) {
        this.createElement();
        container.appendChild(this.element)

        this.playerTeam = new Team("player", "Player")
        this.enemyTeam = new Team("enemy", "Enemy")

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element)

            // add to correct team
			if (combatant.team === "player") {
				this.playerTeam.combatants.push(combatant);
			} else if (combatant.team === "enemy") {
				this.enemyTeam.combatants.push(combatant);
			}
        });

        this.playerTeam.init(this.element);
		this.enemyTeam.init(this.element);

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this);
                    battleEvent.init(resolve);
                })
            },
            onWinner: winner => {

                if (winner === "player") {
                    const playerState = window.playerState;
                    Object.keys(playerState.pokemons).forEach(id => {
                        const playerStatePokemon = playerState.pokemons[id];
                        const combatant = this.combatants[id];
                        if (combatant) {
                            playerStatePokemon.hp = combatant.hp;
                            playerStatePokemon.xp = combatant.xp;
                            playerStatePokemon.maxXp = combatant.maxXp;
                            playerStatePokemon.level = combatant.level;
                        };
                    });
                    // get rid of player used items
					playerState.items = playerState.items.filter((item) => {
						return !this.usedInstanceIds[item.instanceId];
					});

					// send signal to update
					emitEvent("PlayerStateUpdated");
                };
                

                // animate ending battle here
                this.element.remove();
                this.onComplete(winner === "player");
            }
        })
        this.turnCycle.init();
    };
};