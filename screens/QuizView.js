import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ERROR, PRIMARY, SECONDARY, SUCCESS, WHITE } from '../utils/colors';

class QuizView extends React.Component {
  state = {
    total: 0,
    current: 0,
    correct: 0,
    showAnswer: false,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz",
    };
  };

  componentDidMount = () => {
    this.setState({
      total: this.props.deck.questions.length,
      current: 0,
      correct: 0,
      showAnswer: false,
    });
  }

  _onPressToggleAnswer = () => this.setState({ showAnswer: !this.state.showAnswer });

  _onPressCorrect = () => {
    this.setState({ correct: this.state.correct + 1 });
    this._onPressNext();
  };

  _onPressNext = () => {
    this.setState({ current: this.state.current + 1 })
  };

  render() {
    if (!this.props.deck) {
      return (<ActivityIndicator />);
    }

    const { total, current, showAnswer } = this.state;
    const { deck } = this.props;
    const card = current < total && deck.questions[current];
    return (
      current < total
        ? <View style={styles.container}>
            <Text>{current + 1} / {total}</Text>
            <View style={styles.card}>
              <Text style={styles.title}>
                {showAnswer ? card.answer : card.question}
              </Text>
              <View style={styles.button}>
                <Button
                  onPress={this._onPressToggleAnswer}
                  title={showAnswer ? "Question" : "Answer"}
                  color={SECONDARY}
                />
              </View>
            </View>
            <View style={styles.button}>
              <Button
                onPress={this._onPressCorrect}
                title="Correct"
                color={SUCCESS}
                disabled={current>=total}
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={this._onPressNext}
                title="Incorrect"
                color={ERROR}
                disabled={current>=total}
              />
            </View>
          </View>
        : <View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    width: "90%",
    margin: 20,
    padding: 20,
    backgroundColor: WHITE,
    borderRadius: 8,
    elevation: 8,
    shadowColor: "rgba(0,0,0,0.24)",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    alignItems: "center"
  },
  title: {
    minHeight: 150,
    marginBottom: 20,
    color: PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  button: {
    width: "90%",
    padding: 20,
  },
});

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.navigation.state.params.deckId;
  const deck = id && state.decks[id];
  return {
    deck: deck,
  };
}

export default connect(mapStateToProps)(QuizView);
