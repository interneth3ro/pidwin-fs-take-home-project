import { COINTOSS } from '../constants/actionTypes';

const gameReducer = (state = { gameData: null }, action) => {
  switch (action.type) {
    case COINTOSS:
      return { ...state, gameData: action?.data };
    default:
      return state;
  }
};

export default gameReducer;
