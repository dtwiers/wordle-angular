import { createAction, props } from '@ngrx/store';
import { GuessesEntity } from './guesses.models';

export const init = createAction('[Guesses Page] Init');

export const loadGuessesSuccess = createAction(
  '[Guesses/API] Load Guesses Success',
  props<{ guesses: GuessesEntity[] }>()
);

export const loadGuessesFailure = createAction(
  '[Guesses/API] Load Guesses Failure',
  props<{ error: any }>()
);
