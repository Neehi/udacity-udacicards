import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { PRIMARY, SECONDARY, WHITE } from '../utils/colors';

class DeckView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params
    return {
      title: id,
    }
  }

  _onPressAddCard = () => {}

  _onPressStartQuiz = () => {}

  render() {
    const deck = this.props.deck;
    const cardCount = deck.questions && deck.questions.length
    return (
      this.props.deck
        ? <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.title}>{deck.title}</Text>
              <Text style={styles.caption}>{cardCount} {cardCount > 0 ? "Cards" : "Card"}</Text>
            </View>
            <View style={styles.button}>
              <Button
                onPress={this._onPressAddCard}
                title="Add Card"
                color={SECONDARY}
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={this._onPressStartQuiz}
                title="Start Quiz"
                color={PRIMARY}
              />
            </View>
          </View>
        : <ActivityIndicator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  item: {
    marginBottom: 20,
  },
  title: {
    color: PRIMARY,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  caption: {
    color: SECONDARY,
    fontSize: 24,
    alignSelf: "center",
  },
  button: {
    width: "90%",
    padding: 20,
  },
});

function mapStateToProps(state, ownProps) {
  const id = ownProps.navigation && ownProps.navigation.state.params.id;
  const deck = id && state.decks[id];
  return {
    deck: deck,
  }
}

export default connect(mapStateToProps)(DeckView);
