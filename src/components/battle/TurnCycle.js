import React from 'react';

export default class TurnCycle extends React.Component { 
    constructor({battle, onNewEvent}) {
        super(battle)

        this.battle = battle;
        this.onNewEvent = onNewEvent;
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

    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: "The battle start"
        })

        // start first turn
        this.turn();
    };
};