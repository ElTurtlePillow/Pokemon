import React from 'react';

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
        }

        // did a pokemon die?
        const targetDead = submission.target.hp <= 0;
        if (targetDead) {
            await this.onNewEvent({
                type: "textMessage", text: `${submission.target.Name} is dead.`
            })

            if (submission.target.team === "enemy") {
				const playerActivePokemon = this.battle.activeCombatants.player;
				const xp = submission.target.givesXp;

				await this.onNewEvent({
					type: "textMessage",
					text: `${caster.Name} gained ${xp} XP!`,
				});
				await this.onNewEvent({
					type: "giveXp",
					xp,
					combatant: this.battle.combatants[playerActivePokemon],
				});
			}
        }

        // winning team ?
        const winner = this.getWinningTeam();
        if (winner) {
            await this.onNewEvent({
                type: "textMessage",
                text: "WINNER"
            })

            this.onWinner(winner)
            return;
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
                text: `${replacement.Name}, GO !`
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
                text: `A wild ${this.battle.combatants.e_wild.pokemonId} appears !`
            })
        } else {
            await this.onNewEvent({
                type: "textMessage",
                text: `${this.battle.enemy.name} wants to fight !`
            })
        }

        // start first turn
        this.turn();
    };
};