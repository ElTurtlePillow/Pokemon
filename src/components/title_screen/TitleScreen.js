import React from 'react';

import "./title-screen.scss"

import KeyboardMenu from '../battle/menu/KeyboardMenu';

import titleScreen from "../../assets/graphics/pictures/v3.png"
import bg from "../../assets/graphics/pictures/titlescreenbg.gif"

export default class Overworld extends React.Component { 
    constructor({ progress }) {
        super(progress);

        this.progress = progress;

    }

    getOptions(resolve) {
        const saveFile = this.progress.getSaveFile();
        return [
            {
                label: "New Game",
                description: "Start a new adventure",
                handler: () => {
                    this.close();
                    resolve();
                }
            },
            saveFile ? {
                label: "Continue",
                description: "Resume the game",
                handler: () => {
                    this.close();
                    resolve(saveFile);
                }
            } : null
        ].filter(v => v)
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("title-screen");
        this.element.innerHTML= (`
            <img src=${bg} class="title-screen_bg" alt="background" />
            <img src=${titleScreen} class="title-screen_logo" alt="title" />
        `)
    }

    close( ) {
        this.keyboardMenu.end();
        this.element.remove()
    }

    async init(container) {
        return new Promise(resolve => {
            this.createElement();
            container.appendChild(this.element);
            this.keyboardMenu = new KeyboardMenu();
            this.keyboardMenu.init(this.element);
            this.keyboardMenu.setOptions(this.getOptions(resolve))
        })
    }
};