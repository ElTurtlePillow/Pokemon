import { useState } from 'react';
import './game-launcher.scss'


import star from "./../../assets/graphics/pictures/star.png"
import logo from "./../../assets/graphics/pictures/logo.png"

const Main = () => {
    
    const [gameLauncher, setGameLauncher] = useState(true);
    setTimeout(() => {
      setGameLauncher(false);
    }, 5900)
    

    return (
        <>
            {gameLauncher && (
                <div className="game-launcher">
                <h1>El.Turtle.Pillow</h1>
                    <div className='launcher-dom'>
                        <img src={star} alt="star" className='star one'/>
                        <img src={star} alt="star" className='star two'/>
                        <img src={star} alt="star" className='star three'/>
                        <img src={logo} alt="logo" className='logo'/>
                        
                    </div>
                </div>
            )}
        </>
    );
  }
  
  export default Main;
  