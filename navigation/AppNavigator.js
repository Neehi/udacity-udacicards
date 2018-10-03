import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import DeckList from '../screens/DeckList';

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
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
});
