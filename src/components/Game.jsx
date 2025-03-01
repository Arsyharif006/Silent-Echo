// Game.jsx
import { useEffect, useState } from 'react';
import { useGame } from '../contexts/GameContext';
import Dialog from './Dialog';
import Choices from './Choices';
import StatusBar from './StatusBar';
import BattleScreen from './BattleScreen';

const Game = ({ initialState, onGameOver, onReturnToMenu }) => {
  const { 
    protagonist, 
    getCurrentScene, 
    getCurrentChapter,
    battleState,
    saveGame,
    loadGame,
    resetGame
  } = useGame();
  
  const [fadeIn, setFadeIn] = useState(false);
  const [screenGlitch, setScreenGlitch] = useState(false);
  
  useEffect(() => {
    if (initialState) {
      loadGame();
    }
    
    // Fade in animation
    setTimeout(() => setFadeIn(true), 100);
    
    // Random screen glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance
        setScreenGlitch(true);
        setTimeout(() => setScreenGlitch(false), 150);
      }
    }, 10000);
    
    // Check for game over
    if (protagonist.status.health <= 0) {
      onGameOver();
    }
    
    return () => clearInterval(glitchInterval);
  }, [initialState, protagonist.status.health]);
  
  const currentScene = getCurrentScene();
  const currentChapter = getCurrentChapter();
  
  if (!currentScene || !currentChapter) {
    return <div>Loading...</div>;
  }
  
  const handleSaveGame = () => {
    saveGame();
    alert('Permainan disimpan!');
  };
  
  const handleMainMenu = () => {
    if (confirm('Kembali ke menu utama? Progres yang belum disimpan akan hilang.')) {
      onReturnToMenu();
    }
  };
  
  return (
    <div className={`game-container min-h-screen flex flex-col bg-black transition-all duration-1000 
      ${fadeIn ? 'opacity-100' : 'opacity-0'} 
      ${screenGlitch ? 'blur-sm' : ''}`}
    >
      {/* Header */}
      <div className="bg-black p-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-serif text-gray-400">
          Chapter: {currentChapter.title}
          </h2>
          <div className="flex space-x-3">
            <button 
              onClick={handleSaveGame}
              className="px-3 py-1 bg-black hover:bg-gray-900 text-gray-500 text-sm rounded border border-gray-800"
            >
              Simpan
            </button>
            <button 
              onClick={handleMainMenu}
              className="px-3 py-1 bg-black hover:bg-gray-900 text-gray-500 text-sm rounded border border-gray-800"
            >
              Menu
            </button>
          </div>
        </div>
        
        <StatusBar />
      </div>
      
      {/* Main Game Content */}
      <div className="flex-grow p-6 overflow-y-auto">
        {battleState ? (
          <BattleScreen />
        ) : (
          <>
            <Dialog />
            <Choices />
          </>
        )}
      </div>
    </div>
  );
};

export default Game;