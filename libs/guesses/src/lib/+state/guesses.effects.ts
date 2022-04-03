import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as GuessesActions from './guesses.actions';
import * as GuessesFeature from './guesses.reducer';

@Injectable()
export class GuessesEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(GuessesActions.init, {
      run: (
        action: ReturnType<typeof GuessesActions.init>,
        state: GuessesFeature.GuessesPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return GuessesActions.loadGuessesSuccess({ guesses: [] });
      },
      onError: (action: ReturnType<typeof GuessesActions.init>, error) => {
        console.error('Error', error);
        return GuessesActions.loadGuessesFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<GuessesFeature.GuessesPartialState>
  ) {}
}
