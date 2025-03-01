// contexts/GameContext.jsx
import { createContext, useContext, useState } from 'react';
import { gameData } from '../data/gameData';
import { saveGameState, loadGameState, hasSavedGame, deleteSavedGame } from '../utils/storage';

const GameContext = createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [protagonist, setProtagonist] = useState({ ...gameData.protagonist });
  const [currentChapterId, setCurrentChapterId] = useState('chapter1');
  const [currentSceneId, setCurrentSceneId] = useState('awakening');
  const [inventory, setInventory] = useState([]);
  const [truthMeters, setTruthMeters] = useState({ acceptance: 0, denial: 0 });
  const [gameHistory, setGameHistory] = useState([]);
  const [battleState, setBattleState] = useState(null);

  const getCurrentChapter = () => {
    return gameData.chapters.find(chapter => chapter.id === currentChapterId);
  };

  const getCurrentScene = () => {
    const chapter = getCurrentChapter();
    if (!chapter) return null;

    if (currentSceneId === chapter.initialScene.id) {
      return chapter.initialScene;
    }
    
    return chapter.scenes.find(scene => scene.id === currentSceneId);
  };

  const updateProtagonistStatus = (changes) => {
    setProtagonist(prev => ({
      ...prev,
      status: {
        ...prev.status,
        ...changes
      }
    }));
  };

  const updateInventory = (itemsToAdd = [], itemsToRemove = []) => {
    setInventory(prev => {
      const newInventory = [...prev];
      
      // Add items
      itemsToAdd.forEach(item => {
        if (!newInventory.includes(item)) {
          newInventory.push(item);
        }
      });
      
      // Remove items
      return newInventory.filter(item => !itemsToRemove.includes(item));
    });
  };

  const makeChoice = (choiceId) => {
    const scene = getCurrentScene();
    if (!scene) return;

    const choice = scene.choices.find(c => c.id === choiceId);
    if (!choice) return;

    const consequence = choice.consequence;
    
    // Handle sanity and health changes
    if (consequence.sanityChange) {
      updateProtagonistStatus({ 
        sanity: Math.max(0, protagonist.status.sanity + consequence.sanityChange) 
      });
    }
    
    if (consequence.healthChange) {
      updateProtagonistStatus({ 
        health: Math.max(0, protagonist.status.health + consequence.healthChange) 
      });
    }
    
    // Handle inventory changes
    if (consequence.itemsGained || consequence.itemsLost) {
      updateInventory(consequence.itemsGained || [], consequence.itemsLost || []);
    }
    
    // Handle truth meters
    if (consequence.truthMeters) {
      setTruthMeters(prev => {
        const newMeters = { ...prev };
        
        if (consequence.truthMeters.acceptance) {
          newMeters.acceptance += consequence.truthMeters.acceptance;
        }
        
        if (consequence.truthMeters.denial) {
          newMeters.denial += consequence.truthMeters.denial;
        }
        
        return newMeters;
      });
    }
    
    // Handle battle start
    if (consequence.type === 'battle' && scene.monsterData) {
      setBattleState({
        monster: scene.monsterData,
        playerHealth: protagonist.status.health,
        monsterHealth: scene.monsterData.health,
        outcome: consequence.battleOutcome
      });
      return;
    }
    
    // Add to history
    setGameHistory(prev => [...prev, {
      chapterId: currentChapterId,
      sceneId: currentSceneId,
      choice: choice.text
    }]);
    
    // Handle scene/chapter progression
    if (consequence.nextSceneId) {
      setCurrentSceneId(consequence.nextSceneId);
    }
    
    if (consequence.nextChapterId) {
      setCurrentChapterId(consequence.nextChapterId);
      setCurrentSceneId(consequence.nextSceneId);
    }
    
    // Handle game ending
    if (consequence.type === 'game_end') {
      // Handle end game logic
      console.log('Game ended with', consequence.ending);
    }
  };

  const calculateSanityDefense = (sanity) => {
    if (sanity >= 80) return 15;
    if (sanity >= 60) return 10;
    if (sanity >= 30) return 5;
    if (sanity >= 10) return 2;
    return 0; // Jika sanity < 10, tidak ada pengurangan
  };
  
  const handleBattleAction = (action) => {
    if (!battleState) return;
    
    let updatedBattle = { ...battleState };
    const sanityDefense = calculateSanityDefense(protagonist.status.sanity);
  
    if (action === 'attack') {
      // Player menyerang monster
      const playerDamage = Math.floor(Math.random() * 15) + 5;
      updatedBattle.monsterHealth -= playerDamage;
  
      // Monster menyerang jika masih hidup
      if (updatedBattle.monsterHealth > 0) {
        let monsterDamage = Math.floor(Math.random() * battleState.monster.attackPower * 0.5) + 
                            Math.floor(battleState.monster.attackPower * 0.5);
        
        // Kurangi damage berdasarkan sanity
        monsterDamage = Math.max(0, monsterDamage - sanityDefense);
  
        updatedBattle.playerHealth -= monsterDamage;
        updateProtagonistStatus({ health: updatedBattle.playerHealth });
      }
  
    } else if (action === 'defend') {
      // Player bertahan, damage lebih kecil
      let monsterDamage = Math.floor(Math.random() * battleState.monster.attackPower * 0.3) + 
                          Math.floor(battleState.monster.attackPower * 0.2);
      
      // Kurangi damage berdasarkan sanity
      monsterDamage = Math.max(0, monsterDamage - sanityDefense);
  
      updatedBattle.playerHealth -= monsterDamage;
      updateProtagonistStatus({ health: updatedBattle.playerHealth });
  
      // Bonus: Tambahkan sanity saat defend (opsional)
      updateProtagonistStatus({ sanity: Math.min(100, protagonist.status.sanity + 2) });
    }
  
    // Cek hasil pertarungan
    if (updatedBattle.monsterHealth <= 0) {
      // Player menang
      setBattleState(null);
      setCurrentSceneId(battleState.outcome.victory.nextSceneId);
      if (battleState.outcome.victory.sanityChange) {
        updateProtagonistStatus({ 
          sanity: Math.max(0, protagonist.status.sanity + battleState.outcome.victory.sanityChange) 
        });
      }
    } else if (updatedBattle.playerHealth <= 0) {
      // Player kalah
      setBattleState(null);
      setCurrentSceneId(battleState.outcome.defeat.respawnSceneId || battleState.outcome.defeat.nextSceneId);
      if (battleState.outcome.defeat.sanityChange) {
        updateProtagonistStatus({ 
          sanity: Math.max(0, protagonist.status.sanity + battleState.outcome.defeat.sanityChange) 
        });
      }
    } else {
      // Pertarungan berlanjut
      setBattleState(updatedBattle);
    }
  };
  
  

  const saveGame = () => {
    const gameState = {
      protagonist,
      currentChapterId,
      currentSceneId,
      inventory,
      truthMeters,
      gameHistory
    };
    
    return saveGameState(gameState);
  };

  const loadGame = () => {
    const gameState = loadGameState();
    if (!gameState) return false;
    
    setProtagonist(gameState.protagonist);
    setCurrentChapterId(gameState.currentChapterId);
    setCurrentSceneId(gameState.currentSceneId);
    setInventory(gameState.inventory);
    setTruthMeters(gameState.truthMeters);
    setGameHistory(gameState.gameHistory);
    
    return true;
  };

  const resetGame = () => {
    setProtagonist({ ...gameData.protagonist });
    setCurrentChapterId('chapter1');
    setCurrentSceneId('awakening');
    setInventory([]);
    setTruthMeters({ acceptance: 0, denial: 0 });
    setGameHistory([]);
    setBattleState(null);
  };

  const value = {
    gameData,
    protagonist,
    currentChapterId,
    currentSceneId,
    inventory,
    truthMeters,
    gameHistory,
    battleState,
    getCurrentChapter,
    getCurrentScene,
    makeChoice,
    handleBattleAction,
    saveGame,
    loadGame,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}