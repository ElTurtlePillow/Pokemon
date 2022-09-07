import { wait } from "../../../Utils";
import "./battle-animations.scss"

export const battleAnimations = {

    async TACKLE(event, onComplete) {
        const element = event.caster.pokemonElement;
        const animationClassName = event.caster.team === "player" ? "battle-movement-right" : "battle-movement-left";
        element.classList.add(animationClassName);

        const team = event.caster.team === "player" ? "enemy" : "player";
        document.querySelector(`.${team}-animation`).classList.add("TACKLE");

        // rmv on complete
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
            document.querySelector(`.${team}-animation`).classList.remove("TACKLE");
        }, {once: true});

        // rmv on complete
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, {once: true});

        await wait(600);
        onComplete();
    },

    async SCRATCH(event, onComplete) {
        const element = event.caster.pokemonElement;
        const animationClassName = event.caster.team === "player" ? "battle-movement-right" : "battle-movement-left";
        element.classList.add(animationClassName);

        const team = event.caster.team === "player" ? "enemy" : "player";
        document.querySelector(`.${team}-animation`).classList.add("SCRATCH");

        // rmv on complete
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
            document.querySelector(`.${team}-animation`).classList.remove("SCRATCH");
            console.log(document.querySelector(`.${team}-animation`));
        }, {once: true});

        await wait(600);
        onComplete();
    },

    async TAILWHIP(event, onComplete) {
        const element = event.caster.pokemonElement;
        const animationClassName = "battle-movement-rotate";
        element.classList.add(animationClassName);

        const team = event.caster.team === "player" ? "enemy" : "player";

        document.querySelector(`.${team}-animation`).classList.add("LOW-DEF");

        await wait(4000);
        element.classList.remove(animationClassName);
        document.querySelector(`.${team}-animation`).classList.remove("LOW-DEF");
        onComplete();
    },

    async GROWL(event, onComplete) {
        const element = event.caster.pokemonElement;
        const animationClassName = "GROWL";
        element.classList.add(animationClassName);

        const team = event.caster.team === "player" ? "enemy" : "player";
        document.querySelector(`.${team}-animation`).classList.add("LOW-ATK");

        await wait(4000);
        element.classList.remove(animationClassName);
        document.querySelector(`.${team}-animation`).classList.remove("LOW-ATK");
        onComplete();
    },

    async STRINGSHOT(event, onComplete) {
        const element = event.target.pokemonElement;
        const animationClassName =  "STRINGSHOT" ;
        element.classList.add(animationClassName);

        const team = event.caster.team === "player" ? "enemy" : "player";
        document.querySelector(`.${team}-animation`).classList.add("LOW-SPD");

        await wait(40000);
        element.classList.remove(animationClassName);
        document.querySelector(`.${team}-animation`).classList.remove("LOW-SPD");
        onComplete();
    },
    
    async PECK(event, onComplete) {
        const element = event.caster.pokemonElement;
        const animationClassName = "PECK";
        element.classList.add(animationClassName);

        const team = event.caster.team === "player" ? "enemy" : "player";
        document.querySelector(`.${team}-animation`).classList.add("LOW-ACC");

        // rmv on complete
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
            document.querySelector(`.${team}-animation`).classList.remove("LOW-ACC");
        }, {once: true});

        await wait(1400);
        onComplete();
    },








    // async THUNDERSHOCK(event, onComplete) {
    //     // const element = event.caster.pokemonElement;
    //     const team = event.caster.team === "player" ? "enemy" : "player";
    //     document.querySelector(`.${team}-animation`).classList.add("thunder-shock");

    //     // rmv on complete
    //         setTimeout(() => {
    //             document.querySelector(`.${team}-animation`).classList.remove("thunder-shock");
    //         }, 600)


    //     await wait(600);
    //     onComplete();
    // },







    // items 
    async POTION(event, onComplete) {
        // const element = event.caster.pokemonElement;
        // const team = event.caster.team === "player" ? "enemy" : "player";
        // document.querySelector(`.${team}-animation`).classList.add("potion");

        // rmv on complete
        //     setTimeout(() => {
        //         document.querySelector(`.${team}-animation`).classList.remove("potion");
        //     }, 600)


        console.log("potioned");
        await wait(600);
        onComplete();
    },
    async FULLHEAL(event, onComplete) {
        // const element = event.caster.pokemonElement;
        // const team = event.caster.team === "player" ? "enemy" : "player";
        // document.querySelector(`.${team}-animation`).classList.add("potion");

        // rmv on complete
        //     setTimeout(() => {
        //         document.querySelector(`.${team}-animation`).classList.remove("potion");
        //     }, 600)


        console.log("fullhealed");
        await wait(600);
        onComplete();
    },
}