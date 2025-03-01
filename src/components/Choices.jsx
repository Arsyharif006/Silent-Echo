import { useGame } from '../contexts/GameContext';
import { useState, useEffect } from 'react';

const Choices = () => {
  const { getCurrentScene, makeChoice } = useGame();
  const scene = getCurrentScene();
  const [hoveredChoice, setHoveredChoice] = useState(null);
  
  if (!scene || !scene.choices || scene.choices.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-serif text-gray-400 mb-4 border-b border-gray-800 pb-2">Apa yang akan kamu lakukan?</h3>
      <div className="space-y-3">
        {scene.choices.map(choice => (
          <button
            key={choice.id}
            onClick={() => makeChoice(choice.id)}
            onMouseEnter={() => setHoveredChoice(choice.id)}
            onMouseLeave={() => setHoveredChoice(null)}
            className={`w-full text-left p-4 bg-gray-900 text-gray-300 rounded border-l-2 
              ${hoveredChoice === choice.id ? 'border-red-900 bg-black' : 'border-gray-800'} 
              transition-all duration-500 font-light text-sm`}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Choices;