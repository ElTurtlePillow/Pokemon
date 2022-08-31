import { useEffect } from 'react';
import init from "./Init"


const Main = () => {

    
    useEffect(() => {
          init()

          const gameContainer = document.querySelector(".game-container");
          gameContainer.style.transform = `scale(${window.innerWidth/700})`
          window.addEventListener("resize", () => {
            let value = window.innerWidth
            if (value > 1500) {
              value = 1500;
            }
            gameContainer.style.transform = `scale(${value/700})`
          })
    })
    

    return (
      <div className="App">
        <div className="game-container">
            <canvas className="game-canvas" width="512" height="288">
            </canvas>
        </div>
        <div className='client-events'></div>
      </div>
    );
  }
  
  export default Main;
  