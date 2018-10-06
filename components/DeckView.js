import React from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import { MaterialIcons } from '@expo/vector-icons';
import * as colors from '../utils/colors';

class DeckView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { id } = navigation.state.params;
    return {
      title: id,
    };
  };

  _onPressAddCard = () => this.props.navigation.navigate('NewQuestion', { deckId: this.props.deck.title });

  _onPressStartQuiz = () => this.props.navigation.navigate('QuizView', { deckId: this.props.deck.title });

  _renderQuestion = ({item, index}) => (
    <View
      style={[styles.questionCard, { marginBottom: index < this.props.deck.questions.length - 1 ? 16 : 0 }]}
    >
      <Text style={styles.questionNumber}>{index + 1}</Text>
      <Text numberOfLines={1} style={styles.questionText}>{item.question}</Text>
    </View>
  );

  render() {
    const deck = this.props.deck;
    const cardCount = deck.questions && deck.questions.length
    return (
      <View style={styles.container}>
        {this.props.deck
          ? <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={styles.deckHeader}>
                <Text style={styles.deckHeaderText}>{cardCount} question{cardCount && 's'}</Text>
                <TouchableOpacity
                  disabled={deck.title.length === 0}
                  onPress={this._onPressStartQuiz}
                  style={styles.deckHeaderAction}
                >
                  <Text style={styles.deckHeaderActionText}>Start Quiz</Text>
                  <MaterialIcons
                    name='play-arrow'
                    style={[styles.deckHeaderActionText, styles.deckHeaderActionIcon]}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                contentContainerStyle={styles.questionsContainer}
                data={this.props.deck.questions}
                keyExtractor={(key, index) => index}
                renderItem={this._renderQuestion}
              />
              <TouchableOpacity
                onPress={this._onPressAddCard}
                style={styles.fabCircle}
              >
                <MaterialIcons
                  name='add'
                  style={styles.fabIcon}
                />
              </TouchableOpacity>
            </View>
        : <ActivityIndicator />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  deckHeader: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderColor: colors.darkGray,
    elevation: 1,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
  },
  deckHeaderText: {
    ...material.subheadingObject,
    color: colors.secondary,
  },
  deckHeaderAction: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  deckHeaderActionText: {
    ...material.subheadingObject,
    color: colors.primary,
  },
  deckHeaderActionIcon: {
    marginTop: -4,
    marginLeft: 5,
    fontSize: 18,
  },
  questionHeader: {
    ...material.subheadingObject,
    margin: 20,
    color: colors.primary,
    textAlign: 'center',
  },
  questionsContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: colors.lighterGray,
  },
  questionCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderColor: colors.lightGray,
    borderRadius: 3,
    borderWidth: 1,
    elevation: 1,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: colors.white,
  },
  questionNumber: {
    ...material.body1Object,
    marginRight: 10,
    color: colors.secondary,
  },
  questionText: {
    ...material.body1Object,
    color: colors.secondary,
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

function mapStateToProps(state, ownProps) {
  const id = ownProps.navigation && ownProps.navigation.state.params.id;
  const deck = id && state.decks[id];
  return {
    deck: deck,
  }
}

export default connect(mapStateToProps)(DeckView);
