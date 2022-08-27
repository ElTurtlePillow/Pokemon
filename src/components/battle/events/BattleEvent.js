import React from 'react';
import "./battle-event.scss"

import { randomFromArray, wait } from '../../../Utils';

import TextMessage from "../../text/TextMessage"
import SubmissionMenu from '../menu/SubmissionMenu';
import { battleAnimations } from '../animations/BattleAnimations';
import ReplacementMenu from '../menu/ReplacementMenu';

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
            // if ( randomFromArray(statusHandler.probability)) {
                who.update({
                    status:  {...statusHandler}
                })
            // } 
        }
        if (statusHandler === null) {
			who.update({
				status: null,
			});
		}

        // update team
        this.battle.playerTeam.update();
        this.battle.enemyTeam.update();

        await wait(600)
        target.pokemonElement.classList.remove('battle-damage-blink');
        resolve();
    }

    submissionMenu(resolve) {
        const {caster} = this.event;
        const menu = new SubmissionMenu({
            caster: caster,
            enemy: this.event.enemy,
            items: this.battle.items,
            replacements: Object.values(this.battle.combatants).filter(c => {
                return c.id !== caster.id && c.team === caster.team && c.hp > 0
            }),
            onComplete: submission => {
                resolve(submission)
            }
        });
        menu.init(this.battle.element);
    };

    replacementMenu(resolve) {
        const menu = new ReplacementMenu({
            replacements: Object.values(this.battle.combatants).filter(c => {
                return c.team === this.event.team && c.hp > 0
            }),
            onComplete: replacement => {
                resolve(replacement)
            }
        })
        menu.init( this.battle.element)
    }

    async replace(resolve) {
		const { replacement } = this.event;

		// clear out the old pokemon
		const prevCombatant = this.battle.combatants[this.battle.activeCombatants[replacement.team]];
		this.battle.activeCombatants[replacement.team] = null;
		prevCombatant.update();
		await wait(800);

		// with the new pokemon
		this.battle.activeCombatants[replacement.team] = replacement.id;
		replacement.update();
		await wait(800);

        // update team
        this.battle.playerTeam.update();
        this.battle.enemyTeam.update();

		resolve();
	}

    giveXp(resolve) {
		let amount = this.event.xp;
		const { combatant } = this.event;
		const step = () => {
			if (amount > 0) {
				amount -= 1;
				combatant.xp += 1;

				// check if we've hit level up point
				if (combatant.xp === combatant.maxXp) {
					combatant.xp = 0;
					combatant.maxXp = 100;
					combatant.level += 1;
				}

				combatant.update();
				requestAnimationFrame(step);
				return;
			}
			resolve();
		};
		requestAnimationFrame(step);
	}

    animation(resolve) {
        const fn = battleAnimations[this.event.animation];
        fn(this.event, resolve);
    }

    init(resolve) {
		this[this.event.type](resolve);
	};
};