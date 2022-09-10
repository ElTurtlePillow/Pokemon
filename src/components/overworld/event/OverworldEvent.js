import React from 'react';
import { oppositeDirection } from '../../../Utils';
import Battle from '../../battle/Battle';

import { enemies } from '../../content/Enemies';

import TextMessage from '../../text/TextMessage';
import PauseMenu from '../pause_menu/PauseMenu';
import SceneTransition from './SceneTransition';

import GettingObject from "../getting_object/GettingObject"

import BackgroundMusic from '../../audio/background_music/BackgroundMusic';
import SoundEffect from '../../audio/sound_effect/SoundEffect';
import getPkmnSound from "../../../assets/audio/sound_effect/getpkmn.ogg"
import getItemSound from "../../../assets/audio//sound_effect/overworld/getkeyitem.ogg"
import battleTeasingMusic from "../../../assets/audio/background_music/EyesMeet.ogg"

import BattleIntroduction from "../../battle/battle_introduction/BattleIntroduction"

import Healing from './client_events/healing/Healing';
import healingSound from "../../../assets/audio/sound_effect/overworld/pkmnhealing.ogg"
// import ClientsEvents from './client_events/ClientEvents';

export default class OverworldEvent extends React.Component { 
    constructor({map, event}) {
        super(map);

        this.map = map;
        this.event = event;
    };
  
    stand(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
          map: this.map
        }, {
          type: "stand",
          direction: this.event.direction,
          time: this.event.time
        })
        
        const completeHandler = e => {
          if (e.detail.whoId === this.event.who) {
            document.removeEventListener("PersonStandComplete", completeHandler);
            resolve();
          }
        }
        document.addEventListener("PersonStandComplete", completeHandler)
    }

    walk(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        // handler when walk complete
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    textMessage(resolve) {
        if (this.event.facePlayer) {
            const obj = this.map.gameObjects[this.event.facePlayer];
            obj.direction = oppositeDirection(this.map.gameObjects["player"].direction);
        }

        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve(),
        });
        message.init(document.querySelector(".game-container"));
    }

    // get pokemon
    getPokemon(resolve) {
      window.playerState.addPokemon(this.event.id, {
            hp: 23,
            maxHp: 23,
            xp: 0,
            maxXp: 35,
            level: 5,
            status: null,
      });

      const music = getPkmnSound;
      const getPkmnSoundEffect = new BackgroundMusic({
              music, 
              isBattle: true,
      });
      getPkmnSoundEffect.init(document.querySelector(".game-container"));
      setTimeout(() => {
                const music = window.playerState.currentBackgroundMusic.music;
                const backgroundMusic = new BackgroundMusic({
                music, 
                });
                backgroundMusic.init(document.querySelector(".game-container"));
      }, 3600)

      resolve();
    }

    
      // get essential item 
      getEssentialItem(resolve) {
        window.playerState.addEssentialItem(this.event.id);

        const music = getItemSound;
        const getItemSounddEffect = new BackgroundMusic({
                music, 
                isBattle: true,
        });
        getItemSounddEffect.init(document.querySelector(".game-container"));
        setTimeout(() => {
                  const music = window.playerState.currentBackgroundMusic.music;
                  const backgroundMusic = new BackgroundMusic({
                  music, 
                  });
                  backgroundMusic.init(document.querySelector(".game-container"));
        }, 1900)

        resolve();
      }


    changeMap(resolve) {

      // save current map
      window.playerState.position = this.event.map;

      // change music
      if (this.event.changeMusic) {

        const music = this.event.changeMusic;
        const backgroundMusic = new BackgroundMusic({
          music, 
        });
        backgroundMusic.init(document.querySelector(".game-container"));
      }

      // check for sound effect
      if (this.event.soundEffect) {

        const music = this.event.soundEffect;
        const soundEffect = new SoundEffect({
          music, 
        });
        soundEffect.init(document.querySelector(".game-container"));
      }

  

      // desactivate old object
      Object.values(this.map.gameObjects).forEach(obj => {
        obj.isMaounted = false;
      })

      const sceneTransition = new SceneTransition();
      sceneTransition.init(document.querySelector(".game-container"), () => {
          this.map.overworld.startMap(window.OverworldMaps[this.event.map], {
              x: this.event.x,
              y: this.event.y,
              direction: this.event.direction,
          });
          resolve();

          sceneTransition.fadeOut();
      });
	  }

    battle(resolve) {
      const battleIntroduction = new BattleIntroduction();
      battleIntroduction.init(document.querySelector(".game-container"));

      setTimeout(() => {
          const battle = new Battle({
              enemy: enemies[this.event.enemyId],
              onComplete: (didWin) => {
              resolve(didWin ? "WON_BATTLE" : "LOST_BATTLE");
              }
          })
          battle.init(document.querySelector(".game-container"))
      }, 2450)
    }

    pause(resolve) {
      this.map.isPaused = true;
      const menu = new PauseMenu({
        progress: this.map.overworld.progress,
        onComplete: () => {
          resolve();
          this.map.isPaused = false;
          this.map.overworld.startGameLoop();
        }
      });
      menu.init(document.querySelector('.game-container'))
    }

    healing(resolve) {
      const healingTransition = new Healing();
      healingTransition.init(document.querySelector(".game-container"))

        window.playerState.healing = this.event.position;

        
            const music = healingSound;
          const healingSoundEffect = new BackgroundMusic({
                  music, 
                  isBattle: true,
          });
          healingSoundEffect.init(document.querySelector(".game-container"));
          setTimeout(() => {
                    const music = window.playerState.currentBackgroundMusic.music;
                    const backgroundMusic = new BackgroundMusic({
                    music, 
                    });
                    backgroundMusic.init(document.querySelector(".game-container"));
          }, 1900)

        setTimeout(() => {
          resolve();
          healingTransition.fadeOut();
        },3100)
    }

    addStoryFlag(resolve) {
    window.playerState.storyFlags[this.event.flag] = true;
      
      // if (this.event.flag === "PALLET_TOWN_BURNING") {
      //   const event = this.event.flag;
      //   const clientEvent = new ClientsEvents({event})
      //   clientEvent.init(document.querySelector(".game-container"));
      // }

      resolve();
    }

    gettingObject(resolve) {
      const menu = new GettingObject({
        pokemons: this.event.pokemons,
        onComplete: () => {
          resolve()
        }
      })
      menu.init(document.querySelector(".game-container"));
    }

    battleTeasing(resolve) {
      let who = this.map.gameObjects[this.event.who]

          // launch music 
          const music = battleTeasingMusic;
          const backgroundMusic = new BackgroundMusic({
              music, 
              isBattle: true,
          });
          backgroundMusic.init(document.querySelector(".game-container"));

          let counter = 0;
          const objectBump = setInterval(() => {
              counter++
              who.y -= 1;
              if (counter > 20) {
                  clearInterval(objectBump)
              }
          }, 5) 
          
          setTimeout(() => {
              const objectbumpDown = setInterval(() => {
                  counter--
                  who.y += 1;
                  if (counter  <= 0) {
                      clearInterval(objectbumpDown)
                  }
              }, 5) 
          }, 100)

      setTimeout(() => {
        resolve()
      }, 1000)
    }


    init() {
        return new Promise(resolve => {
          this[this.event.type](resolve)      
        })
    }
};