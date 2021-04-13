import { ADD_DECK, ADD_CARD, DELETE_DECK } from "../actions";

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
    case DELETE_DECK:
      const { [action.title]: value, ...newList } = state;
      console.log(newList);
      return {
        newList,
      }
    default:
      return state;
  }
}
