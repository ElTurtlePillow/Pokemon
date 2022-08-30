import { useEffect } from 'react';

import init from "./Init"

const Main = () => {

    useEffect(() => {
        init()
      });

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
  