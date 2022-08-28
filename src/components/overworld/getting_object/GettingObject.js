import React from 'react';
import KeyboardMenu from '../../battle/menu/KeyboardMenu';
import { pokemon } from '../../content/Pokemon';

export default class GettingObject extends React.Component { 

    constructor({ pokemons, onComplete}) {
        super(pokemons);
        this.pokemons = pokemons;
        this.onComplete = onComplete;
    }
  
    getOptions() {
      return this.pokemons.map(id => {
        const base = pokemon[id];
        return {
          label: base.Name,
          description: base.Pokedex,
          handler: () => {
            window.playerState.addPokemon(id);
            this.close();
          }
        }
      })
    }
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("getting-object");
      this.element.classList.add("overlayMenu");
    }
  
    close() {
      this.keyboardMenu.end();
      this.element.remove();
      this.onComplete();
    }
  
  
    init(container) {
      this.createElement();
      this.keyboardMenu = new KeyboardMenu({
        descriptionContainer: container
      })
      this.keyboardMenu.init(this.element)
      this.keyboardMenu.setOptions(this.getOptions())
  
      container.appendChild(this.element);
    }
  }