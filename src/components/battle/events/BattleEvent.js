import React from 'react';
import "./battle-event.scss"

import { randomFromArray, wait } from '../../../Utils';

import TextMessage from "../../text/TextMessage"
import SubmissionMenu from '../menu/SubmissionMenu';
import { battleAnimations } from '../animations/BattleAnimations';
import ReplacementMenu from '../menu/ReplacementMenu';

import {pokemonTypes} from "../../content/Types"

import SoundEffect from "../../audio/sound_effect/SoundEffect"

import normalDamageSound from "../../../assets/audio/sound_effect/battle/normaldamage.ogg"
import criticialSound from "../../../assets/audio/sound_effect/battle/criticialdamage.ogg"
import weakSound from "../../../assets/audio/sound_effect/battle/weakdamage.ogg"

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
        const {caster, target, damage, recover, statusHandler, statsHandler, move} = this.event;
        let who = this.event.onCaster ? caster : target;
        let casterStat = this.event.onCaster ? target : caster;

        // damage
        if (damage) {
            let initialDamage = Math.floor((damage * casterStat.level / 20) + (casterStat.BaseStats[1] / 10) - (who.BaseStats[2] / 10) -2);

            let criticalStrike = Math.floor(Math.random() * 10);

            this.event.criticalStrike = false;
            // critical hit
            if ( criticalStrike === 1) { 
                this.event.criticalStrike = true;
                const music = criticialSound;
                    const criticialSoundEffect = new SoundEffect({
                    music, 
                });
                criticialSoundEffect.init(document.querySelector(".game-container"));
                initialDamage += Math.floor(initialDamage/4);
            }

            
            this.event.superEffective = false;
            this.event.notEffective = false;
            // super effective or non effective hit
            for (const [key, value] of Object.entries(pokemonTypes)) {
                for (let i = 0; i < value.Weaknesses.length; i ++) {
                    if ((target.Type1 === key.toLocaleUpperCase() || target.Type2 === key.toLocaleUpperCase()) && move.MoveType === value.Weaknesses[i]) {
 
                        this.event.superEffective = true;

                        initialDamage += Math.floor(initialDamage/4);

                        const music = criticialSound;
                        const criticialSoundEffect = new SoundEffect({
                            music, 
                        });
                        criticialSoundEffect.init(document.querySelector(".game-container"));
                    } 
                }

                for (let i = 0; i < value.Resistances.length; i ++) {
                    if ((target.Type1 === key.toLocaleUpperCase() || target.Type2 === key.toLocaleUpperCase()) && move.MoveType === value.Resistances[i]) {

                        this.event.notEffective = true;
                        initialDamage -= Math.floor(initialDamage/4);

                        const music = weakSound;
                        const weakSoundEffect = new SoundEffect({
                            music, 
                        });
                        weakSoundEffect.init(document.querySelector(".game-container"));
                    }
                }
                // has no effect to do
            }

            // normal hit
            if (!this.event.criticalStrike || !this.event.notEffective || !this.event.superEffective) {
                const music = normalDamageSound;
                const normalDamageSoundSoundEffect = new SoundEffect({
                    music, 
                });
                normalDamageSoundSoundEffect.init(document.querySelector(".game-container"));
            }


            target.update({
                hp: target.hp - initialDamage,
            });
            target.pokemonElement.classList.add('battle-damage-blink');
            
            await wait(600)
            target.pokemonElement.classList.remove('battle-damage-blink');
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

        // stats changer
        if (statsHandler) {
            who.update({
                stats:  {...statsHandler}
            })
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
					combatant.maxXp += 11 + (combatant.level * 2);
                    combatant.hp += 3;
                    combatant.maxHp += 3;
					combatant.level += 1;
				}

				combatant.update();

                // speed of xp container
                setTimeout(() => {
				    requestAnimationFrame(step);
                }, 40)
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