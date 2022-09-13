import { useEffect } from 'react';
import init from "./Init"


const Main = () => {

    useEffect(() => {
          init()

          const gameContainer = document.querySelector(".game-container");
          let value = window.innerWidth
            gameContainer.style.transform = `scale(${value/700})`
            if (value > 1100) {
              value = 1100;
              gameContainer.style.transform = `scale(${value/700})`
            }
            if (value < 512) {
              value = 512;
              gameContainer.style.transform = `scale(${value/800}) translateX(-21%)`
              console.log(gameContainer.style.transform);
            } 

          window.addEventListener("resize", () => {
            let value = window.innerWidth
            gameContainer.style.transform = `scale(${value/700})`
              if (value > 1100) {
                value = 1100;
                gameContainer.style.transform = `scale(${value/700})`
              }
              if (value < 512) {
                value = 512;
                gameContainer.style.transform = `scale(${value/800}) translateX(-21%)`
                console.log(gameContainer.style.transform);
              } 
          })
    })
    

    return (
      <div className="App">
        <div className="game-container">
            <canvas className="game-canvas" width="768" height="432">
            </canvas>
        </div>
      </div>
    );
  }
  
  export default Main;
  