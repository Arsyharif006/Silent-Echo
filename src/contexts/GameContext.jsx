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
  
 // Modify the handleBattleAction function in GameContext.jsx
// This updates the existing code to add special handling for Truth battles

const handleBattleAction = (action) => {
  if (!battleState) return;
  
  let updatedBattle = { ...battleState };
  const sanityDefense = calculateSanityDefense(protagonist.status.sanity);

  if (action === 'attack') {
    // Player attacks monster
    const playerDamage = Math.floor(Math.random() * 15) + 5;
    updatedBattle.monsterHealth -= playerDamage;

    // Monster attacks back if still alive
    if (updatedBattle.monsterHealth > 0) {
      let monsterDamage = Math.floor(Math.random() * battleState.monster.attackPower * 0.5) + 
                          Math.floor(battleState.monster.attackPower * 0.5);
      
      // Reduce damage based on sanity
      monsterDamage = Math.max(0, monsterDamage - sanityDefense);

      updatedBattle.playerHealth -= monsterDamage;
      updateProtagonistStatus({ health: updatedBattle.playerHealth });
    }

  } else if (action === 'defend') {
    // Player defends, takes less damage
    let monsterDamage = Math.floor(Math.random() * battleState.monster.attackPower * 0.3) + 
                        Math.floor(battleState.monster.attackPower * 0.2);
    
    // Reduce damage based on sanity
    monsterDamage = Math.max(0, monsterDamage - sanityDefense);

    updatedBattle.playerHealth -= monsterDamage;
    updateProtagonistStatus({ health: updatedBattle.playerHealth });

    // Bonus: Add sanity when defending (optional)
    updateProtagonistStatus({ sanity: Math.min(100, protagonist.status.sanity + 2) });
  }

  // Check battle results
  if (updatedBattle.monsterHealth <= 0) {
    // Player wins
    const currentMonsterId = battleState.monster.id;
    setBattleState(null);
    
    // Set previous battle info for ending screen to use
    setCurrentSceneId(prev => {
      // Store the battle info in the scene object for the ending screen to access
      const nextSceneId = battleState.outcome.victory.nextSceneId;
      const scene = gameData.chapters
        .flatMap(chapter => [...chapter.scenes, chapter.initialScene])
        .find(scene => scene.id === nextSceneId);
        
      if (scene) {
        scene.previous_battle = currentMonsterId;
      }
      
      return nextSceneId;
    });
    
    if (battleState.outcome.victory.sanityChange) {
      updateProtagonistStatus({ 
        sanity: Math.max(0, protagonist.status.sanity + battleState.outcome.victory.sanityChange) 
      });
    }
  } else if (updatedBattle.playerHealth <= 0) {
    // Player loses
    const currentMonsterId = battleState.monster.id;
    setBattleState(null);
    
    // Special handling for Truth battles - if player loses to any version of The Truth
    if (currentMonsterId === 'the_truth' || currentMonsterId === 'the_truth_enraged') {
      // Direct to redemption ending when losing to The Truth
      setCurrentSceneId('ending_redemption_truth');
      
      // Apply sanity penalty for fighting The Truth and losing
      updateProtagonistStatus({ 
        sanity: Math.max(0, protagonist.status.sanity - 20),
        health: 50 // Restore some health for ending scene
      });
    } 
    // Normal defeat handling for other monsters
    else {
      setCurrentSceneId(prev => {
        const nextSceneId = battleState.outcome.defeat.respawnSceneId || battleState.outcome.defeat.nextSceneId;
        const scene = gameData.chapters
          .flatMap(chapter => [...chapter.scenes, chapter.initialScene])
          .find(scene => scene.id === nextSceneId);
          
        if (scene) {
          scene.previous_battle = currentMonsterId;
        }
        
        return nextSceneId;
      });
      
      if (battleState.outcome.defeat.sanityChange) {
        updateProtagonistStatus({ 
          sanity: Math.max(0, protagonist.status.sanity + battleState.outcome.defeat.sanityChange) 
        });
      }
    }
  } else {
    // Battle continues
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