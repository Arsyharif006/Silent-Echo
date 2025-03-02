import { useState, useEffect, useRef } from 'react';
import { hasSavedGame, loadGameState } from '../utils/storage';
import { Howl } from 'howler';

const MainMenu = ({ onNewGame, onLoadGame }) => {
  const [hasSave, setHasSave] = useState(false);
  const [titleFlicker, setTitleFlicker] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStep, setTransitionStep] = useState(0);
  const [showCredits, setShowCredits] = useState(false);
  const bgm = useRef(null);
  const buttonSfx = useRef(null);
  const creditsRef = useRef(null);

  useEffect(() => {
    setHasSave(hasSavedGame());

    const flickerInterval = setInterval(() => {
      setTitleFlicker(prev => !prev);
    }, 3000 + Math.random() * 3000);

    bgm.current = new Howl({
      src: ['/Silent-Echo/audio/silenthill.mp3'],
      loop: true,
      volume: 1,
    });

    // Initialize button click sound effect
    buttonSfx.current = new Howl({
      src: ['/Silent-Echo/audio/break.mp3'], // Add your button click sound file here
      volume: 0.4,
    });

    return () => clearInterval(flickerInterval);
  }, []);

  // Add effect for credits scrolling
  useEffect(() => {
    if (showCredits && creditsRef.current) {
      const scrollInterval = setInterval(() => {
        if (creditsRef.current) {
          creditsRef.current.scrollTop += 1;

          // If we've scrolled to the bottom, reset after a delay
          if (creditsRef.current.scrollTop + creditsRef.current.clientHeight >= creditsRef.current.scrollHeight) {
            clearInterval(scrollInterval);
            setTimeout(() => {
              setShowCredits(false);
            }, 2000);
          }
        }
      }, 30);

      return () => clearInterval(scrollInterval);
    }
  }, [showCredits]);

  const startMusic = () => {
    if (!isMusicPlaying) {
      bgm.current.play();
      setIsMusicPlaying(true);
    }
  };

  // Function to play button click sound
  const playButtonSound = () => {
    if (buttonSfx.current) {
      buttonSfx.current.play();
    }
  };

  const handleLoadGame = () => {
    playButtonSound();
    startTransition();
    const savedState = loadGameState();
    setTimeout(() => {
      if (savedState) {
        onLoadGame(savedState);
      }
    }, 12000); // Extended total time for the sequence
  };

  const handleNewGame = () => {
    playButtonSound();
    startTransition();
    setTimeout(() => {
      onNewGame();
    }, 12000); // Extended total time for the sequence
  };

  const startTransition = () => {
    startMusic();
    setIsTransitioning(true);
    setTransitionStep(1); // Start with step 1 (warning message)

    // Sequence of transition messages with extended timing
    setTimeout(() => {
      setTransitionStep(2); // Show path message
    }, 4000);

    setTimeout(() => {
      setTransitionStep(3); // Show headphone message
    }, 7000);

    setTimeout(() => {
      setTransitionStep(4); // Show creator name
    }, 9500);

    setTimeout(() => {
      setTransitionStep(5); // Show "Enjoy"
    }, 11000);
  };


  const handleShowCredits = () => {
    startMusic(); // Start music if not already playing
    setShowCredits(true);
  };

  const handleCloseCredits = () => {
    playButtonSound();
    setShowCredits(false);
  };

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
          <div className="max-w-lg text-center tracking-wider animate-fadeIn">
            <p className="text-gray-400 text-sm md:text-base mb-4 font-serif tracking-wider animate-fadeIn">
              <span className="text-red-600">01001100</span><span className="text-gray-500">01001111</span><span className="text-red-600">01010011</span><span className="text-gray-500">01010100</span>
            </p>
            <p className="text-gray-500 text-xs md:text-sm mt-4 font-light tracking-wider animate-fadeIn">
            Setiap langkah menggema, semakin samar jalan kembali.
            </p>
          </div>
        );
      case 3:
        return (
          <p className="text-gray-400 text-sm md:text-2xl font-serif tracking-wider animate-fadeIn">
            Gunakan headphone untuk pengalaman terbaik 🎧
          </p>
        );
      case 4:
        return (
          <p className="text-gray-400 text-sm md:text-2xl font-serif tracking-wider animate-fadeIn">
            By: Muhammad Arya Ramadhan
          </p>
        );
      case 5:
        return (
          <p className="text-gray-400 text-sm md:text-2xl font-serif tracking-wider animate-fadeIn">
            Enjoy.
          </p>
        );
      default:
        return null;
    }
  };


  const renderCredits = () => {
    return (
      <div
        className="fixed inset-0 bg-black z-20 flex flex-col items-center overflow-hidden"
      >
        <div
          ref={creditsRef}
          className="w-full h-full overflow-y-hidden flex flex-col items-center pt-screen"
        >
          <div className="h-screen"></div> {/* Spacer to start below screen */}

          <div className="flex flex-col items-center mb-32 pt-16">
            {/* App Icon */}
            <div className="w-28 h-28 md:h-36 md:w-36 mb-8 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <img src="/Silent-Echo/assets/web.png" alt="Logo SE" className="h-24 md:h-32" />
              </div>

              <div className="absolute inset-0 bg-noise opacity-30"></div>
            </div>

            {/* Game Title */}
            <h1 className="text-4xl font-serif text-gray-300 mb-2 tracking-wider">Silent Echo</h1>
            <p className="text-gray-500 text-sm mb-24 italic">The sound of the past never truly fades.</p>

            {/* Credits Sections */}
            <h2 className="text-2xl font-serif text-gray-400 mb-6 tracking-wide">Development Team</h2>

            <div className="mb-16 text-center">
              <h3 className="text-xl text-gray-500 mb-3">Created By</h3>
              <p className="text-gray-300 text-lg mb-1">Muhammad Arya Ramadhan</p>
            </div>

            <div className="mb-16 text-center">
              <h3 className="text-xl text-gray-500 mb-3">Programming</h3>
              <p className="text-gray-300 text-lg mb-1">Muhammad Arya Ramadhan</p>
              <p className="text-gray-400 text-sm mt-2">React.js • TailwindCSS</p>
            </div>

            <div className="mb-16 text-center">
              <h3 className="text-xl text-gray-500 mb-3">Design & Art Direction</h3>
              <p className="text-gray-300 text-lg mb-1">Muhammad Arya Ramadhan</p>
              <p className="text-gray-400 text-sm mt-2">UI/UX • Visual Assets • Animation</p>
            </div>

            <div className="mb-16 text-center">
              <h3 className="text-xl text-gray-500 mb-3">Sound Design</h3>
              <p className="text-gray-300 text-lg mb-1">Muhammad Arya Ramadhan</p>
              <p className="text-gray-400 text-sm mt-2">Music • Ambient Sounds • Effects</p>
            </div>

            <div className="mb-16 text-center">
              <h3 className="text-xl text-gray-500 mb-3">Story & Narrative</h3>
              <p className="text-gray-300 text-lg mb-1">Muhammad Arya Ramadhan</p>
            </div>

            <div className="mb-16 text-center">
              <h3 className="text-xl text-gray-500 mb-3">Special Thanks</h3>
              <p className="text-gray-300 text-lg mb-1">Silent Hill Series</p>
              <p className="text-gray-300 text-lg mb-1">Psychological Horror Community</p>
              <p className="text-gray-300 text-lg mb-1">React & TailwindCSS Communities</p>
            </div>

            <div className="mb-32 text-center">
              <h3 className="text-xl text-gray-500 mb-3">Technologies Used</h3>
              <p className="text-gray-400 mb-1">React.js •  TailwindCSS</p>
              <p className="text-gray-400 mb-1">Howler.js • LocalStorage API</p>
            </div>

            <div className="mb-16 text-center">
              <p className="text-gray-500 text-lg mb-1">© 2025 Silent Echo</p>
              <p className="text-gray-400 text-sm mb-1">All Rights Reserved</p>
            </div>

            {/* Button to close credits */}
            <button
              onClick={handleCloseCredits}
              className="text-gray-500 hover:text-gray-300 mb-32 mt-8 px-6 py-2 border border-gray-800 hover:border-gray-600 transition-colors duration-300"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
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

      {/* Credits Screen */}
      {showCredits && renderCredits()}

      <div className={`w-full max-w-md text-center p-6 md:p-8 relative ${isTransitioning || showCredits ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
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
          <button
            onClick={handleShowCredits}
            className="text-gray-600 hover:text-gray-400 mt-2 transition-colors duration-300"
          >
            Credits
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;