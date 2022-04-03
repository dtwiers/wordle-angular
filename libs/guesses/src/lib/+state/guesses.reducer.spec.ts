import { Action } from '@ngrx/store';

import * as GuessesActions from './guesses.actions';
import { GuessesEntity } from './guesses.models';
import { State, initialState, reducer } from './guesses.reducer';

describe('Guesses Reducer', () => {
  const createGuessesEntity = (id: string, name = ''): GuessesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Guesses actions', () => {
    it('loadGuessesSuccess should return the list of known Guesses', () => {
      const guesses = [
        createGuessesEntity('PRODUCT-AAA'),
        createGuessesEntity('PRODUCT-zzz'),
      ];
      const action = GuessesActions.loadGuessesSuccess({ guesses });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
