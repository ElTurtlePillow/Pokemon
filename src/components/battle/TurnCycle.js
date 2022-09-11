import React from 'react';

import SoundEffect from "../audio/sound_effect/SoundEffect"
import levelUpSound from "../../assets/audio/sound_effect/battle/pkmnlvlup.ogg"
import runSound from "../../assets/audio/sound_effect/run.ogg"

import BackgroundMusic from '../audio/background_music/BackgroundMusic';

import wildVictory from "../../assets/audio/background_music/BattleWildVictory.ogg"
import trainerVictory from "../../assets/audio/background_music/BattleTrainerVictory.ogg"
import { wait, withGrid } from '../../Utils';

export default class TurnCycle extends React.Component { 
    constructor({battle, onNewEvent, onWinner}) {
        super(battle)

        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.onWinner = onWinner;
        this.currentTeam = "player"
    };

    async turn() {
        // caster
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId];

        const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"];
		const enemy = this.battle.combatants[enemyId];

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
			enemy,
        })

        // stop here if try to run 
        if (submission.enemyId) {
            if (submission.enemyId === "e_wild") {
                await this.onNewEvent({
                    type: "textMessage",
                    text: `You try to run away.`
                })

                let chanceToEscape = Math.floor(Math.random() * 10);
                if (chanceToEscape < 8) {
                    const music = runSound;
                    const runSoundEffect = new SoundEffect({
                    music, 
                    });
                    runSoundEffect.init(document.querySelector(".game-container"));
                    await this.onNewEvent({
                        type: "textMessage",
                        text: `You escape!`
                    })
                    this.onWinner("runAway");
                    return;
                } 
                else {
                    await this.onNewEvent({
                        type: "textMessage",
                        text: `But it fails!`
                    })
                }
            } 
            
            else {
                await this.onNewEvent({
                    type: "textMessage",
                    text: `You cannot run away from a trainer!`
                })
            }

            this.nextTurn();
            return;
        }

        // stop here if remplacing pokemon
        if (submission.replacement) {
            await this.onNewEvent({
                type: "replace",
                replacement: submission.replacement
            })
            await this.onNewEvent({
                type: "textMessage",
                text: `${submission.replacement.Name}, i choose you !`
            })
            this.nextTurn();
            return;
        }

        if (submission.instanceId) {
            // persistance
            this.battle.usedInstanceIds[submission.instanceId] = true;

            // remove from battle state 
            this.battle.items = this.battle.items.filter(i => i.instanceId !== submission.instanceId)
        }

        // variables during battle
        let criticalStrike;
        let statsHandler;
        let superEffective;
        let notEffective;

        const resultingEvents = caster.getReplacedEvents(submission.move.Success)
        for (let i = 0; i < resultingEvents.length; i++) {
            const event = {
                ...resultingEvents[i],
                submission,
                move: submission.move,
                caster,
                target: submission.target
            }

            await this.onNewEvent(event);
            criticalStrike = event.criticalStrike;
            statsHandler = event.statsHandler;
            superEffective = event.superEffective;
            notEffective = event.notEffective;
        }

        // is damage critical ? 
        if (criticalStrike) {
            await this.onNewEvent({
                type: "textMessage", text: `A critical hit!`
            })
        }

        // is super effective ? 
        if (superEffective) {
            await this.onNewEvent({
                type: "textMessage", text: `It's super effective!`
            })
        }

        // is not effective ? 
        if (notEffective) {
            await this.onNewEvent({
                type: "textMessage", text: `Not very effective...`
            })
        }

        // is stats modification ?
        if (statsHandler && statsHandler.expiresIn === 99) {
            switch (statsHandler.type) {
                case "low-def":
                    await this.onNewEvent({
                        type: "textMessage",
                        text: `${enemy.Name}'s defense fell!`
                    })
                    enemy.BaseStats[2] -= 2;
                    break;

                case "low-atk":
                    await this.onNewEvent({
                        type: "textMessage",
                        text: `${enemy.Name}'s attack fell!`
                    })
                    enemy.BaseStats[1] -= 2;
                    break;

                case "low-spd":
                    await this.onNewEvent({
                        type: "textMessage",
                        text: `${enemy.Name}'s speed fell!`
                    })
                    enemy.BaseStats[3] -= 2;
                    break;

                default: 
                    enemy.BaseStats[0] -= 0;
            }
        }

        // did a pokemon die ?
        const targetDead = submission.target.hp <= 0;
        if (targetDead) {
            await this.onNewEvent({
                type: "textMessage", text: `${submission.target.Name} fainted!`
            })

            if (submission.target.team === "enemy") {
				const playerActivePokemon = this.battle.activeCombatants.player;
				const xp = Math.floor((submission.target.givesXp /18) + (submission.target.level * 2) + 8);

                const initialLevel = this.battle.combatants[playerActivePokemon].level;
				await this.onNewEvent({
					type: "textMessage",
					text: `${caster.Name} gained ${xp} XP!`, 
				});
                
				await this.onNewEvent({
                    type: "giveXp",
					xp,
					combatant: this.battle.combatants[playerActivePokemon],
				});
                const actualisedLevel = this.battle.combatants[playerActivePokemon].level;
                if (initialLevel !== actualisedLevel) {
                    const music = levelUpSound;
                    const levelUpSoundEffect = new SoundEffect({
                            music, 
                    });
                    levelUpSoundEffect.init(document.querySelector(".game-container"));
                    await this.onNewEvent({
                        type: "textMessage",
					    text: `${caster.Name} grew to level ${actualisedLevel}!`,
                    });
                }
                
			}
        }

        // winning team ?
        const winner = this.getWinningTeam();
        if (winner) {
            if (winner === "player") {
            // set music 
                if (this.battle.enemy.name === "Wild") {
                    const music = wildVictory;
                    const backgroundMusic = new BackgroundMusic({
                    isBattle: true,
                    music, 
                    });
                    backgroundMusic.init(document.querySelector(".game-container"));

                    await this.onNewEvent({
                        type: "textMessage",
                        text: `You defeated the wild ${enemy.Name}.`
                    })

                } else {
                    const music = trainerVictory;
                    const backgroundMusic = new BackgroundMusic({
                    isBattle: true,
                    music, 
                    });
                    backgroundMusic.init(document.querySelector(".game-container"));
                }


            
                if (this.battle.enemy.name !== "Wild") {
                    await this.onNewEvent({
                        type: "textMessage",
                        text: `WINNER : ${winner},`
                    })
                    await this.onNewEvent({
                        type: "textMessage",
                        text: `You get a lot of monney`
                    })
                }

                this.onWinner(winner)
                return;
            }

            else {
                await this.onNewEvent({
                    type: "textMessage",
                    text: `All your Pokemomns are K.O.`
                })
                await this.onNewEvent({
                    type: "textMessage",
                    text: `You lose [AMOUNT OF MONEY] while escaping.`
                })
                this.onWinner(winner);
                return;
            }
        } 

        // dead pokemon but no winner -> replacement
        if (targetDead) {
            const replacement = await this.onNewEvent({
                type: "replacementMenu",
                team: submission.target.team
            })
            await this.onNewEvent({
                type: "replace",
                replacement: replacement
            })
            await this.onNewEvent({
                type: "textMessage",
                text: `${replacement.Name}, GO!`
            })
        }

        // check for post events
        const postEvents = caster.getPostsEvents();
        for (let i = 0; i < postEvents.length; i ++) {
            const event = {
                ...postEvents[i],
                submission,
                move: submission.move,
                caster,
                target: submission.target
            }
            await this.onNewEvent(event)
        }

        
        // check for status expire
        const expiredEvent = caster.decrementStatus();
		if (expiredEvent) {
            await this.onNewEvent(expiredEvent);
		}

        this.nextTurn();
    };

    nextTurn() {
		this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
		this.turn();
	}

    getWinningTeam() {
		let aliveTeams = {};
		Object.values(this.battle.combatants).forEach((c) => {
			if (c.hp > 0) {
				aliveTeams[c.team] = true;
			}
		});
		if (!aliveTeams["player"]) {
			return "enemy";
		}
		if (!aliveTeams["enemy"]) {
			return "player";
		}
		return null;
	}

    async init() {
        
        // start the battle
        if (this.battle.enemy.name === "Wild") {
            await this.onNewEvent({
                type: "textMessage",
                text: `A wild ${this.battle.combatants.e_wild.pokemonId} appeared !`
            })
        } else {
            await this.onNewEvent({
                type: "textMessage",
                text: `${this.battle.enemy.name} would like to battle!`
            })
        }

        // start first turn
        this.turn();
    };
};