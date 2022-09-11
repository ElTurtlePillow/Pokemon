import React from 'react';
import {emitEvent} from "../../Utils"

export default class PlayerState extends React.Component { 
    constructor() {
        super()

        this.pokemons = {};

        this.lineup = [];
        this.items = [
            { itemId: "POTION", instanceId: "item2", },
            // { itemId: "FULLHEAL", instanceId: "item1", },
        ];
        this.storyFlags = {};
        this.position = "";
        this.currentBackgroundMusic = "";

        this.essentialItem = {
            runningShoes: false,
        };

        this.healing = "MomHouseFirstFloor";
        this.monney = 100;
    };

    addPokemon(pokemonId, stats) {
        const newId = `p${Date.now()}` + Math.floor(Math.random() * 99999);
        this.pokemons[newId] = {   
            pokemonId,
            team: "player",
            hp: stats.hp,
            maxHp: stats.maxHp,
            xp: stats.xp,
            maxXp: stats.maxXp,
            level: stats.level,
            status: stats.status,
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

    addEssentialItem(id) {
        this.essentialItem[id] = true;
    }

};
window.playerState = new PlayerState();