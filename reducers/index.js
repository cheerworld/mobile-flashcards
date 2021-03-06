import { ADD_DECK, ADD_CARD, DELETE_DECK, GET_DECKLIST } from "../actions";

export default function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKLIST:
      return {
        ...action.decks,
      };
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
      const newState = Object.assign({}, state);
      delete newState[action.title]
      //console.log(newState);
      return newState;
    default:
      return state;
  }
}
