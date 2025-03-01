import { useState, useEffect, useRef } from 'react';
import { hasSavedGame, loadGameState } from '../utils/storage';
import { Howl } from 'howler';

const MainMenu = ({ onNewGame, onLoadGame }) => {
  const [hasSave, setHasSave] = useState(false);
  const [titleFlicker, setTitleFlicker] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStep, setTransitionStep] = useState(0);
  const bgm = useRef(null);

  useEffect(() => {
    setHasSave(hasSavedGame());

    const flickerInterval = setInterval(() => {
      setTitleFlicker(prev => !prev);
    }, 3000 + Math.random() * 3000);

    bgm.current = new Howl({
      src: ['/Silent-Echo/audio/silenthill.mp3'],
      loop: true,
      volume: 5,
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
    startTransition();
    const savedState = loadGameState();
    setTimeout(() => {
      if (savedState) {
        onLoadGame(savedState);
      }
    }, 10000); // Extended total time for the sequence
  };

  const handleNewGame = () => {
    startTransition();
    setTimeout(() => {
      onNewGame();
    }, 10000); // Extended total time for the sequence
  };

  const startTransition = () => {
    startMusic();
    setIsTransitioning(true);
    setTransitionStep(1); // Start with step 1 (warning message)

    // Sequence of transition messages with extended first step
    setTimeout(() => {
      setTransitionStep(2); // Show headphone message
    }, 5000); // Extended from 2000ms to 4000ms

    setTimeout(() => {
      setTransitionStep(3); // Show creator name
    }, 7000); // Adjusted timing

    setTimeout(() => {
      setTransitionStep(4); // Show "Enjoy"
    }, 9000); // Adjusted timing
  };

  // Function to render the current transition message
  const renderTransitionMessage = () => {
    switch (transitionStep) {
      case 1:
        return (
          <div className="max-w-lg text-center animate-fadeIn">
            <h3 className="text-xl font-serif text-red-500 mb-4 font-semibold tracking-wide">
              ⚠ PERINGATAN ⚠
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-3">
              Game ini mengandung elemen horor psikologis, suara mengganggu, serta adegan yang dapat memicu kecemasan atau ketakutan ekstrem.
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              Tidak disarankan bagi pemain di bawah 16 tahun.
            </p>
            <p className="text-red-500 text-xs md:text-sm font-semibold mt-4">
            Dengan melanjutkan, Anda memahami dan menerima risiko yang terkait dengan pengalaman bermain ini.
            </p>
          </div>

        );
      case 2:
        return (
          <p className="text-gray-400 text-sm md:text-2xl font-serif tracking-wider animate-fadeIn">
            Gunakan headphone untuk pengalaman terbaik 🎧
          </p>
        );
      case 3:
        return (
          <p className="text-gray-400 text-sm md:text-2xl font-serif tracking-wider animate-fadeIn">
            By: Muhammad Arya Ramadhan
          </p>
        );
      case 4:
        return (
          <p className="text-gray-400 text-sm md:text-2xl font-serif tracking-wider animate-fadeIn">
            Enjoy.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative overflow-hidden px-4">
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>

      {/* Fog Animation */}
      <div className="absolute inset-0 bg-fog animate-fog opacity-20 md:opacity-30 pointer-events-none"></div>

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black z-10 animate-fadeIn pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            {renderTransitionMessage()}
          </div>
        </div>
      )}

      <div className={`w-full max-w-md text-center p-6 md:p-8 relative ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <h1 className={`text-4xl md:text-5xl font-serif text-gray-400 mb-4 md:mb-6 tracking-wider ${titleFlicker ? 'blur-sm opacity-80' : ''} transition-all duration-300`}>
          Silent Echo
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-8 italic font-light">
          The sound of the past never truly fades.
        </p>

        <div className="space-y-3 md:space-y-4">
          <button
            className="w-full py-4 text-lg md:text-xl bg-black font-medium transition-all duration-300 md:rounded-md group relative"
            onClick={handleNewGame}
          >
            <div className="flex items-center justify-center">
              <span className="text-xl absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">●</span>
              <span className="text-gray-500 blur-[0.5px] group-hover:text-white group-hover:blur-none transition-all duration-300">Permainan Baru</span>
            </div>
          </button>

          {hasSave && (
            <button
              onClick={handleLoadGame}
              className="w-full py-4 text-lg md:text-xl bg-black font-medium transition-all duration-300 md:rounded-md group relative"
            >
              <div className="flex items-center justify-center">
                <span className="text-xl absolute left-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">●</span>
                <span className="text-gray-500 blur-[0.5px] group-hover:text-white group-hover:blur-none transition-all duration-300">Lanjutkan</span>
              </div>
            </button>
          )}
        </div>

        <div className="mt-10 text-gray-600 text-xs md:text-sm font-light">
          <p className="mt-1">© 2025 Silent Echo</p>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;