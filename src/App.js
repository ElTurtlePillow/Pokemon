import { useState } from "react";
import Main from "./components/main/Main";
import GameLauncher from "./components/game_launcher/GameLauncher"


const App = () => {
  const [main, setMain] = useState(false);
  const [launcher, setLauncher] = useState(false)
  const [title, setTitle] = useState(true)


    const launchTheGame = (e) => {
    
      setLauncher(true)
      setTitle(false)
      setTimeout(() => {
        setMain(true)
      }, 600) // 6000
    }
  
  return (
    <>
      {title && <h2 onClick={launchTheGame}>Start</h2>}
      {launcher && <GameLauncher />}
      {main && <Main />}
    </>
  );
}

export default App;
