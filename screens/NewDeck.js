import React, { Component } from "react";
import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { saveDeck } from "../utils/api";
import { ERROR, LIGHT_GRAY, PRIMARY } from "../utils/colors";

class NewDeck extends Component {
  state = {
    title: '',
    error: '',
  };

  static navigationOptions = () => ({
    title: 'New Deck',
  });

  _validateTitle = (title) => (
    // Validate against redux as it's meant to be the source of truth
    Object.keys(this.props.decks).indexOf(title) !== -1 ? 'Title is already in use.' : ''
  );

  _handleChange = (text) => {
    this.setState({ title: text });
  }

  _handleSubmit = async () => {
    const { title } = this.state;
    const error = this._validateTitle(title);

    if (error && error.length > 0) {
      this.setState({ error });
      return;
    }

    // Save the deck and update redux
    const deck = await saveDeck(title);
    await this.props.addDeck(deck);
    this.setState({ title: '' });

    // Reset the navigation stack so back doesn't return here
    // and navigate to the vuew for the new deck
    const navigateAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: "Home" }),
        NavigationActions.navigate({ routeName: "DeckView", params: { id: title } }),
      ]
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { title, error } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.item}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <TextInput
            style={styles.input}
            placeholder="Deck title"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this._handleChange(text)}
          />
          {error.length > 0 && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => this._handleSubmit()}
            title="Submit"
            color={PRIMARY}
            disabled={title.length === 0}
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
    paddingTop: 50,
  },
  item: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    color: PRIMARY,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  input: {
    width: "90%",
    padding: 10,
    fontSize: 30,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: LIGHT_GRAY,
    alignSelf: "center",
  },
  error: {
    color: ERROR,
  },
  button: {
    width: "90%",
    alignSelf: "center",
  }
});

const mapStateToProps = (state) => ({
  decks: state.decks,
});

const mapDispatchToProps = (dispatch) => ({
  addDeck: (title) => dispatch(addDeck(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
