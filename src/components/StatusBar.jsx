import { useGame } from '../contexts/GameContext';
import { useState, useEffect } from 'react';

const StatusBar = () => {
  const { protagonist, inventory } = useGame();
  const { sanity, health } = protagonist.status;
  const [flickerHealth, setFlickerHealth] = useState(false);
  
  useEffect(() => {
    if (health < 30) {
      const flickerInterval = setInterval(() => {
        setFlickerHealth(prev => !prev);
      }, 1000 + Math.random() * 2000);
      
      return () => clearInterval(flickerInterval);
    }
  }, [health]);
  
  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div>
        <div className="mb-2 flex justify-between">
          <span className="text-sm text-gray-400 font-serif">Kesehatan</span>
          <span className="text-sm text-gray-400 font-mono">{health}/100</span>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-2">
          <div 
            className={`bg-red-700 h-2 rounded-full transition-all duration-300 ${health < 30 && flickerHealth ? 'opacity-50' : 'opacity-100'}`}
            style={{ width: `${health}%` }}
          ></div>
        </div>
      </div>
      
      <div>
        <div className="mb-2 flex justify-between">
          <span className="text-sm text-gray-400 font-serif">Kewarasan</span>
          <span className="text-sm text-gray-400 font-mono">{sanity}/100</span>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-2">
          <div 
            className="bg-gray-500 h-2 rounded-full transition-all duration-700"
            style={{ width: `${sanity}%` }}
          ></div>
        </div>
      </div>
      
      {inventory.length > 0 && (
        <div className="col-span-2 mt-2">
          <p className="text-sm text-gray-400 mb-1 font-serif">Inventaris:</p>
          <div className="flex flex-wrap gap-2">
            {inventory.map(item => (
              <span key={item} className="bg-black border border-gray-800 px-2 py-1 text-xs rounded text-gray-400">
                {item.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusBar;
