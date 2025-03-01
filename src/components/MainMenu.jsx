import { useState, useEffect, useRef } from 'react';
import { hasSavedGame, loadGameState } from '../utils/storage';
import { Howl } from 'howler';

const MainMenu = ({ onNewGame, onLoadGame }) => {
  const [hasSave, setHasSave] = useState(false);
  const [titleFlicker, setTitleFlicker] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const bgm = useRef(null);
  
  useEffect(() => {
    setHasSave(hasSavedGame());
    
    const flickerInterval = setInterval(() => {
      setTitleFlicker(prev => !prev);
    }, 3000 + Math.random() * 3000);
  
    bgm.current = new Howl({
      src: ['/audio/silenthill.mp3'],
      loop: true,
      volume: 0.8,
    });
  
    return () => clearInterval(flickerInterval);
  }, []);
  
  const startMusic = () => {
    if (!isMusicPlaying) {
      bgm.current.play();
      setIsMusicPlaying(true);
    }
  };
  
  const handleLoadGame = () => {
    const savedState = loadGameState();
    if (savedState) {
      onLoadGame(savedState);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden px-4">
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
      
      {/* Fog Animation */}
      <div className="absolute inset-0 bg-fog animate-fog opacity-20 md:opacity-30 pointer-events-none"></div>

      <div className="w-full max-w-md text-center p-6 md:p-8 relative">
        <h1 className={`text-4xl md:text-5xl font-serif text-gray-400 mb-4 md:mb-6 tracking-wider ${titleFlicker ? 'blur-sm opacity-80' : ''} transition-all duration-300`}> 
          Silent Echo
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-8 italic font-light">
          The sound of the past never truly fades.
        </p>
        
        <div className="space-y-3 md:space-y-4">
          <button 
            className="w-full py-4 text-lg md:text-xl bg-black hover:bg-gray-900 text-gray-300 font-medium transition-all duration-500 hover:scale-105"
            onClick={() => { startMusic(); onNewGame(); }}
          >
            Permainan Baru
          </button>
          
          {hasSave && (
            <button
              onClick={handleLoadGame}
              className="w-full py-4 text-lg md:text-xl bg-black hover:bg-gray-900 text-gray-400 font-medium transition-all duration-500 hover:scale-105"
            >
              Lanjutkan
            </button>
          )}
        </div>
        
        <div className="mt-10 text-gray-600 text-xs md:text-sm font-light">
          <p>By: Muhammad Arya Ramadhan</p>
          <p className="mt-1">© 2025 Silent Echo</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
