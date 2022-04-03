import { GuessesEntity } from './guesses.models';
import {
  guessesAdapter,
  GuessesPartialState,
  initialState,
} from './guesses.reducer';
import * as GuessesSelectors from './guesses.selectors';

describe('Guesses Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGuessesId = (it: GuessesEntity) => it.id;
  const createGuessesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GuessesEntity);

  let state: GuessesPartialState;

  beforeEach(() => {
    state = {
      guesses: guessesAdapter.setAll(
        [
          createGuessesEntity('PRODUCT-AAA'),
          createGuessesEntity('PRODUCT-BBB'),
          createGuessesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Guesses Selectors', () => {
    it('getAllGuesses() should return the list of Guesses', () => {
      const results = GuessesSelectors.getAllGuesses(state);
      const selId = getGuessesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = GuessesSelectors.getSelected(state) as GuessesEntity;
      const selId = getGuessesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getGuessesLoaded() should return the current "loaded" status', () => {
      const result = GuessesSelectors.getGuessesLoaded(state);

      expect(result).toBe(true);
    });

    it('getGuessesError() should return the current "error" state', () => {
      const result = GuessesSelectors.getGuessesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
