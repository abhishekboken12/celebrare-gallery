
import { useEffect, useReducer } from 'react';

const STORAGE_KEY = 'celebrare-favorites';

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const exists = state.some(
        (photo) => photo.id === action.payload.id
      );

      if (exists) {
        return state.filter(
          (photo) => photo.id !== action.payload.id
        );
      }

      return [...state, action.payload];
    }

    default:
      return state;
  }
}

function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch {
    return [];
  }
}

function useFavorites() {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    getInitialFavorites
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error('Could not save favourites:', error);
    }
  }, [favorites]);

  function toggleFavorite(photo) {
    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: photo,
    });
  }

  return { favorites, toggleFavorite };
}

export default useFavorites;
