import React from 'react';
import "./background-filter.scss"

export default class BackgroundFilter extends React.Component { 
    constructor(config) {
        super(config);

        this.element = null;
	}
	createElement() {
		this.element = document.createElement("div");
		this.element.classList.add("background-filter");
		this.element.classList.add(`background-filter__${this.props}`);

        function importAll(r) {
            let images = {};
            r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return true});
            return images;
        }
        const particlesImg = importAll(require.context('../../../../../assets/graphics/weather', false, /\.(gif|png|jpe?g|svg)$/));
        // this.element.innerHTML += `<img src=${particlesImg[`${this.props}_particles.png`]} alt="particles" class="particle_background" />`



        // for (let i = 0; i < 32; i ++) {
        //     let random = Math.floor(Math.random() * 3) +1;
        //     this.element.innerHTML += `<img src=${particlesImg[`${this.props}_${random}.png`]} alt="particles" class="particle" />`;
        // }
	}
    
	init(container) {
        this.createElement();
		container.appendChild(this.element);
	}
};