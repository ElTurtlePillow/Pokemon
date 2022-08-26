import React from 'react';
import "./submission-menu.scss"

import {moves} from "../../content/Moves"
import {items} from "../../content/Items"
import KeyboardMenu from './KeyboardMenu';

export default class SubmissionMenu extends React.Component { 
    constructor({ caster, enemy, onComplete, items }) {
        super(onComplete);

        this.caster = caster;
        this.enemy = enemy;
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
					label: "Attack",
					description: "Choose an attack",
					handler: () => {
						this.keyboardMenu.setOptions(this.getPages().attacks);
					},
				},
				{
					label: "Items",
					description: "Choose an item",
					handler: () => {
						this.keyboardMenu.setOptions(this.getPages().items);
					},
				},
				{
					label: "Pkm",
					description: "Change to another Pokemon",
					handler: () => {
						this.keyboardMenu.setOptions(this.getPages().replacements);
					},
				},
				{
					label: "Run",
					description: "Leave the battle",
					handler: () => {
						this.keyboardMenu.setOptions(this.getPages().run);
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
				...this.items.map((i) => {
					const item = items[i.itemId];
					return {
						label: item.Name,
						description: item.Description,
						right: () => {
							return "x" + item.quantity;
						},
						handler: () => {
							this.menuSubmit(item, item.instanceId);
						},
					};
				}),
				backOption,
			],
			replacements: [
			// 	...this.replacements.map((replacement) => {
			// 		return {
			// 			label: replacement.Name,
			// 			description: replacement.Description,
			// 			handler: () => {
			// 				this.menuSubmitReplacement(replacement);
			// 			},
			// 		};
			// 	}),
				backOption,
			],
            run: [
                // 	...this.replacements.map((replacement) => {
                // 		return {
                // 			label: replacement.Name,
                // 			description: replacement.Description,
                // 			handler: () => {
                // 				this.menuSubmitReplacement(replacement);
                // 			},
                // 		};
                // 	}),
                    backOption,
                ],
		};
	}

    menuSubmit(move, instanceId = null) {
		this.keyboardMenu?.end();

		this.onComplete({
			move,
			target: move.TargetType === "friendly" ? this.caster : this.enemy,
			instanceId,
		});
	}

    decide() {
        // to do select random for enemy
        this.menuSubmit(moves[this.caster.Moves[0]]);
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