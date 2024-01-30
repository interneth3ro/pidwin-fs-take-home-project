import { COINTOSS, INIT_GAME } from '../constants/actionTypes';

const gameReducer = (state = { gameState: null }, action) => {
  switch (action.type) {
    case INIT_GAME:
      return {
        ...state,
        gameState: action?.data,
      };
    case COINTOSS:
      return {
        ...state,
        gameState: action?.data,
      };
    default:
      return state;
  }
};

export default gameReducer;
