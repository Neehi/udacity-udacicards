import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    this._resetQuiz();
  }

  _resetQuiz = () => {
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

  _onPressNext = () => this.setState({ current: this.state.current + 1, showQuestion: false });

  _onPressGoBack = () => this.props.navigation.goBack();

  render() {
    if (!this.props.deck) {
      return (<ActivityIndicator />);
    }

    const { total, current, correct, showAnswer } = this.state;
    const { deck } = this.props;
    const card = current < total && deck.questions[current];
    return (
      current < total
        ? // Quiz in progress
          <View style={styles.container}>
            <Text>{current + 1} / {total}</Text>
            <View style={styles.card}>
              <Text style={styles.title}>
                {showAnswer ? card.answer : card.question}
              </Text>
              <Text
                style={styles.caption}
                onPress={this._onPressToggleAnswer}
              >
                {showAnswer ? "Show Question" : "Show Answer"}
              </Text>
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
        : // Completed so show results
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>{`${Math.round(correct * 100 / total)}%`}</Text>
              <Text style={styles.caption}>{`You got ${correct} out of ${total} correct`}</Text>
              <Text style={styles.caption}>
                {Math.round(correct * 100 / total) >= 75
                  ? "Well done! You know this subject well!"
                  : "It looks like you need to study some some :("}
              </Text>
            </View>
            <View style={styles.button}>
              <Button
                onPress={this._resetQuiz}
                title="Try Again"
                color={PRIMARY}
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={this._onPressGoBack}
                title="Back"
                color={SECONDARY}
              />
            </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    width: "90%",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    marginBottom: 20,
    color: PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  caption: {
    marginBottom: 20,
    color: SECONDARY,
    fontSize: 16,
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
