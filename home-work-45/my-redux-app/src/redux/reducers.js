import { ActionType } from './types.js';

const initialState = {
  theme: 'light',
  language: 'ua',
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };

    case ActionType.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};