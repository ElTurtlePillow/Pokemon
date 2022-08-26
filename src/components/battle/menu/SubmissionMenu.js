import React from 'react';
import "./submission-menu.scss"

import {moves} from "../../content/Moves"

export default class SubmissionMenu extends React.Component { 
    constructor({ caster, enemy, onComplete }) {
        super(onComplete);

        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;
    };

    decide() {
        this.onComplete({
            move: moves[ this.caster.Moves[0] ],
            target: this.enemy
        })
    }

    init(container) {
        this.decide();
    };
};