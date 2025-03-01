import { useEffect, useState, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import Dialog from './Dialog';
import Choices from './Choices';
import StatusBar from './StatusBar';
import BattleScreen from './BattleScreen';
import EndingScreen from './EndingScreen';

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState(null);
  const [confirmationGlitch, setConfirmationGlitch] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [savingInProgress, setSavingInProgress] = useState(false);
  const confirmSoundRef = useRef(null);
  const staticSoundRef = useRef(null);
  const paperSoundRef = useRef(null);
  

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
      playStaticSound();
      setTimeout(() => setScreenGlitch(false), 150);
    }
  }, 10000);
  
  // Check for game over - with special exception for Truth battles
  const currentScene = getCurrentScene();
  const isBattlingTruth = battleState && 
    (battleState.monster.id === 'the_truth' || battleState.monster.id === 'the_truth_enraged');
  
  // Only trigger game over if health <= 0 AND not in a Truth battle
  if (protagonist.status.health <= 0 && !isBattlingTruth) {
    onGameOver();
  }
  
  // Initialize sound effects
  confirmSoundRef.current = new Audio('/Silent-Echo/audio/confirm.mp3'); // Replace with actual path
  staticSoundRef.current = new Audio('/Silent-Echo/audio/static.mp3'); // Replace with actual path
  paperSoundRef.current = new Audio('/Silent-Echo/audio/paper.mp3'); // Replace with actual path
  
  return () => clearInterval(glitchInterval);
}, [initialState, protagonist.status.health, battleState]);
  
  const currentScene = getCurrentScene();
  const currentChapter = getCurrentChapter();
  
  if (!currentScene || !currentChapter) {
    return <div>Loading...</div>;
  }
  
  const handleSaveGame = () => {
    setConfirmationType('save');
    setShowConfirmation(true);
    setTimeout(() => {
      setConfirmationVisible(true);
      playPaperSound();
    }, 50);
    triggerConfirmationGlitch();
  };
  
  const handleMainMenu = () => {
    setConfirmationType('menu');
    setShowConfirmation(true);
    setTimeout(() => {
      setConfirmationVisible(true);
      playPaperSound();
    }, 50);
    triggerConfirmationGlitch();
  };
  
  const triggerConfirmationGlitch = () => {
    // Random glitch effect on confirmation dialog
    const glitchCount = 2;
    let count = 0;
    
    const glitchEffect = setInterval(() => {
      setConfirmationGlitch(prev => !prev);
      count++;
      
      if (count >= glitchCount * 2) {
        clearInterval(glitchEffect);
        setConfirmationGlitch(false);
      }
    }, 150);
    
    playStaticSound();
  };
  
  const playStaticSound = () => {
    if (staticSoundRef.current) {
      staticSoundRef.current.volume = 0.3;
      staticSoundRef.current.play();
    }
  };
  
  const playConfirmSound = () => {
    if (confirmSoundRef.current) {
      confirmSoundRef.current.volume = 1;
      confirmSoundRef.current.play();
    }
  };
  
  const playPaperSound = () => {
    if (paperSoundRef.current) {
      paperSoundRef.current.volume = 1;
      paperSoundRef.current.play();
    }
  };
  
  const handleConfirm = () => {
    playConfirmSound();
    
    if (confirmationType === 'save') {
      // Hide confirmation content but keep the overlay
      setConfirmationVisible(false);
      
      // Show the saving text after hiding the confirmation dialog
      setTimeout(() => {
        setSavingInProgress(true);
      }, 300);
      
      // Simulate a short delay for the save operation
      setTimeout(() => {
        saveGame();
        
        // After saving, close the overlay completely
        setTimeout(() => {
          setShowConfirmation(false);
          setSavingInProgress(false);
        }, 800);
        
        // Show saved notification
        setScreenGlitch(true);
        setTimeout(() => {
          setScreenGlitch(false);
        }, 300);
      }, 1800);
    } else if (confirmationType === 'menu') {
      setConfirmationVisible(false);
      setTimeout(() => {
        setShowConfirmation(false);
        onReturnToMenu();
      }, 500);
    }
  };
  
  const handleCancel = () => {
    playStaticSound();
    setConfirmationVisible(false);
    
    setTimeout(() => {
      setShowConfirmation(false);
    }, 500);
  };
  
  // Check if current scene is an ending scene
  const isEndingScene = 
    currentScene?.choices?.length === 1 && 
    currentScene.choices[0]?.consequence?.type === "game_end";
  
  return (
    <div className={`game-container min-h-screen flex flex-col bg-black transition-all duration-1000
      ${fadeIn ? 'opacity-100' : 'opacity-0'}
      ${screenGlitch ? 'blur-sm filter-glitch' : ''}`}
    >
      {/* Header - Hide on ending screen */}
      {!isEndingScene && (
        <div className="bg-black p-4 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif text-gray-400">
            Chapter: {currentChapter.title}
            </h2>
            <div className="flex space-x-3">
              <button 
                onClick={handleSaveGame}
                disabled={savingInProgress}
                className="px-3 py-1 bg-black hover:bg-gray-900 text-gray-500 text-sm rounded border border-gray-800 
                transition-all duration-300 hover:text-gray-300 hover:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simpan
              </button>
              <button 
                onClick={handleMainMenu}
                className="px-3 py-1 bg-black hover:bg-gray-900 text-gray-500 text-sm rounded border border-gray-800
                transition-all duration-300 hover:text-gray-300 hover:border-gray-700"
              >
                Menu
              </button>
            </div>
          </div>
          
          <StatusBar />
        </div>
      )}
      
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
      
      {/* Ending Screen */}
      <EndingScreen onReturnToMenu={onReturnToMenu} />
      
      {/* Borderless Dark Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark overlay with noise */}
          <div className="absolute inset-0 bg-black opacity-90 bg-noise"></div>
          
          {savingInProgress ? (
            <div className="flex flex-col items-center z-10">
              <p className="text-sm font-serif text-gray-400 mb-3 font-medium tracking-wide animate-pulse">
                Menyimpan...
              </p>
              <div className="h-0.5 w-20 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gray-500 animate-progress-bar"></div>
              </div>
            </div>
          ) : (
            <div 
              className={`relative max-w-sm bg-black bg-opacity-60 backdrop-blur-sm transform
                ${confirmationVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
                ${confirmationGlitch ? 'animate-glitch' : ''}
                transition-all duration-500 ease-out rounded-sm`}
            >
              {/* Subtle scanlines overlay */}
              <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>
              
              {/* Very subtle vignette effect */}
              <div className="absolute inset-0 vignette pointer-events-none opacity-40"></div>
              
              {/* Content with no borders */}
              <div className="p-10 text-center relative z-10">
                {/* Subtle blood stain effect in background */}
                <div className="absolute -top-8 -right-8 w-20 h-20 blood-stain opacity-15 rotate-45 blur-sm"></div>
                
                <h3 className="text-xl font-serif text-gray-300 mb-8 font-medium tracking-wide">
                  {confirmationType === 'save' ? (
                    'Simpan progres permainan?'
                  ) : (
                    'Kembali ke menu utama?\nProgres yang belum disimpan akan hilang.'
                  )}
                </h3>
                
                <div className="flex justify-center space-x-12 mt-8">
                  <button 
                    onClick={handleConfirm}
                    className="px-6 py-2 bg-transparent text-gray-400 hover:text-gray-200 
                    transition-all duration-300 font-medium tracking-wide relative group"
                  >
                    <span className="relative z-10">YA</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="px-6 py-2 bg-transparent text-gray-400 hover:text-gray-200 
                    transition-all duration-300 font-medium tracking-wide relative group"
                  >
                    <span className="relative z-10">TIDAK</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add a keyframe animation for the progress bar */}
      <style jsx>{`
        @keyframes progress-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress-bar {
          animation: progress-bar 1.8s linear;
        }
      `}</style>
    </div>
  );
};

export default Game;