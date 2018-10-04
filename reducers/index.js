import { combineReducers } from 'redux';
import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions/types';

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
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          title: state[action.deckId].title,
          questions: state[action.deckId].questions.concat(action.card),
        }
      };
    default:
      return state;
  }
}

export default combineReducers({
  decks: decksReducer,
});
