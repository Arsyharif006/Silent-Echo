import { useState } from 'react';
import { GameProvider } from './contexts/GameContext';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import GameOver from './components/GameOver';
import './index.css';

function App() {
  const [gameScreen, setGameScreen] = useState('menu'); // 'menu', 'game', 'gameover'
  const [savedState, setSavedState] = useState(null);

  const startNewGame = () => {
    setGameScreen('game');
    setSavedState(null);
  };

  const loadGame = (state) => {
    setSavedState(state);
    setGameScreen('game');
  };

  const returnToMainMenu = () => {
    setGameScreen('menu');
  };

  const showGameOver = () => {
    setGameScreen('gameover');
  };

  return (
    <div className="app bg-black min-h-screen text-gray-300 flex flex-col">
      <GameProvider>
        {gameScreen === 'menu' && (
          <MainMenu onNewGame={startNewGame} onLoadGame={loadGame} />
        )}
        {gameScreen === 'game' && (
          <Game 
            initialState={savedState} 
            onGameOver={showGameOver} 
            onReturnToMenu={returnToMainMenu} 
          />
        )}
        {gameScreen === 'gameover' && (
          <GameOver onReturnToMenu={returnToMainMenu} />
        )}
      </GameProvider>
    </div>
  );
}

export default App;