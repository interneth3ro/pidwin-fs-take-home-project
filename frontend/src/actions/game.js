import { COINTOSS } from '../constants/actionTypes';
import * as api from '../api';
import * as messages from '../messages';

export const coinToss = (formData) => async (dispatch) => {
  try {
    const { data } = await api.coinToss(formData);
    dispatch({ type: COINTOSS, data });
    messages.success('Coin Toss Successful!');
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
