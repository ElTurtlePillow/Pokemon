import { wait } from "../../../Utils";
import "./battle-animations.scss"

export const battleAnimations = {
    async SCRATCH(event, onComplete) {
        const element = event.caster.pokemonElement;
        const animationClassName = event.caster.team === "player" ? "battle-movement-right" : "battle-movement-left";
        element.classList.add(animationClassName);

        // rmv on complete
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, {once: true});

        await wait(600);
        onComplete();
    },

    async THUNDERSHOCK(event, onComplete) {
        const element = event.caster.pokemonElement;
        const team = event.caster.team === "player" ? "enemy" : "player";
        document.querySelector(`.${team}-animation`).classList.add("thunder-shock");

        // rmv on complete
            setTimeout(() => {
                document.querySelector(`.${team}-animation`).classList.remove("thunder-shock");
            }, 600)


        await wait(600);
        onComplete();
    },
}