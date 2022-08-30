import React from 'react';
import {emitEvent} from "../../Utils"

export default class PlayerState extends React.Component { 
    constructor() {
        super()

        this.pokemons = {
            // p1: {
            //     pokemonId: "pikachu",
            //     team: "player",
            //     hp: 50,
            //     maxHp: 50,
            //     xp: 0,
            //     maxXp: 100,
            //     level: 5,
            //     status: null,
            // },
        }

        this.lineup = ["p1"];
        this.items = [
            { itemId: "FULLHEAL", instanceId: "item1", },
            { itemId: "POTION", instanceId: "item2", },
        ]
        this.storyFlags = {
        }
    };

    addPokemon(pokemonId) {
        const newId = `p${Date.now()}` + Math.floor(Math.random() * 99999);
        this.pokemons[newId] = {
            pokemonId,
            team: "player",
            hp: 50,
            maxHp: 50,
            xp: 0,
            maxXp: 100,
            level: 1,
            status: null,
        }
        if (this.lineup.length < 6) {
            this.lineup.push(newId)
        }
        emitEvent("LineupChanged")
    }

    swapLineup(oldId, incomingId) {
        const oldIndex = this.lineup.indexOf(oldId);
        this.lineup[oldIndex] = incomingId;
        emitEvent("LineupChanged")
    }

    moveTofront(futureFrontId) {
        this.lineup = this.lineup.filter(id => id !== futureFrontId);
        this.lineup.unshift(futureFrontId)
        emitEvent("LineupChanged")
    }

};
window.playerState = new PlayerState();