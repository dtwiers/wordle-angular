import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GUESSES_FEATURE_KEY, State, guessesAdapter } from './guesses.reducer';

// Lookup the 'Guesses' feature state managed by NgRx
export const getGuessesState =
  createFeatureSelector<State>(GUESSES_FEATURE_KEY);

const { selectAll, selectEntities } = guessesAdapter.getSelectors();

export const getGuessesLoaded = createSelector(
  getGuessesState,
  (state: State) => state.loaded
);

export const getGuessesError = createSelector(
  getGuessesState,
  (state: State) => state.error
);

export const getAllGuesses = createSelector(getGuessesState, (state: State) =>
  selectAll(state)
);

export const getGuessesEntities = createSelector(
  getGuessesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getGuessesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getGuessesEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
