import { ADD_DECK, ADD_CARD } from "../actions";

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.question],
        },
      };
    default:
      return state;
  }
}
