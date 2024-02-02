import { combineReducers } from 'redux';
import login from './login';
import game from './game';

export default combineReducers({
  login,
  game,
});
