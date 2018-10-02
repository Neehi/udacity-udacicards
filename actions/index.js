import * as api from '../utils/api';
import { RECEIVE_DECKS } from './types';

export const receiveDecks = decks => ({
  type: RECEIVE_DECKS,
  payload: decks,
});
