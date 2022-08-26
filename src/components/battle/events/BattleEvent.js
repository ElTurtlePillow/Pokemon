import React from 'react';
import "./battle-event.scss"

import { randomFromArray, wait } from '../../../Utils';

import TextMessage from "../../text/TextMessage"
import SubmissionMenu from '../menu/SubmissionMenu';
import { battleAnimations } from '../animations/BattleAnimations';

export default class BattleEvent extends React.Component { 
    constructor(event, battle) {
        super(event)

        this.event = event;
        this.battle = battle;
    };

    textMessage(resolve) {
        const text = this.event.text.replace("{CASTER}", this.event.caster?.Name).replace("{TARGET}", this.event.target?.Name).replace("{MOVE}", this.event.move?.Name);
		const message = new TextMessage({
			text,
			onComplete: () => {
				resolve();
			},
		});
		message.init(this.battle.element);
    }

    async stateChange(resolve) {
        const {caster, target, damage, recover, statusHandler, move} = this.event;
        let who = this.event.onCaster ? caster : target;

        if (move.TargetType === "friendly") {
            who = caster;
        };

        // damage
        if (damage) {
            target.update({
                hp: target.hp - damage
            });
            target.pokemonElement.classList.add('battle-damage-blink');
        };

        // recover
        if (recover) {
            let newHp = who.hp + recover;
            if (newHp > who.maxHp) {
                newHp = who.maxHp
            }
            who.update({
                hp: newHp
            })
        };

        // status
        if (statusHandler) {
            console.log(statusHandler);
            if (randomFromArray(statusHandler.probability)) {
                who.update({
                    status:  {...statusHandler}
                })
            } 
        }
        if (statusHandler === null) {
			who.update({
				status: null,
			});
		}

        await wait(600)
        target.pokemonElement.classList.remove('battle-damage-blink');
        resolve();
    }

    submissionMenu(resolve) {
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            onComplete: submission => {
                resolve(submission)
            }
        });
        menu.init(this.battle.element);
    };

    animation(resolve) {
        const fn = battleAnimations[this.event.animation];
        fn(this.event, resolve);
    }

    init(resolve) {
		this[this.event.type](resolve);
	};
};