import GameObject from './GameObject';
import Sprite from './Sprite';

import pkImg from "../../assets/graphics/characters/npcA.png"

export default class InteractiveObject extends GameObject { 
    constructor(config) {
        super(config);

        this.sprite = new Sprite({
            gameObject: this,
            src: pkImg,
            animation: {
                "used-down" : [[0,0]],
                "unused-down" : [[1,0]],
            },
            currentAnimation: "used-down"
        })
        this.storyFlag = config.storyFlag;
        this.pokemons = config.pokemons;
    
        this.talking = [
          {
            required: [this.storyFlag],
            events: [
              { type: "textMessage", text: "You have already used this." },
            ]
          },
          {
            events: [
              { type: "textMessage", text: "You get Pikachu" },
              { type: "gettingObject", pokemons: this.pokemons },
              { type: "addStoryFlag", flag: this.storyFlag },
            ]
          }
        ]
    
    }
    
    update() {
        this.sprite.currentAnimation = window.playerState.storyFlags[this.storyFlag] ? "used-down" : "unused-down";
    }
};