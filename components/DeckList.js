import React from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import * as colors from '../utils/colors';
import DeckCard from './DeckCard';

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
      });
  }

  _keyExtractor = (item, index) => item.title;

  _renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('DeckView', { id: item.title })}
      style={{ marginBottom: index < Object.values(this.props.decks).length ? 20 : 0 }}
    >
      <DeckCard deck={item} />
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.state.ready
          ? <FlatList
              contentContainerStyle={styles.listContainer}
              data={Object.values(this.props.decks)}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          : <ActivityIndicator style={{ flex: 1, alignSelf: 'center' }}/>}
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('NewDeck')}
          style={styles.fabCircle}
        >
          <MaterialIcons
            name='add'
            style={styles.fabIcon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.lighterGray,
  },
  listContainer: {
    padding: 20,
  },
  fabCircle: {
    position: 'absolute',
    zIndex: 1,
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    ...Platform.select({
      android: { elevation: 12 },
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
    }),
    backgroundColor: colors.primary,
  },
  fabIcon: {
    backgroundColor: 'transparent',
    color: colors.white,
    fontSize: 48 / 2,
  },
});

function mapStateToProps(state) {
  return {
    decks: state.decks,
  }
}

export default connect(mapStateToProps)(DeckList);
