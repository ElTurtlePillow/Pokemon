import { useState } from "react";
import Main from "./components/main/Main";
import GameLauncher from "./components/game_launcher/GameLauncher"

const App = () => {
  const [main, setMain] = useState(false);
  setTimeout(() => {
    setMain(true)
  }, 6000)
  
  return (
    <>
      <GameLauncher />
      {main && <Main />}
    </>
  );
}

export default App;
