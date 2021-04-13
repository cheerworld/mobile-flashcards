export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const DELETE_DECK = "DELETE_DECK";

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
  }
}
