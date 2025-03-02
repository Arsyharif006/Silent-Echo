import { useGame } from '../contexts/GameContext';
import { useState, useEffect } from 'react';

const Choices = () => {
  const { getCurrentScene, makeChoice, inventory } = useGame();
  const scene = getCurrentScene();
  const [hoveredChoice, setHoveredChoice] = useState(null);
  
  if (!scene || !scene.choices || scene.choices.length === 0) {
    return null;
  }
  
  // Helper function to check if player has required item
  const hasRequiredItem = (itemName) => {
    return inventory.includes(itemName);
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-serif text-gray-400 mb-4 border-b border-gray-800 pb-2">Apa yang akan kamu lakukan?</h3>
      <div className="space-y-3">
        {scene.choices.map(choice => {
          // Check if choice requires an item
          const requiresItem = choice.requiresItem;
          const hasItem = !requiresItem || hasRequiredItem(requiresItem);
          
          // Format the item name for display (replace underscores with spaces)
          const formattedItemName = requiresItem ? requiresItem.replace(/_/g, ' ') : '';
          
          return (
            <button
              key={choice.id}
              onClick={() => hasItem && makeChoice(choice.id)}
              onMouseEnter={() => setHoveredChoice(choice.id)}
              onMouseLeave={() => setHoveredChoice(null)}
              disabled={!hasItem}
              className={`w-full text-left p-4 rounded border-l-2 
                ${hasItem 
                  ? `${hoveredChoice === choice.id ? 'border-red-900 bg-black' : 'border-gray-800 bg-gray-900'} text-gray-300` 
                  : 'border-gray-800 bg-gray-950 text-gray-500 cursor-not-allowed'}
                transition-all duration-500 font-light text-sm relative`}
            >
              <div className="flex justify-between items-center">
                <span>{choice.text}</span>
                {requiresItem && !hasItem && (
                  <span className="text-xs italic text-red-700 ml-2">
                    Butuh item: {formattedItemName}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Choices;