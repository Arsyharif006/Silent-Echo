import { useGame } from '../contexts/GameContext';
import { useState, useEffect, useRef } from 'react';

const PuzzleScreen = () => {
  const { getCurrentScene, makeChoice } = useGame();
  const currentScene = getCurrentScene();
  const puzzleData = currentScene?.puzzleData;
  
  const [solution, setSolution] = useState('');
  const [userInput, setUserInput] = useState('');
  const [shuffledPieces, setShuffledPieces] = useState([]);
  const [selectedPieces, setSelectedPieces] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);
  const [buttonSequence, setButtonSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  
  const staticSoundRef = useRef(null);
  
  useEffect(() => {
    if (!puzzleData) return;
    
    // Initialize sound effect
    staticSoundRef.current = new Audio('/Silent-Echo/audio/radio.mp3');
    
    // Set up puzzle based on type
    const puzzleType = getPuzzleType(puzzleData);
    
    if (puzzleType === 'scrambled_text') {
      // Split solution by delimiter and shuffle pieces
      const pieces = puzzleData.solution.split('|').map(s => s.trim());
      setShuffledPieces(shuffleArray([...pieces]));
      setSolution(pieces.join(''));
    } else if (puzzleType === 'button_sequence') {
      // Extract button sequence from solution
      const sequence = puzzleData.solution.split('|').map(s => s.trim());
      setSolution(sequence.join(''));
    } else if (puzzleType === 'digit_code') {
      // Just store the digit code solution
      setSolution(puzzleData.solution);
    }
    
    // Random text glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setTextGlitch(true);
        playStaticSound(1);
        setTimeout(() => setTextGlitch(false), 150);
      }
    }, 4000);
    
    return () => clearInterval(glitchInterval);
  }, [puzzleData]);
  
  const getPuzzleType = (data) => {
    if (!data || !data.solution) return null;
    
    if (data.solution.includes('|')) {
      // If solution has multiple pieces, it's either scrambled text or button sequence
      if (data.id.includes('door_mechanism') || data.solution.match(/^(Merah|Biru|Hijau|Kuning)/)) {
        return 'button_sequence';
      }
      return 'scrambled_text';
    } else if (/^\d+$/.test(data.solution)) {
      // If solution is only digits, it's a code input
      return 'digit_code';
    }
    
    // Default to scrambled text
    return 'scrambled_text';
  };
  
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  const playStaticSound = (volume = 1) => {
    if (staticSoundRef.current) {
      staticSoundRef.current.volume = volume;
      staticSoundRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };
  
  const handlePieceClick = (piece, index) => {
    if (selectedPieces.includes(index)) {
      // Remove piece
      setSelectedPieces(selectedPieces.filter(i => i !== index));
    } else {
      // Add piece
      setSelectedPieces([...selectedPieces, index]);
      playStaticSound(1);
    }
  };
  
  const handleButtonPress = (color) => {
    const newSequence = [...userSequence, color];
    setUserSequence(newSequence);
    playStaticSound(1);
    
    // Automatically check if sequence is complete
    const buttons = puzzleData.solution.split('|').map(s => s.trim());
    if (newSequence.length === buttons.length) {
      const success = newSequence.every((c, i) => c === buttons[i]);
      setIsCorrect(success);
      setTimeout(() => {
        makeChoice(success ? 'solve_door_puzzle' : 'fail_door_puzzle');
      }, 1500);
    }
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow only numbers for digit code puzzles
    if (getPuzzleType(puzzleData) === 'digit_code' && !/^\d*$/.test(value)) {
      return;
    }
    setUserInput(value);
  };
  
  const checkSolution = () => {
    setAttempted(true);
    let success = false;
    
    const puzzleType = getPuzzleType(puzzleData);
    
    if (puzzleType === 'scrambled_text') {
      // For text puzzles, check if selected pieces are in the correct order
      const userSolution = selectedPieces.map(i => shuffledPieces[i]).join('');
      const correctSolution = puzzleData.solution.split('|').map(s => s.trim()).join('');
      success = userSolution.trim() === correctSolution.trim();
    } else if (puzzleType === 'digit_code') {
      // For digit code puzzles, simply compare input with solution
      success = userInput === puzzleData.solution.trim();
    }
    
    setIsCorrect(success);
    
    if (success) {
      // If successful, find the "solve" choice and trigger it
      const solveChoice = currentScene.choices.find(choice => 
        choice.id.includes('solve') || choice.consequence?.type === 'puzzle_solved'
      );
      
      if (solveChoice) {
        setTimeout(() => {
          makeChoice(solveChoice.id);
        }, 1500);
      }
    } else {
      // For failures, find the fail choice if exists
      const failChoice = currentScene.choices.find(choice => 
        choice.id.includes('fail') || choice.consequence?.type === 'puzzle_failed'
      );
      
      if (failChoice) {
        setTimeout(() => {
          makeChoice(failChoice.id);
        }, 1500);
      }
      
      // Play error sound
      playStaticSound(1);
    }
  };
  
  const renderPuzzleContent = () => {
    const puzzleType = getPuzzleType(puzzleData);
    
    if (puzzleType === 'scrambled_text') {
      return (
        <div className="scrambled-text-puzzle my-6">
          <div className="selected-text mb-4 min-h-16 p-3 bg-gray-900 rounded border border-gray-800">
            <p className="font-mono text-gray-400">
              {selectedPieces.map(i => shuffledPieces[i]).join(' ')}
            </p>
          </div>
          
          <div className="text-pieces grid grid-cols-2 gap-3 mb-6">
            {shuffledPieces.map((piece, index) => (
              <button
                key={index}
                onClick={() => handlePieceClick(piece, index)}
                className={`p-3 text-left font-mono text-sm border border-gray-800 rounded
                  ${selectedPieces.includes(index) 
                    ? 'bg-gray-800 text-gray-400 opacity-50' 
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'}
                  transition-all duration-200`}
              >
                {piece}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSelectedPieces([])}
              className="px-4 py-2 bg-gray-900 text-gray-400 border border-gray-800 rounded hover:bg-gray-800"
            >
              Reset
            </button>
            <button
              onClick={checkSolution}
              className="px-4 py-2 bg-gray-900 text-gray-300 border border-gray-700 rounded hover:bg-gray-800"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      );
    } else if (puzzleType === 'button_sequence') {
      const buttons = puzzleData.solution.split('|').map(s => s.trim());
      
      return (
        <div className="button-sequence-puzzle my-6">
          <div className="sequence-display mb-4 min-h-12 p-3 bg-gray-900 rounded border border-gray-800">
            <div className="flex justify-center space-x-2">
              {buttons.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full ${
                    index < userSequence.length 
                      ? userSequence[index] === 'Merah' ? 'bg-red-700' 
                        : userSequence[index] === 'Biru' ? 'bg-blue-700'
                        : userSequence[index] === 'Hijau' ? 'bg-green-700'
                        : userSequence[index] === 'Kuning' ? 'bg-yellow-600'
                        : 'bg-gray-700'
                      : 'bg-gray-800'
                  }`}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="button-grid grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleButtonPress('Merah')}
              className="h-16 bg-red-900 hover:bg-red-800 rounded border border-red-800 transition-colors duration-300"
            ></button>
            <button
              onClick={() => handleButtonPress('Biru')}
              className="h-16 bg-blue-900 hover:bg-blue-800 rounded border border-blue-800 transition-colors duration-300"
            ></button>
            <button
              onClick={() => handleButtonPress('Hijau')}
              className="h-16 bg-green-900 hover:bg-green-800 rounded border border-green-800 transition-colors duration-300"
            ></button>
            <button
              onClick={() => handleButtonPress('Kuning')}
              className="h-16 bg-yellow-800 hover:bg-yellow-700 rounded border border-yellow-700 transition-colors duration-300"
            ></button>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={() => setUserSequence([])}
              className="px-4 py-2 bg-gray-900 text-gray-400 border border-gray-800 rounded hover:bg-gray-800"
            >
              Reset
            </button>
          </div>
        </div>
      );
    } else if (puzzleType === 'digit_code') {
      return (
        <div className="digit-code-puzzle my-6">
          <div className="code-input mb-6 p-3 bg-gray-900 rounded border border-gray-800">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              maxLength={puzzleData.solution.length}
              placeholder={`Masukkan kode ${puzzleData.solution.length} digit`}
              className="w-full bg-transparent text-center text-2xl tracking-widest font-mono text-gray-300 focus:outline-none"
            />
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setUserInput('')}
              className="px-4 py-2 bg-gray-900 text-gray-400 border border-gray-800 rounded hover:bg-gray-800"
            >
              Reset
            </button>
            <button
              onClick={checkSolution}
              className="px-4 py-2 bg-gray-900 text-gray-300 border border-gray-700 rounded hover:bg-gray-800"
            >
              Konfirmasi
            </button>
          </div>
        </div>
      );
    }
    
    return <p className="text-red-500">Tipe puzzle tidak dikenali.</p>;
  };
  
  if (!puzzleData) return null;
  
  return (
    <div className="puzzle-screen bg-black border border-gray-800 rounded-lg p-6 shadow-lg shadow-red-900/10">
      <h2 className={`text-xl font-serif text-gray-400 mb-3 ${textGlitch ? 'blur-sm filter-glitch' : ''}`}>
        Teka-teki
      </h2>
      
      <div className="puzzle-description bg-gray-900 p-4 rounded mb-4 border-l-2 border-gray-700">
        <p className="text-gray-400 text-sm leading-relaxed">{puzzleData.description}</p>
      </div>
      
      {renderPuzzleContent()}
      
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-sm text-gray-500 hover:text-gray-400 underline"
        >
          {showHint ? 'Sembunyikan Petunjuk' : 'Tampilkan Petunjuk'}
        </button>
        
        {currentScene.choices.find(choice => choice.id.includes('abandon') || choice.id.includes('look_for')) && (
          <button
            onClick={() => {
              const choice = currentScene.choices.find(
                choice => choice.id.includes('abandon') || choice.id.includes('look_for')
              );
              if (choice) makeChoice(choice.id);
            }}
            className="text-sm text-gray-500 hover:text-gray-400"
          >
            Tinggalkan Teka-teki
          </button>
        )}
      </div>
      
      {showHint && (
        <div className="hint-box mt-3 p-3 bg-gray-900 bg-opacity-50 rounded text-gray-500 text-sm italic">
          <p>{puzzleData.hint}</p>
        </div>
      )}
      
      {attempted && isCorrect !== null && (
        <div className={`mt-4 p-3 text-center rounded ${
          isCorrect ? 'bg-green-900 bg-opacity-30 text-green-400' : 'bg-red-900 bg-opacity-30 text-red-400'
        }`}>
          <p>{isCorrect ? 'Benar!' : 'Salah!'}</p>
        </div>
      )}
    </div>
  );
};

export default PuzzleScreen;