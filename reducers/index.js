import { combineReducers } from 'redux';
import { ADD_DECK, RECEIVE_DECKS } from '../actions/types';

function decksReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.payload.title]: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({
  decks: decksReducer,
});
