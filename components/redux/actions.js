export const addToFavorites = (stock) => ({
    type: 'ADD_TO_FAVORITES',
    payload: stock,
  });
  
  export const removeFromFavorites = (symbol) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: symbol,
  });
  