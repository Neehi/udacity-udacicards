import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as colors from '../utils/colors';

class QuizView extends React.Component {
  state = {
    total: 0,
    current: 0,
    correct: 0,
    showAnswer: false,
  }

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

  _renderQuiz = () => {
    const { total, current, showAnswer } = this.state;
    const { deck } = this.props;
    const card = current < total && deck.questions[current];
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons
              name='question-answer'
              style={styles.cardHeaderIcon}
            />
            <View style={styles.cardHeaderTitleContainer}>
              <Text style={styles.cardTitle}>{deck.title}</Text>
              <Text style={styles.cardCaption}>Question {current + 1} of {total}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardBodyText}>
              Q: {card.question}
            </Text>
          </View>
          {showAnswer && (
            <View style={styles.cardExpandingBody}>
              <Text style={styles.cardExpandingBodyText}>
                A: {card.answer}
              </Text>
            </View>)}
          <View style={styles.cardFooter}>
            <TouchableOpacity
              onPress={this._onPressToggleAnswer}
              style={styles.cardFooterAction}
            >
              <MaterialCommunityIcons
                name={showAnswer ? 'arrow-up-drop-circle-outline' : 'arrow-down-drop-circle-outline'}
                style={[styles.cardFooterActionText, styles.cardFooterActionIcon]}
              />
              <Text style={styles.cardFooterActionText}>
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.answerButtonContainer}>
          <TouchableOpacity
            onPress={this._onPressCorrect}
            style={[styles.answerButton, { backgroundColor: colors.success }]}
          >
            <MaterialIcons
              name={'check'}
              style={[styles.answerButtonText, styles.answerButtonIcon]}
            />
            <Text style={styles.answerButtonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPressNext}
            style={[styles.answerButton, { backgroundColor: colors.error }]}
          >
            <MaterialIcons
              name={'close'}
              style={[styles.answerButtonText, styles.answerButtonIcon]}
            />
            <Text style={styles.answerButtonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderResults = () => {
    const { correct, total } = this.state;
    const percent = Math.round(correct * 100 / total);
    return (
      <View style={styles.resultsContainer}>
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>You got {percent}%</Text>
          <Text style={styles.resultsSubtitle}>{correct} out of {total} correct</Text>
          <Text style={styles.resultsSubtitle}>in the</Text>
          <Text style={styles.resultsTitle}>{this.props.deck.title} Quiz</Text>
          <Text style={styles.resultsCaption}>
            {percent >= 75
              ? 'Well done!'
              : percent >= 50
                  ? 'Good job!'
                  : 'Oops!'}
          </Text>
          <Text style={styles.resultsCaption}>
            {percent >= 75
              ? 'You know this subject well!'
              : 'It looks like you need to study some more.' + (percent < 50 ? ':(' : '')}
          </Text>
        </View>
        <View style={styles.answerButtonContainer}>
          <TouchableOpacity
            onPress={this._onPressGoBack}
            style={[styles.answerButton, { backgroundColor: colors.secondary }]}
          >
            <MaterialIcons
              name={'arrow-back'}
              style={[styles.answerButtonText, styles.answerButtonIcon]}
            />
            <Text style={styles.answerButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._resetQuiz}
            style={[styles.answerButton, { backgroundColor: colors.primary }]}
          >
            <MaterialIcons
              name={'replay'}
              style={[styles.answerButtonText, styles.answerButtonIcon]}
            />
            <Text style={styles.answerButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render = () => {
    return (
      this.props.deck
        ? this.state.current < this.state.total
            ? this._renderQuiz()
            : this._renderResults()
        : <ActivityIndicator style={{ flex: 1, flexDirection: 'column' }}/>
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
  card: {
    flexDirection: 'column',
    margin: 20,
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
  cardHeader: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  cardHeaderIcon: {
    ...material.display1Object,
    marginRight: 10,
    color: colors.primary,
  },
  cardHeaderTitleContainer: {
    flexDirection: 'column',
  },
  cardTitle: {
    ...material.titleObject,
    color: colors.primary,
  },
  cardCaption: {
    ...material.captionObject,
    color: colors.secondary,
  },
  cardBody: {
    height: 100,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cardBodyText: {
    ...material.body1Object,
  },
  cardExpandingBody: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.primary,
  },
  cardExpandingBodyText: {
    ...material.body1Object,
    color: colors.white,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: colors.lightGray,
  },
  cardFooterAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardFooterActionText: {
    ...material.buttonObject,
    color: colors.primary,
  },
  cardFooterActionIcon: {
    marginRight: 5,
    marginTop: -4,
  },
  answerButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: "100%",
  },
  answerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  answerButtonIcon: {
    ...material.buttonObject,
    marginRight: 10,
    color: colors.white,
  },
  answerButtonText: {
    ...material.buttonObject,
    color: colors.white,
  },
  resultsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  results: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  resultsTitle: {
    ...material.display1Object,
    marginBottom: 10,
    color: colors.primary,
    textAlign: 'center',
  },
  resultsSubtitle: {
    ...material.subheadingObject,
    marginBottom: 10,
    color: colors.primary,
    textAlign: 'center',
  },
  resultsCaption: {
    ...material.body1Object,
    marginBottom: 10,
    color: colors.secondary,
    textAlign: 'center',
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
