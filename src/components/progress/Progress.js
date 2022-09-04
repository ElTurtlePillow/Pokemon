import React from 'react';
import BackgroundMusic from '../audio/background_music/BackgroundMusic';

export default class Progress extends React.Component  { 
    constructor(config) {
        super(config);

        // set initial map
        this.mapId = "NewGame";
        this.startingPlayerX = 0;
        this.startingPlayerY = 0;
        this.startingPlayerDirection = "down";
        this.saveFilekey = "Pokemon_SaveFile1";
    }

    save() {
        window.localStorage.setItem(this.saveFilekey, JSON.stringify({
            mapId: this.mapId,
            startingPlayerX: this.startingPlayerX,
            startingPlayerY: this.startingPlayerY,
            startingPlayerDirection: this.startingPlayerDirection,
            playerState: {
                pokemons: window.playerState.pokemons,
                lineup: window.playerState.lineup,
                items: window.playerState.items,
                storyFlags: window.playerState.storyFlags,
                position: window.playerState.position,
                currentBackgroundMusic: window.playerState.currentBackgroundMusic,
            }
        }))
    }

    getSaveFile() {
        const file = window.localStorage.getItem(this.saveFilekey);
        return file ? JSON.parse(file) : null
    }

    load() {
        const file = this.getSaveFile();
        if (file) {
            this.mapId = file.mapId;
            this.startingPlayerX = file.startingPlayerX;
            this.startingPlayerY = file.startingPlayerY;
            this.startingPlayerDirection = file.startingPlayerDirection;
            Object.keys(file.playerState).forEach(key => {
                window.playerState[key] = file.playerState[key]
            })

            const music = file.playerState.currentBackgroundMusic.music;
            const backgroundMusic = new BackgroundMusic({
                music, 
            });
            backgroundMusic.init(document.querySelector(".game-container"));
        }
    }
};