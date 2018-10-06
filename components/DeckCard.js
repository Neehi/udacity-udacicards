import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { material } from 'react-native-typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as colors from '../utils/colors';

const DeckCard = (props) => (
  <View style={styles.card}>
    <Text style={styles.deckTitle}>{props.deck.title}</Text>
    <View style={styles.deckInfo}>
      <Text style={styles.questionCountText}>{props.deck.questions.length}</Text>
      <MaterialCommunityIcons
        name='cards-outline'
        style={styles.questionCountIcon}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 150,
    padding: 20,
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
  deckTitle: {
    ...material.titleObject,
    color: colors.primary,
  },
  deckInfo: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  questionCountIcon: {
    marginTop: -1,
    color: colors.darkGray,
    fontSize: 16,
  },
  questionCountText: {
    color: colors.darkGray,
    fontSize: 16,
  },
});

export default DeckCard;
