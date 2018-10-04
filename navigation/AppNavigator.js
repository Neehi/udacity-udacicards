import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import DeckList from '../screens/DeckList';
import DeckView from '../screens/DeckView';
import NewDeck from '../screens/NewDeck';
import NewQuestion from '../screens/NewQuestion';

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationopOptions: {
        tabBarLabel: 'New Deck',
    },
  },
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
  },
});

export default StackNavigator({
  Home : {
    screen: Tabs,
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      tabBarLabel: 'Deck',
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NewDeck',
    },
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      tabBarLabel: 'NewQuestion',
    },
  },
});
