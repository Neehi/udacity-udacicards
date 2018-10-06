import React from 'react';
import { StackNavigator } from 'react-navigation';
import DeckList from '../components/DeckList';
import DeckView from '../components/DeckView';
import NewDeck from '../components/NewDeck';
import NewQuestion from '../components/NewQuestion';
import QuizView from '../components/QuizView';
import * as colors from '../utils/colors';

export default StackNavigator({
  Home : {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks',
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
      },
    },
  },
  DeckView: {
    screen: DeckView,
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck',
    },
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: 'New Question',
    },
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: 'Quiz',
    },
  },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: colors.primary,
      borderBottomWidth: 1,
      borderColor: colors.black,
      elevation: 1,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: .8,
      shadowRadius: 1,
    },
    headerTintColor: colors.white,
  },
});
