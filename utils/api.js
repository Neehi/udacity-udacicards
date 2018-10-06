import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'UdaciCards:decks';

//AsyncStorage.clear(); // For testing

// -private-
const _setDummyData = () => {
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));
  return dummyData;
}

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((value) => {
      return value ? JSON.parse(value) : _setDummyData();
    });
}

export function saveDeck(title) {
  // Use `getItem` and `setItem` as according to the documentation
  // `mergeItem` isn't supported by all native implementations
  const newDeck = { title, questions: [] };
  let decks = {};
  return AsyncStorage.getItem(DECKS_STORAGE_KEY) // Don't call `fetchDecks` as
    .then((value) => {                           // we don't need dummy data here
      decks = value ? JSON.parse(value) : {};
      decks[title] = newDeck;
    })
    .then(() => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    })
    .then(() => newDeck);
}

export function createCard(deckId, question, answer) {
  const newCard = { question: question, answer: answer };
  let decks = {};
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((value) => {
      decks = value ? JSON.parse(value) : {};
      decks = {
        ...decks,
        [deckId]: {
          //...[deckId],
          title: decks[deckId].title,
          questions: decks[deckId].questions.concat(newCard)
        }
      }
    })
    .then(() => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    })
    .then(() => newCard);
}
