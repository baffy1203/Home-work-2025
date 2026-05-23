import { ActionType } from './types.js';

export const toggleTheme = () => ({
  type: ActionType.TOGGLE_THEME,
});

export const setLanguage = (lang) => ({
  type: ActionType.SET_LANGUAGE,
  payload: lang,
});