const favoritesReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITES':
        return [...state, action.payload];
      case 'REMOVE_FROM_FAVORITES':
        return state.filter((stock) => stock.symbol !== action.payload);
      default:
        return state;
    }
  };
  
  export default favoritesReducer;
  