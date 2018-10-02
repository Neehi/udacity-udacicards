import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';

class App extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    const {dispatch} = this.props;

    fetchDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks));
      })
      .then(() => this.setState(() => ({ready: true})));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect()(App);
