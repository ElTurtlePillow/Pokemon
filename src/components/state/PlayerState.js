import React from 'react';
import {emitEvent} from "../../Utils"

export default class PlayerState extends React.Component { 
    constructor() {
        super()

        this.pokemons = {
            p1: {
                pokemonId: "pikachu",
                team: "player",
                hp: 4,
                maxHp: 50,
                xp: 75,
                maxXp: 100,
                level: 5,
                status: null,
            },
            p2: {
                pokemonId: "bulbasaur",
                team: "player",
                hp: 50,
                maxHp: 50,
                xp: 0,
                maxXp: 100,
                level: 5,
                status: null,
            },
            p3: {
                pokemonId: "eevee",
                team: "player",
                hp: 50,
                maxHp: 50,
                xp: 0,
                maxXp: 100,
                level: 5,
                status: null,
            },
        }

        this.lineup = ["p1"];
        this.items = [
            { itemId: "FULLHEAL", instanceId: "item1", },
            { itemId: "FULLHEAL", instanceId: "item2", },
            { itemId: "POTION", instanceId: "item3", },
        ]
        this.storyFlags = {
        }
    };

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