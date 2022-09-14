import React from 'react';
import "./submission-menu.scss"

import {moves} from "../../content/Moves"
import {items} from "../../content/Items"
import KeyboardMenu from '../../player_inputs/KeyboardMenu';

export default class SubmissionMenu extends React.Component { 
    constructor({ caster, enemy, onComplete, items, replacements }) {
        super(onComplete);

        this.caster = caster;
        this.enemy = enemy;
		this.replacements = replacements;
        this.onComplete = onComplete;

        let quantityMap = {};
        items.forEach(item => {
            if (item.team === caster.team) {

                let existing = quantityMap[item.itemId];
                if (existing) {
                    existing.quantity += 1;
                } else {
                    quantityMap[item.itemId] = {
                        itemId: item.itemId,
                        quantity: 1,
                        instanceId: item.instanceId
                    }
                }
            }
        })
        this.item = Object.values(quantityMap);
    };

    getPages() {
		const backOption = {
			label: "◀",
			description: "Return to previous page",
			id: "back",
			handler: () => {
				this.keyboardMenu.setOptions(this.getPages().root);
			},
		};

		return {
			root: [
				{
					label: "FIGHT",
					description: `What will ${this.caster.Name} do?`,
					handler: () => {
						this.keyboardMenu.setOptions(this.getPages().attacks);
					},
				},
				{
					label: "BAG",
					description: "Choose an item",
					handler: () => {
						this.keyboardMenu.setOptions(this.getPages().items);
					},
				},
				{
					label: "POKEMON",
					description: "Change to another Pokemon",
					handler: () => {
						this.keyboardMenu.setOptions(this.getPages().replacements);
					},
				},
				{
					label: "RUN",
					description: "Try to leave the battle",
					handler: () => {
						this.runSubmit(this.enemy.id);
					},
				},
			],
			attacks: [
				...this.caster.Moves.map((key) => {
					const move = moves[key];
					return {
						label: move.Name,
						description: move.Description,
						handler: () => {
							this.menuSubmit(move);
						},
					};
				}),
				backOption,
			],
			items: [
				...this.item.map((i) => {
					const item = items[i.itemId];
					return {
						// img src : 
						label: item.Name,
						description: item.Description,
						right: () => {
							return "x" + i.quantity;
						},
						handler: () => {
							this.menuSubmit(item, i.instanceId);
						},
					};
				}),
				backOption,
			],
			replacements: [
				...this.replacements.map((replacement) => {
					return {
						label: replacement.Name,
						description: replacement.Pokedex,
						handler: () => {
							this.menuSubmitReplacement(replacement);
						},
					};
				}),
				backOption,
			],
            // run: [
			// 	Object.values(this.enemy).forEach(function(val, index) {
			// 		if (val === "e_wild") {
			// 			console.log(val, index);
			// 		}
			// 	  })
            //     ],
		};
	}

	menuSubmitReplacement(replacement) {
		this.keyboardMenu?.end();
		this.onComplete({
			replacement
		})
	}

    menuSubmit(move, instanceId = null) {
		this.keyboardMenu?.end();
		this.onComplete({
			move,
			target: move.TargetType === "friendly" ? this.caster : this.enemy,
			instanceId,
		});
	}

	runSubmit(enemyId) {
		this.keyboardMenu?.end();
		this.onComplete({ enemyId });
	}

	// enmy choice 
    decide() {
		let enemyChoice = Math.floor((Math.random() * this.caster.Moves.length))
        this.menuSubmit(moves[this.caster.Moves[enemyChoice]]);
    }

    showMenu(container) {
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions( this.getPages().root)
    }

    init(container) {

        if (this.caster.isPlayerControlled) {
            this.showMenu(container)
        } else {
            this.decide();
        }
    };
};