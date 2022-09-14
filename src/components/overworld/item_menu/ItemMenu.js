import React from 'react';

import "./item-menu.scss"

import { emitEvent, wait } from '../../../Utils';
import KeyboardMenu from '../../player_inputs/KeyboardMenu';
import KeyPressListener from '../../player_inputs/KeyPressListener';

import {items} from "../../content/Items";

import SoundEffect from '../../audio/sound_effect/SoundEffect';
import canBuySound from "../../../assets/audio/sound_effect/overworld/martbuyitem.ogg"

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
                {
                    label: "Return",
                        description: "Back",
                        id: "back",
                        handler: () => {
                    this.close();
                    },
                }
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
        const {items, money} = window.playerState;

        // you can buy
        if (price < money) {
            window.playerState.money -= price;
            document.querySelector(".money-value").innerHTML = window.playerState.money;
            items.push({
                itemId: id,
                instanceId: Date.now() + Math.floor(Math.random() * 99999)
            })
            const music = canBuySound;
                    const canBuySoundEffect = new SoundEffect({
                    music, 
                    });
                    canBuySoundEffect.init(document.querySelector(".game-container"));
            emitEvent("PlayerStateUpdated");
            console.log( window.playerState.money);
        } 
        // you don't have enough money
        else {
            console.log("you dont have enough money");
        }
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("item-menu");

        const playerMoney = `
            <div class="player-money">Money: <span class="money-value">${window.playerState.money}</span>¥</div>
        `
        this.element.innerHTML += playerMoney;
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