import AsyncStorage from "@react-native-async-storage/async-storage";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const DELETE_DECK = "DELETE_DECK";
export const GET_DECKLIST = "GET_DECKLIST";

export const DECKLIST = "DECKLIST";

export function getDeckList(decks) {
  return {
    type: GET_DECKLIST,
    decks,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function addCard(title, question) {
  return {
    type: ADD_CARD,
    title,
    question,
  };
}

export function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title,
  };
}

export function addDeckAsync(deck) {
  return async (dispatch) => {
    try {
      await dispatch(addDeck(deck));
      const jsonDeck = JSON.stringify(deck);
      const getDecks = await AsyncStorage.getItem(DECKLIST);
      if (getDecks === null) {
        return await AsyncStorage.setItem(DECKLIST, jsonDeck).catch((e) =>
          console.error(e)
        );
      }
      return await AsyncStorage.mergeItem(DECKLIST, jsonDeck).catch((e) =>
        console.error(e)
      );
    } catch (e) {
      (e) => console.error(e);
    }
  };
}
