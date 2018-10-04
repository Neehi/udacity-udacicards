import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from './types';

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  payload: decks,
});

export const addDeck = (deck) => ({
  type: ADD_DECK,
  payload: deck,
});

export const addCard = (deckId, card) => ({
  type: ADD_CARD,
  deckId,
  card,
});
