import React from 'react';

export default class PlayerState extends React.Component { 
    constructor() {
        super()

        this.pokemons = {
            p1: {
                pokemonId: "pikachu",
                team: "player",
                hp: 40,
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

        this.lineup = ["p1", "p2", "p3"];
        this.items = [
            { itemId: "FULLHEAL", instanceId: "item1", },
            { itemId: "FULLHEAL", instanceId: "item2", },
            { itemId: "POTION", instanceId: "item3", },
        ]
    };

};
window.playerState = new PlayerState();