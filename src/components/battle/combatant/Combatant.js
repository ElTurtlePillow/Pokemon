import React from 'react';
import "./combatant.scss"

import supportImg from "../../../assets/graphics/battle/battlebacks/field_base.png"
import { randomFromArray } from '../../../Utils';

export default class Combatant extends React.Component { 
    constructor(config, battle) {
        super(config)

        Object.keys(config).forEach(key => {
            this[key] = config[key]
        })
        
        this.hp = typeof this.hp === "undefined" ? this.maxHp : this.hp;
		this.battle = battle;
    };

    get hpPercent() {
		const percent = (this.hp / this.maxHp) * 100;
		return percent > 0 ? percent : 0;
	}
	get xpPercent() {
		return (this.xp / this.maxXp) * 100;
	}

	get isActive() {
		return this.battle?.activeCombatants[this.team] === this.id;
	}

	get givesXp() {
		return this.level * this.BaseEXP;
	}
      

    createElement() {
        // display pokemon's info
		this.hudElement = document.createElement("div");
		this.hudElement.classList.add("combatant");
		this.hudElement.setAttribute("data-combatant", this.id);
		this.hudElement.setAttribute("data-team", this.team);


		// get ico for overworl hud
        const icoImage = importAll(require.context('../../../assets/graphics/pokemon/icons', false, /\.(png|jpe?g|svg)$/));

		this.hudElement.innerHTML = `
            <p class="combatant_name">${this.Name}</p>
            <p class="combatant_status"></p>
            <p class="combatant_level">Lv<span class="combatant-lvl"></span></p>

            <div class="life">
                <div class="life-container">
                    <p class="php">HP</p>
                    <div class="combatant_life-container"></div>
                </div>
                ${this.team === "player" ? `<p class="hp-number"></p>` : ""}
            </div>

            ${this.team === "player" ? 
                `<div class="xp-container">
                    <p>EXP</p>
                    <div class="xpx">
                        <div class="combatant_xp-container"></div>
                    </div>
                </div>` 
                : ""
            }
            
            <img class="support" src=${supportImg} alt="support" data-team=${this.team} />
            <img class="combatant_icon" src=${icoImage[`${this.InternalName}.png`]} alt="${this.Name}" />
        `;

		this.hpFills = this.hudElement.querySelectorAll(".combatant_life-container");
		this.hpNumber = this.hudElement.querySelector(".hp-number");
		this.xpFills = this.hudElement.querySelectorAll(".combatant_xp-container");

		// display pokemon
        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return true});
            return images;
        }
        const frontImages = importAll(require.context('../../../assets/graphics/pokemon/front', false, /\.(png|jpe?g|svg)$/));
        const backImage = importAll(require.context('../../../assets/graphics/pokemon/back', false, /\.(png|jpe?g|svg)$/));

		
		this.pokemonContainer = document.createElement("div")
		this.pokemonContainer.classList.add("pokemon-container")
		this.pokemonContainer.setAttribute("data-team", this.team);

		this.pokemonElement = document.createElement("img");
		this.pokemonElement.classList.add("pokemon");
		if (this.team === "enemy") {
			this.pokemonElement.setAttribute("src", frontImages[`${this.InternalName}.png`]);
		} else if (this.team === "player") {
			this.pokemonElement.setAttribute("src", backImage[`${this.InternalName}.png`]);
		}
		this.pokemonElement.setAttribute("alt", this.Name);
		this.pokemonElement.setAttribute("data-team", this.team);
    }

    update(changes={}) {
        Object.keys(changes).forEach((key) => {
			this[key] = changes[key];
		});

        // update activ flag
		this.hudElement.setAttribute("data-active", this.isActive);
		this.pokemonElement.setAttribute("data-active", this.isActive);

        // update hp and xp
		if (this.hpNumber) {
			if (this.hp < 0) this.hp = 0;
			this.hpNumber.innerText = `${this.hp}/${this.maxHp}`;
		}
		this.hpFills.forEach((fill) => (fill.style.width = `${this.hpPercent}%`));
		this.xpFills.forEach((fill) => (fill.style.width = `${this.xpPercent}%`));

        // update lvl
		this.hudElement.querySelector(".combatant-lvl").innerText = this.level;

        // update status
        const statusElement = this.hudElement.querySelector(".combatant_status");
		if (this.status) {
			statusElement.innerText = this.status.type;
			statusElement.setAttribute("data-status", this.status.type);
			statusElement.style.display = "block";
		} else {
			statusElement.innerText = "";
			statusElement.style.display = "none";
		}
    }

    getReplacedEvents(originalEvents) {
		if (this.status?.type === "par" && randomFromArray([0,0,1])) {
			return [
				{
					type: "textMessage",
					text: `${this.Name} is paralised, ha can't attack !`,
				},
			];
		}
		return originalEvents;
	}

    getPostsEvents() {
        if (this.status?.type === "hea") {
			return [
				{
					type: "textMessage",
					text: "{USER} is healing",
				},
				{
					type: "stateChange",
					recover: 5,
					onCaster: true,
				},
			];
		}
		return [];
    }

    decrementStatus() {
		if (this.status?.expiresIn > 0) {
			this.status.expiresIn--;
			if (this.status?.expiresIn === 0) {
				const statusType = this.status.type;
				this.update({ status: null });
				return {
					type: "textMessage",
					text: `${this.Name} is no longer ${statusType}`,
				};
			}
		}
		return null;
	}

    init(container) {
        this.createElement();
        container.appendChild(this.hudElement);
		container.appendChild(this.pokemonContainer)
        this.pokemonContainer.appendChild(this.pokemonElement);
        this.update()
    };
};