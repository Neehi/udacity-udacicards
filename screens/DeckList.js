import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import DeckCard from '../components/DeckCard';

class DeckList extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props;

    fetchDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks));
      })
      .then(() => {
        this.setState(() => ({ready: true}));
        // console.log(this.state);
        // console.log(this.props);
      });
  }

  _keyExtractor = (item, index) => item.title;

  _onPressItem(id) {
    console.log(id);
  }

  _renderItem({item}) {
    return (
      <TouchableOpacity
        onPressItem={this._onPressItem}
      >
        <DeckCard
          id={item.title}
          title={item.title}
          cardCount={item.questions.length}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.ready
          ? <FlatList
              data={Object.values(this.props.decks)}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          : <ActivityIndicator />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

function mapStateToProps(state) {
  return {
    decks: state.decks,
  }
}

export default connect(mapStateToProps)(DeckList);
