import React, { Component } from "react";
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { addCard } from "../actions";
import { createCard } from "../utils/api";
import { LIGHT_GRAY, PRIMARY } from "../utils/colors";

class NewQuestion extends Component {
  state = {
    question: '',
    answer: '',
  };

  static navigationOptions = () => ({
    title: 'Add Card',
  });

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
        NavigationActions.navigate({ routeName: "Home" }),
        NavigationActions.navigate({ routeName: "DeckView", params: { id: this.props.deckId } }),
      ]
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.item}>
          <Text style={styles.title}>Question</Text>
          <TextInput
            style={styles.input}
            placeholder="Your question..."
            underlineColorAndroid="transparent"
            onChangeText={(text) => this._handleChangeQuestion(text)}
          />
          <Text style={styles.title}>Answer?</Text>
          <TextInput
            style={styles.input}
            placeholder="Your answer..."
            underlineColorAndroid="transparent"
            onChangeText={(text) => this._handleChangeAnswer(text)}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => this._handleSubmit()}
            title="Submit"
            color={PRIMARY}
            disabled={question.length === 0 || answer.length === 0}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 30,
  },
  item: {
    padding: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    color: PRIMARY,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  input: {
    width: "90%",
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: LIGHT_GRAY,
    alignSelf: "center",
  },
  button: {
    width: "90%",
    alignSelf: "center",
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
