import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as GuessesActions from './guesses.actions';
import { GuessesEntity } from './guesses.models';

export const GUESSES_FEATURE_KEY = 'guesses';

export interface State extends EntityState<GuessesEntity> {
  selectedId?: string | number; // which Guesses record has been selected
  loaded: boolean; // has the Guesses list been loaded
  error?: string | null; // last known error (if any)
}

export interface GuessesPartialState {
  readonly [GUESSES_FEATURE_KEY]: State;
}

export const guessesAdapter: EntityAdapter<GuessesEntity> =
  createEntityAdapter<GuessesEntity>();

export const initialState: State = guessesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const guessesReducer = createReducer(
  initialState,
  on(GuessesActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(GuessesActions.loadGuessesSuccess, (state, { guesses }) =>
    guessesAdapter.setAll(guesses, { ...state, loaded: true })
  ),
  on(GuessesActions.loadGuessesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return guessesReducer(state, action);
}
