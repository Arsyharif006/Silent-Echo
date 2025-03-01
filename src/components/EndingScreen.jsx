import React, { useEffect, useState } from 'react';
import { useGame } from '../contexts/GameContext';

const EndingScreen = ({ onReturnToMenu }) => {
  const { getCurrentScene, resetGame } = useGame();
  const [isVisible, setIsVisible] = useState(false);
  const [endingData, setEndingData] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  
  const scene = getCurrentScene();
  
  useEffect(() => {
    if (scene && 
        scene.choices && 
        scene.choices[0]?.consequence?.type === "game_end") {
      
      const choice = scene.choices[0];
      const ending = choice.consequence.ending;
      
      // Set ending data
      setEndingData({
        ending: ending,
        description: choice.consequence.description,
        title: getEndingTitle(ending)
      });
      
      // Animate in
      setTimeout(() => setIsVisible(true), 800);
      setTimeout(() => setFadeIn(true), 1200);
      
      // Play ending sound effect
      if (!audioPlayed) {
        const endingSound = new Audio('/Silent-Echo/audio/ending.mp3'); // Replace with actual path
        endingSound.volume = 0.7;
        endingSound.play().catch(e => console.log('Error playing audio:', e));
        setAudioPlayed(true);
      }
    } else {
      setIsVisible(false);
      setFadeIn(false);
      setEndingData(null);
    }
  }, [scene, audioPlayed]);
  
  const getEndingTitle = (ending) => {
    switch(ending) {
      case 'redemption':
        return 'Penebusan Dosa';
      case 'cycle':
        return 'Lingkaran Setan';
      case 'insanity':
        return 'Jatuh ke Dalam Kegilaan';
      default:
        return 'Akhir Cerita';
    }
  };
  
  const getEndingClassName = (ending) => {
    switch(ending) {
      case 'redemption':
        return 'bg-emerald-900/40 border-emerald-700/50';
      case 'cycle':
        return 'bg-amber-900/40 border-amber-700/50';
      case 'insanity':
        return 'bg-red-900/40 border-red-700/50';
      default:
        return 'bg-gray-900/40 border-gray-700/50';
    }
  };
  
  const handleRestartGame = () => {
    resetGame();
    setIsVisible(false);
    setAudioPlayed(false);
  };
  
  const handleReturnToMenu = () => {
    resetGame();
    onReturnToMenu();
  };
  
  if (!isVisible || !endingData) return null;
  
  return (
    <div className={`fixed inset-0 bg-black/95 flex items-center justify-center z-50 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Subtle scanlines overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>
      
      {/* Very subtle vignette effect */}
      <div className="absolute inset-0 vignette pointer-events-none opacity-60"></div>
      
      <div className={`max-w-2xl w-full mx-4 p-8 rounded-lg border ${getEndingClassName(endingData.ending)} text-center transition-all duration-700 backdrop-blur-sm 
      ${fadeIn ? 'transform-none' : 'translate-y-8'}`}>
        <h2 className="text-3xl font-serif mb-2 text-gray-400">ENDING:</h2>
        <h1 className="text-4xl font-bold mb-8 font-serif">{endingData.title}</h1>
        
        <div className="h-px w-3/4 mx-auto bg-white/20 mb-8"></div>
        
        <p className="text-lg mb-10 leading-relaxed font-serif text-gray-300">
          {endingData.description}
        </p>
        
        <div className="mt-8 space-y-4">
          <button 
            onClick={handleRestartGame}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-sm transition-colors w-full max-w-xs mx-auto border border-gray-700"
          >
            Mulai Lagi
          </button>
          
          <button 
            onClick={handleReturnToMenu}
            className="px-8 py-3 bg-transparent hover:bg-gray-900 text-gray-500 hover:text-gray-300 rounded-sm transition-colors w-full max-w-xs mx-auto border border-gray-800 hover:border-gray-700 mt-4"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndingScreen;