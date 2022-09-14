import React from 'react';

import "./item-menu.scss"

import { wait } from '../../../Utils';
import KeyboardMenu from '../../player_inputs/KeyboardMenu';
import KeyPressListener from '../../player_inputs/KeyPressListener';

import {items} from "../../content/Items";

export default class ItemMenu extends React.Component { 
    constructor({onComplete, itemsToBuy}) {
        super(onComplete);
		this.itemsToBuy = itemsToBuy;

        this.onComplete = onComplete
    }

    getOptions(pageKey) {
		if (pageKey === "root") {

            // const {items} = items;
            const itemsList = this.itemsToBuy.map((id) => {
				const base = items[id];
				return {
					label: base.Name,
					description: base.Description,
                    price: base.Price,
					handler: () => {
						this.handlePurchase(id, base.Price)
					},
				};
			});

			return [
				...itemsList,
                // {
				// 	label: "item1",
				// 	description: "Do thing",
				// 	handler: () => {
				// 		//
				// 	},
				// },
                // {
				// 	label: "item2",
				// 	description: "Do thing",
				// 	handler: () => {
				// 		//
				// 	},
				// },
				
			];
		}
    }

    handlePurchase(id, price) {
        console.log(window.playerState.items);

        window.playerState.items.push({
            itemId: id,
            instanceId: Date.now() + Math.floor(Math.random() * 99999)
        })
        console.log(window.playerState.items);
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("item-menu");

        const playerMoney = `
            <div>MONEY: ${window.playerState.money}</div>
        `
    }
    
    close() {
		this.esc?.unbind();
		this.keyboardMenu.end();
		this.element.remove();
		this.onComplete();
	}

    async init(container) {
		this.createElement();
		this.keyboardMenu = new KeyboardMenu({
			descriptionContainer: container,
		});
		this.keyboardMenu.init(this.element);
		this.keyboardMenu.setOptions(this.getOptions("root"));

		container.appendChild(this.element);

		wait(200);
		this.esc = new KeyPressListener("Escape", () => {
			this.close();
		});
	}
};