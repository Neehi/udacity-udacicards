import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PRIMARY, SECONDARY, WHITE } from '../utils/colors';

const DeckCard = (props) => (
  <View style={styles.card}>
    <Text style={styles.cardHeader}>{props.deck.title}</Text>
    <Text style={styles.cardBody}>{props.deck.questions.length} Cards</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    height: 150,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
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
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    color: PRIMARY,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  cardBody: {
    color: SECONDARY,
    fontSize: 16,
    alignSelf: "center",
  },
});

export default DeckCard;
