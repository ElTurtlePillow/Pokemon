import { wait } from "../../../Utils";
import "./battle-animations.scss"

export const battleAnimations = {
    async THUNDERSHOCK(event, onComplete) {
        const element = event.caster.pokemonElement;
        const animationClassName = event.caster.team === "player" ? "battle-movement-right" : "battle-movement-left";
        element.classList.add(animationClassName);

        // rmv on complete
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, {once: true});

        await wait(100);
        onComplete();
    }
}