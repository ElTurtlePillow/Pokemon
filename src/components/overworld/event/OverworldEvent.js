import React from 'react';
import { oppositeDirection } from '../../../Utils';
import Battle from '../../battle/Battle';

import { enemies } from '../../content/Enemies';

import TextMessage from '../../text/TextMessage';
import PauseMenu from '../pause_menu/PauseMenu';
import SceneTransition from './SceneTransition';

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

    changeMap(resolve) {
		const sceneTransition = new SceneTransition();
		sceneTransition.init(document.querySelector(".game-container"), () => {
			this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
			resolve();

			sceneTransition.fadeOut();
		});
	  }

    battle(resolve) {
      const battle = new Battle({
        enemy: enemies[this.event.enemyId],
        onComplete: () => {
          resolve();
        }
      })
      battle.init(document.querySelector(".game-container"))
    }

    pause(resolve) {
      this.map.isPaused = true;
      const menu = new PauseMenu({
        onComplete: () => {
          resolve();
          this.map.isPaused = false;
          this.map.overworld.startGameLoop();
        }
      });
      menu.init(document.querySelector('.game-container'))
    }

    init() {
        return new Promise(resolve => {
          this[this.event.type](resolve)      
        })
    }
};