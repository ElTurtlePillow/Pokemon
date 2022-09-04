import React from 'react';
import './battle-introduction.scss'

import BackgroundMusic from '../../audio/background_music/BackgroundMusic';
import defaultMusic from "./../../../assets/audio/background_music/BattleWild.ogg"

export default class BattleIntroduction extends React.Component { 
    constructor(config) {
        super(config)

        this.animation = 2; // Math.floor(Math.random() * 6) + 1;
        
        // setup music player 
        this.music = defaultMusic; // config.music || 
    }

    createElement() {
        
        // get images transition
        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return true});
            return images;
        }
        const transitionImages = importAll(require.context('../../../assets/graphics/transitions', false, /\.(png|jpe?g|svg)$/));


		this.element = document.createElement("div");
		this.element.classList.add("battle-introduction");

		this.element.innerHTML = `
            <div class="battle-introduction_animation">
                <img src=${transitionImages[`battle${this.animation}.png`]} class=${`battle${this.animation}`} alt="battle animation" />
            </div>
        `;

        // launch music 
        const music = this.music;
        const backgroundMusic = new BackgroundMusic({
            music, 
            isBattle: true,
        });
        backgroundMusic.init(document.querySelector(".game-container"));

        // remove element 
        setTimeout(() => {
            this.close();
        }, 2500)
	}

    close() {
        this.element.remove();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element)
    };
};