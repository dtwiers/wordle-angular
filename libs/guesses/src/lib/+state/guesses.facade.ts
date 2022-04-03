import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as GuessesActions from './guesses.actions';
import * as GuessesFeature from './guesses.reducer';
import * as GuessesSelectors from './guesses.selectors';

@Injectable()
export class GuessesFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(GuessesSelectors.getGuessesLoaded));
  allGuesses$ = this.store.pipe(select(GuessesSelectors.getAllGuesses));
  selectedGuesses$ = this.store.pipe(select(GuessesSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(GuessesActions.init());
  }
}
