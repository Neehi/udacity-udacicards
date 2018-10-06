import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import { MaterialIcons } from '@expo/vector-icons';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';
import * as colors from '../utils/colors';

class NewDeck extends React.Component {
  state = {
    title: '',
    error: '',
  };

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
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckView', params: { id: title } }),
      ]
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { title, error } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <View style={styles.item}>
          <Text style={styles.title}>What is your deck title?</Text>
          <TextInput
            onChangeText={(text) => this._handleChange(text)}
            placeholder='Enter your deck title here...'
            placeholderTextColor={colors.midGray2}
            style={styles.input}
            underlineColorAndroid={colors.midGray2}
          />
          {error.length > 0 && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={title.length === 0}
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
  error: {
    alignSelf: 'center',
    marginTop: 10,
    color: colors.error,
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

const mapStateToProps = (state) => ({
  decks: state.decks,
});

const mapDispatchToProps = (dispatch) => ({
  addDeck: (title) => dispatch(addDeck(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
