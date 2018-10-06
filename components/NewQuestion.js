import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import { MaterialIcons } from '@expo/vector-icons';
import { addCard } from '../actions';
import { createCard } from '../utils/api';
import * as colors from '../utils/colors';

class NewQuestion extends Component {
  state = {
    question: '',
    answer: '',
  };

  _handleChangeQuestion = (text) => {
    this.setState({ question: text });
  }

  _handleChangeAnswer = (text) => {
    this.setState({ answer: text });
  }

  _handleSubmit = async () => {
    const { question, answer } = this.state;

    // Save the deck and update redux
    const card = await createCard(this.props.deckId, question, answer);
    await this.props.addCard(this.props.deckId, card);
    this.setState({ question: '', answer: '' });

    // Reset the navigation stack so back doesn't return here
    // and navigate to the vuew for the new deck
    const navigateAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckView', params: { id: this.props.deckId } }),
      ]
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <View style={styles.item}>
          <Text style={styles.title}>What is your question?</Text>
          <Text style={styles.label}>Question</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter your question here...'
            placeholderTextColor={colors.midGray2}
            onChangeText={(text) => this._handleChangeQuestion(text)}
            underlineColorAndroid={colors.midGray2}
          />
          <Text style={styles.label}>Answer</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter your answer here...'
            placeholderTextColor={colors.midGray2}
            onChangeText={(text) => this._handleChangeAnswer(text)}
            underlineColorAndroid={colors.midGray2}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={question.length === 0 || answer.length === 0}
            onPress={() => this._handleSubmit()}
            style={styles.button}
          >
            <MaterialIcons name='add' style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: colors.white,
  },
  item: {
  },
  title: {
    ...material.titleObject,
    alignSelf: 'center',
    marginVertical: 20,
    color: colors.primary,
  },
  label: {
    ...material.body1Object,
    alignSelf: 'flex-start',
    marginVertical: 10,
    color: colors.secondary,
  },
  input: {
    ...material.body1Object,
    alignSelf: 'center',
    width: '100%',
    padding: 10,
    borderColor: colors.midGray2,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
    color: colors.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.primary,
  },
  buttonIcon: {
    marginRight: 10,
    backgroundColor: 'transparent',
    color: colors.white,
    fontSize: 16,
  },
  buttonText: {
    ...material.buttonObject,
    color: colors.white,
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    deckId: ownProps.navigation.state.params.deckId,
  };
}

const mapDispatchToProps = (dispatch) => ({
  addCard: (deckId, card) => dispatch(addCard(deckId, card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
