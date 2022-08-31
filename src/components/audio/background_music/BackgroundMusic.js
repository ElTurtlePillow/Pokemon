import React from 'react';


export default class BackgroundMusic extends React.Component { 
    constructor(song) {
        super(song);

        this.song = song;
        this.audio = new Audio(this.song.music)
    }

    createElement() {
        // remove old ones 
        const playing = document.querySelectorAll('.background-music');
        if (playing) {
            for (let i = 0; i < playing.length; i ++) {
                playing[i].remove();
            }
        }

        this.element = document.createElement("div");
        this.element.classList.add("background-music");
        this.element.innerHTML= (`
            <audio src=${this.song.music} autoplay loop ></audio>
        `)
    }

    close( ) {
            this.element.remove()
    }

    pause() {
        this.audio.pause();
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }

};