import { combineReducers } from 'redux';
import { RECEIVE_DECKS } from '../actions/types';

function decksReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}

export default combineReducers({
  decks: decksReducer,
});
