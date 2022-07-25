import { useState } from 'react';
import './App.css';
import Game from './Components/Game/Game';
import Menu from './Components/Game/Menu';
import Body from './Main';

const App = () => {

  const [gameOn, setGameOn] = useState<boolean>(false)

  return (
    <Body>
      {!gameOn ? <Menu play={() => setGameOn(true)}/> : <Game gameover={() => setGameOn(false)}/>}
    </Body>
  );
}

export default App;
