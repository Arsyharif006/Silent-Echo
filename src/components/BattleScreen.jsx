import { useGame } from '../contexts/GameContext';
import { useState, useEffect } from 'react';

const BattleScreen = () => {
  const { battleState, handleBattleAction } = useGame();
  const [textFlicker, setTextFlicker] = useState(false);
  
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setTextFlicker(prev => !prev);
    }, 5000 + Math.random() * 7000);
    
    return () => clearInterval(flickerInterval);
  }, []);
  
  if (!battleState) return null;
  
  const { monster, playerHealth, monsterHealth } = battleState;
  const playerHealthPercent = (playerHealth / 100) * 100;
  const monsterHealthPercent = (monsterHealth / monster.health) * 100;
  
  return (
    <div className="battle-screen bg-black border border-gray-800 rounded-lg p-6 shadow-lg shadow-red-900/20">
      <h2 className={`text-xl font-serif text-gray-400 mb-4 ${textFlicker ? 'opacity-80' : 'opacity-100'}`}>
        Konfrontasi
      </h2>
      
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="text-center">
          <p className="text-gray-400 font-medium mb-2 font-serif">Ethan</p>
          <div className="mb-2 w-full bg-gray-900 rounded-full h-2">
            <div
              className="bg-gray-400 h-2 rounded-full transition-all duration-700"
              style={{ width: `${playerHealthPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 font-mono">{playerHealth} / 100</p>
        </div>
        
        <div className="text-center">
          <p className="text-gray-300 font-medium mb-2 font-serif">{monster.name}</p>
          <div className="mb-2 w-full bg-gray-900 rounded-full h-2">
            <div
              className="bg-red-900 h-2 rounded-full transition-all duration-700"
              style={{ width: `${monsterHealthPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 font-mono">{monsterHealth} / {monster.health}</p>
        </div>
      </div>
      
      <div className="monster-description bg-gray-900 p-4 rounded mb-6 border-l-2 border-red-900">
        <p className="text-gray-400 italic font-light text-sm leading-relaxed">{monster.description}</p>
      </div>
      
      <div className="battle-actions grid grid-cols-2 gap-4">
        <button
          onClick={() => handleBattleAction('attack')}
          className="py-3 bg-gray-900 hover:bg-red-900 text-gray-300 font-medium rounded transition-colors duration-500 border border-gray-800"
        >
          Serang
        </button>
        <button
          onClick={() => handleBattleAction('defend')}
          className="py-3 bg-gray-900 hover:bg-gray-800 text-gray-300 font-medium rounded transition-colors duration-500 border border-gray-800"
        >
          Bertahan
        </button>
      </div>
    </div>
  );
};

export default BattleScreen;