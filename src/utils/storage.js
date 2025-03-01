// utils/storage.js
const GAME_STATE_KEY = 'silent_echoes_save';

export const saveGameState = (state) => {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error('Failed to save game:', error);
    return false;
  }
};

export const loadGameState = () => {
  try {
    const savedState = localStorage.getItem(GAME_STATE_KEY);
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
};

export const hasSavedGame = () => {
  return !!localStorage.getItem(GAME_STATE_KEY);
};

export const deleteSavedGame = () => {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to delete saved game:', error);
    return false;
  }
};