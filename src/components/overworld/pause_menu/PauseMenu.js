import React from 'react';

import "./pause-menu.scss"

import { wait } from '../../../Utils';
import KeyboardMenu from '../../battle/menu/KeyboardMenu';
import KeyPressListener from '../../player_inputs/KeyPressListener';

import PlayerState from '../../state/PlayerState';
import { pokemon } from '../../content/Pokemon';

export default class PauseMenu extends React.Component { 
    constructor({onComplete, progress}) {
        super(onComplete);
		this.progress = progress;

        this.onComplete = onComplete
    }

    getOptions(pageKey) {
		// case 1 show first page of options
		if (pageKey === "root") {
            // const {playerState} = window;
            // const lineupPokemons = playerState.lineup.map((id) => {
			// 	const { pokemonId } = playerState.pokemons[id];
			// 	const base = pokemon[pokemonId];
				// return {
				// 	label: base.Name,
				// 	description: base.Pokedex,
				// 	handler: () => {
				// 		this.keyboardMenu.setOptions(this.getOptions(id));
				// 	},
				// };
			// });

			return [
				// ...lineupPokemons,
				{
					label: "Save",
					description: "Save your progress.",
					handler: () => {
						this.progress.save();
						this.close();
					},
				},
                {
					label: "Items",
					description: "Use items.",
					handler: () => {
						//
					},
				},
				{
					label: "Pokemon",
					description: "Change your team.",
					handler: () => {
						//
					},
				},
				{
					label: "Stuff",
					description: "Do stuff.",
					handler: () => {
						//
					},
				},
				{
					label: "Options",
					description: "Change game configuration",
					handler: () => {
						//
					},
				},
				{
					label: "Close",
					description: "Close the menu.",
					handler: () => {
						this.close();
					},
				},
			];
		}

        // case 2 show options for pokemonId
        // const {playerState} = window;
        // const unequipped = Object.keys(playerState.pokemons).filter(id => {
        //     return playerState.lineup.indexOf(id) === 1;
        // }).map(id => {
        //     const {pokemonId} = playerState.pokemons[id];
        //     const base = pokemon[pokemonId];
        //     return {
        //         label: `${base.Name}`,
        //         description: base.Pokedex,
        //         handler: () => {
		// 			playerState.swapLineup(pageKey, id)
        //             this.keyboardMenu.setOptions(this.getOptions("root"));
        //         }
        //     }
        // })
        // return[
        //     ...unequipped,
        //     {
        //         label: "Front",
        //         description: "Move the pokemon on front of team",
        //         handler:() => {
        // 				playerState.moveToFront(pageKey)
        //             	this.keyboardMenu.setOptions(this.getOptions("root"));
        //         }
        //     },
        //     {
        //         label: "Back",
        //         description: "Return to pause menu",
        //         handler:() => {
        //             this.keyboardMenu.setOptions(this.getOptions("root"));
        //         }
        //     },
        // ];

    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("pause-menu");
        document.querySelector(".hud").style.display = "block";
    }
    
    close() {
		this.esc?.unbind();
		this.keyboardMenu.end();
		this.element.remove();
		this.onComplete();
		document.querySelector(".hud").style.display = "none";
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