import { LOGIN, LOGOUT } from '../constants/actionTypes';

const loginReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem(
        'profile',
        JSON.stringify({ token: action?.data.token })
      );
      return { ...state, authData: action?.data.token };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};
export default loginReducer;
